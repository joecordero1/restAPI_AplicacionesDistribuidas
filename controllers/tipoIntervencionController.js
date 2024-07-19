const TipoIntervencion = require('../models/TipoIntervencion');

// Controlador para crear una nueva intervención
exports.nuevoTipoIntervencion = async (req, res, next) => {
    try {
        const tipoIntervencion = new TipoIntervencion(req.body);
        await tipoIntervencion.save();
        res.json({ mensaje: 'Intervención creada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error aqui del axios' });
        next();
    }
};

// Controlador para obtener todas las intervenciones
exports.obtenerTipoIntervenciones = async (req, res, next) => {
    try {
        const tipoIntervenciones = await TipoIntervencion.find({});
        res.json(tipoIntervenciones);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener los tipos' });
        next();
    }
};

// Controlador para obtener una intervención por su ID
exports.obtenerTipoIntervencionPorId = async (req, res, next) => {
    try {
        const tipoIntervencion = await TipoIntervencion.findById(req.params.id);
        if (!tipoIntervencion) {
            res.status(404).json({ mensaje: 'tipo no encontrado' });
            return;
        }
        res.json(tipoIntervencion);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener el tipo' });
        next();
    }
};

// Controlador para actualizar una intervención
exports.actualizarTipoIntervencion = async (req, res, next) => {
    try {
        const tipoIntervencionActualizada = await TipoIntervencion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(tipoIntervencionActualizada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al actualizar la intervención' });
        next();
    }
};

// Controlador para eliminar una intervención
exports.eliminarTipoIntervencion = async (req, res, next) => {
    try {
        await TipoIntervencion.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Intervención eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al eliminar la intervención' });
        next();
    }
};
