const amqp = require('amqplib/callback_api');
const axios = require('axios');

// URL de la API
const apiBaseUrl = 'http://localhost:5000';

// Función para enviar el mensaje a la API
async function sendMessageToApi(resultado) {
    try {
        const response = await axios.post(`${apiBaseUrl}/resultados`, resultado);
        console.log('Mensaje enviado a la API:', response.data);
    } catch (error) {
        console.error('Error al enviar el mensaje a la API:', error.message);
    }
}

// Función para procesar los mensajes de la cola
function startConsuming() {
    amqp.connect('amqp://localhost:5672', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            const queue = 'resultados';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(`Esperando mensajes en ${queue}. Presiona CTRL+C para salir.`);

            channel.consume(queue, async (msg) => {
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

                        await sendMessageToApi(resultado);
                    }

                    channel.ack(msg);
                }
            });
        });
    });
}

// Iniciar la función de consumo
startConsuming();