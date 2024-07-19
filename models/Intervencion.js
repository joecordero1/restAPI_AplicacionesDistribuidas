const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detalleIntervencionSchema = new Schema({
    clave: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    }
});

const intervencionSchema = new Schema({
    Id_Animal: {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    Id_Usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios', // Referencia al modelo de usuario que realiza la intervención.
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now,
        required: true
    },

    detalles: [detalleIntervencionSchema],

    resultadoAntes: {
        type: Number,
        required: true
    },
    resultadoDespues: {
        type: Number,
        required: true
    },
    comentarios: {
        type: String
    },
    efectividadCalculada: {
        type: Number,
        required: false
    },
    // Añadido para soporte de análisis predictivo y seguimiento a largo plazo
    seguimiento: [{
        fecha: Date,
        resultado: Number,
        comentario: String
    }]
});

// Middleware para calcular la efectividad justo antes de guardar
intervencionSchema.pre('save', function (next) {
    if (this.resultadoAntes && this.resultadoDespues) {
        this.efectividadCalculada = ((this.resultadoDespues - this.resultadoAntes) / this.resultadoAntes) * 100;
    }
    next();
});

module.exports = mongoose.model('Intervencion', intervencionSchema);
