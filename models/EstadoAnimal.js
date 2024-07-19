const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detalleEstadoSchema = new Schema({
    clave: {
        type: String,
        required: true
    },
    valor: {
        type: String
    }
});

const estadoAnimalSchema = new Schema({
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoAnimal'
    },
    nombre: {
        type: String
    },
    detalles: [detalleEstadoSchema]
});

module.exports = mongoose.model('EstadoAnimal', estadoAnimalSchema);
