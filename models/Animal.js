const mongoose = require('mongoose');
const EstadoAnimal = require('./EstadoAnimal');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    Id_TipoAnimal: {
        type: Schema.Types.ObjectId,
        ref: 'TipoAnimal',
        required: true
    },
    Id_Raza: {
        type: Schema.Types.ObjectId,
        ref: 'Raza',
        required: true
    },
    estados: [],
    ubicacion: {
        type: {
            type: String,
            enum: ['Point'], // Solo permitir tipo 'Point' para coordenadas
            required: true
        },
        coordinates: {
            type: [Number], // [Longitud, Latitud]
            required: true
        }
    },
    salud: [{
        type: Schema.Types.ObjectId,
        ref: 'SaludAnimal'
    }],
    Edad: {
        type: Number,
        required: true
    },
    Id_Sexo: {
        type: Schema.Types.ObjectId,
        ref: 'Sexo',
        required: true
    },
    FechaRegistro: {
        type: Date,
        default: Date.now
    },
    FechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

// Índice geoespacial para búsqueda rápida por ubicación
animalSchema.index({ ubicacion: '2dsphere' });

module.exports = mongoose.model('Animal', animalSchema);