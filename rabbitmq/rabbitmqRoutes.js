const express = require('express');
const amqp = require('amqplib/callback_api');
const axios = require('axios');
const router = express.Router();

// Configuración de RabbitMQ
const rabbitMQUrl = 'amqp://localhost:5672';
const sendQueue = 'procesamiento';
const consumeQueue = 'resultados';
const message = 'PrimerFormulario';

router.post('/send-message', (req, res) => {
  amqp.connect(rabbitMQUrl, (error0, connection) => {
    if (error0) {
      console.error(error0);
      return res.status(500).send('Failed to connect to RabbitMQ');
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        console.error(error1);
        return res.status(500).send('Failed to create channel');
      }

      channel.assertQueue(sendQueue, {
        durable: true
      });

      channel.sendToQueue(sendQueue, Buffer.from(message));
      console.log(` [x] Sent ${message}`);

      res.send('Message sent to RabbitMQ');
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
});

router.post('/consume-message', (req, res) => {
  amqp.connect(rabbitMQUrl, (error0, connection) => {
    if (error0) {
      console.error(error0);
      return res.status(500).send('Failed to connect to RabbitMQ');
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        console.error(error1);
        return res.status(500).send('Failed to create channel');
      }

      channel.assertQueue(consumeQueue, {
        durable: true
      });

      console.log(`Esperando mensajes en ${consumeQueue}`);

      channel.consume(consumeQueue, async (msg) => {
        if (msg !== null) {
          const message = msg.content.toString();
          console.log('Mensaje recibido:', message);

          const messageParts = message.split(',');
          if (messageParts.length === 3) {
            const mejoraVecina = parseFloat(messageParts[0]);
            const porcentajeAlcanzado = parseFloat(messageParts[1]);
            const faltanteParaAlcanzar = parseFloat(messageParts[2]);

            const resultado = {
              mejoraVecina,
              porcentajeAlcanzado,
              faltanteParaAlcanzar
            };

            // Enviar el mensaje a la API
            try {
              const response = await axios.post('http://localhost:5000/resultados', resultado);
              console.log('Mensaje enviado a la API:', response.data);
              res.json(resultado);
            } catch (error) {
              console.error('Error al enviar el mensaje a la API:', error.message);
              res.status(500).send('Failed to send message to API');
            }
          }

          channel.ack(msg);
        }
      }, {
        noAck: false
      });
    });
  });
});

module.exports = router;
