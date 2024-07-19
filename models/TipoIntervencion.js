const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detalleIntervencionSchema = new Schema({
    //Los detalles son individuales al Animal, si bien las intervenciones son unicas para cada animal,
    //los detalles de estas intervenciones ya existen y están establcedias por la logica del negocio,
    //por ejemplo, si la intervención lleva por nombre Esterilización, entonces sus detalles deben ser
    //Nombre Clínica, fecha, doctor responsable, etc. Así debe ser con todos los tipos de intervención.
    
    clave: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    }
});

const TipoIntervencionSchema = new Schema({
    nombre: {
        type: String,
        enum: ['Esterilización', 'Reubicación', 'Vacunación'],
        required: true
    },

    detalles: [detalleIntervencionSchema]
    

});

module.exports = mongoose.model('TipoIntervencion', TipoIntervencionSchema);