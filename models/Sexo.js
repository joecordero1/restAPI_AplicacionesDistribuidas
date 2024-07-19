// Sexo.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sexoSchema = new Schema({
    nombre: {
        type: String,
        enum: ['Macho', 'Hembra', 'No identificado'],
        required: true
    }
});

module.exports = mongoose.model('Sexo', sexoSchema);
