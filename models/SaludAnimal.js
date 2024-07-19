const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detalleSaludSchema = new Schema({
    clave: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

const saludAnimalSchema = new Schema({
    tipo: {
        type: String,
        required: true
    },
    detallesTemplate: [detalleSaludSchema]
});

module.exports = mongoose.model('SaludAnimal', saludAnimalSchema);