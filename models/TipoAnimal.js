// TipoAnimal.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipoAnimalSchema = new Schema({
    nombre: {
        type: String,
        enum: ['Perro', 'Gato'],
        required: true
    }
});

module.exports = mongoose.model('TipoAnimal', tipoAnimalSchema);
