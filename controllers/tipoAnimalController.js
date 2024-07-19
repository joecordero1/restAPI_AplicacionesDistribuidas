const TipoAnimal = require('../models/TipoAnimal');

exports.nuevoTipoAnimal = async (req, res, next) => {
    // Instanciar un objeto TipoAnimal con los datos de req.body
    const tipoAnimal = new TipoAnimal(req.body);

    try {
        // Guardar el tipo de animal en la base de datos
        await tipoAnimal.save();
        res.json({ mensaje: 'Se agregó un nuevo tipo de animal' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarTiposAnimal = async (req, res, next) => {
    // Obtener todos los tipos de animales de la base de datos
    try {
        const tiposAnimal = await TipoAnimal.find({});
        res.json(tiposAnimal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarTipoAnimalPorId = async (req, res, next) => {
    // Obtener un tipo de animal por su ID
    try {
        const tipoAnimal = await TipoAnimal.findById(req.params._id);
        if (!tipoAnimal) {
            res.json({ mensaje: 'No existe ese tipo de animal' });
            next();
        }
        res.json(tipoAnimal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.actualizarTipoAnimal = async (req, res, next) => {
    // Actualizar un tipo de animal por su ID
    try {
        const tipoAnimal = await TipoAnimal.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        res.json(tipoAnimal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.eliminarTipoAnimal = async (req, res, next) => {
    // Eliminar un tipo de animal por su ID
    try {
        await TipoAnimal.findOneAndDelete({ _id: req.params._id });
        res.json({ mensaje: 'Tipo de animal eliminado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}
