const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    telefono: {
        type: String,
        trim: true
    }
});

// Exportas el modelo basado en el esquema.
module.exports = mongoose.model('Clientes', clientesSchema);
