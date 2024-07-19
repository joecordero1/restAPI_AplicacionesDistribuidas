// Raza.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const razaSchema = new Schema({
    nombre: {
        type: String,
        default: 'Mestizo'
    }
});

module.exports = mongoose.model('Raza', razaSchema);
