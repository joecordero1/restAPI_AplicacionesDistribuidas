const SaludAnimal = require('../models/SaludAnimal');

exports.nuevaSaludAnimal = async (req, res, next) => {
    // Instanciar un objeto SaludAnimal con los datos de req.body
    const saludAnimal = new SaludAnimal(req.body);

    try {
        // Guardar la salud del animal en la base de datos
        await saludAnimal.save();
        res.json({ mensaje: 'Se agregó una nueva salud del animal' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarSaludAnimal = async (req, res, next) => {
    // Obtener todos los registros de salud de los animales de la base de datos
    try {
        const saludAnimal = await SaludAnimal.find({});
        res.json(saludAnimal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarSaludAnimalPorId = async (req, res, next) => {
    // Obtener la salud del animal por su ID
    try {
        const saludAnimal = await SaludAnimal.findById(req.params._id);
        if (!saludAnimal) {
            res.json({ mensaje: 'No existe esa salud del animal' });
            next();
        }
        res.json(saludAnimal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.actualizarSaludAnimal = async (req, res, next) => {
    // Actualizar la salud del animal por su ID
    try {
        const saludAnimal = await SaludAnimal.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        res.json(saludAnimal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.eliminarSaludAnimal = async (req, res, next) => {
    // Eliminar la salud del animal por su ID
    try {
        await SaludAnimal.findOneAndDelete({ _id: req.params._id });
        res.json({ mensaje: 'Salud del animal eliminada' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}
