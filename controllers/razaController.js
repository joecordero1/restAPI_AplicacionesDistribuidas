const Raza = require('../models/Raza');

exports.nuevaRaza = async (req, res, next) => {
    // Instanciar un objeto Raza con los datos de req.body
    const raza = new Raza(req.body);

    try {
        // Guardar la raza en la base de datos
        await raza.save();
        res.json({ mensaje: 'Se agregó una nueva raza' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarRazas = async (req, res, next) => {
    // Obtener todas las razas de la base de datos
    try {
        const razas = await Raza.find({});
        res.json(razas);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarRazaPorId = async (req, res, next) => {
    // Obtener una raza por su ID
    try {
        const raza = await Raza.findById(req.params._id);
        if (!raza) {
            res.json({ mensaje: 'No existe esa raza' });
            next();
        }
        res.json(raza);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.actualizarRaza = async (req, res, next) => {
    // Actualizar una raza por su ID
    try {
        const raza = await Raza.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        res.json(raza);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.eliminarRaza = async (req, res, next) => {
    // Eliminar una raza por su ID
    try {
        await Raza.findOneAndDelete({ _id: req.params._id });
        res.json({ mensaje: 'Raza eliminada' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}
