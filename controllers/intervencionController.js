const Intervencion = require('../models/Intervencion');

// Controlador para crear una nueva intervención
exports.nuevaIntervencion = async (req, res, next) => {
    try {
        const intervencion = new Intervencion(req.body);
        await intervencion.save();
        res.json({ mensaje: 'Intervención creada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al crear la intervención' });
        next();
    }
};

// Controlador para obtener todas las intervenciones
exports.obtenerIntervenciones = async (req, res, next) => {
    try {
        const intervenciones = await Intervencion.find({});
        res.json(intervenciones);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener las intervenciones' });
        next();
    }
};

// Controlador para obtener una intervención por su ID
exports.obtenerIntervencionPorId = async (req, res, next) => {
    try {
        const intervencion = await Intervencion.findById(req.params.id);
        if (!intervencion) {
            res.status(404).json({ mensaje: 'Intervención no encontrada' });
            return;
        }
        res.json(intervencion);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener la intervención' });
        next();
    }
};

// Controlador para actualizar una intervención
exports.actualizarIntervencion = async (req, res, next) => {
    try {
        const intervencionActualizada = await Intervencion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(intervencionActualizada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al actualizar la intervención' });
        next();
    }
};

// Controlador para eliminar una intervención
exports.eliminarIntervencion = async (req, res, next) => {
    try {
        await Intervencion.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Intervención eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al eliminar la intervención' });
        next();
    }
};
