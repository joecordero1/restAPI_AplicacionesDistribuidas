const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rabbitmqRoutes = require('./rabbitmq/rabbitmqRoutes');

//importar cors para cambiar los recursos entre el react y el server de extress
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/restapicrud')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));

const app = express();

// Since you are using a recent version of Express, you can use express.json() and express.urlencoded() 
// instead of the body-parser package, as it has been re-included in Express.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//habilitar cors
app.use(cors());


// Usar las rutas definidas en el archivo de rutas y el archivo de RabbitMQ
app.use('/', routes());
app.use('/rabbitmq', rabbitmqRoutes);

// Start the server on port 5000 or the port set in the environment variable.
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
