const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultadoSchema = new Schema({
    mejoraVecina: {
        type: Number,
        required: true
    },
    porcentajeAlcanzado: {
        type: Number,
        required: true
    },
    faltanteParaAlcanzar: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resultado', resultadoSchema);
