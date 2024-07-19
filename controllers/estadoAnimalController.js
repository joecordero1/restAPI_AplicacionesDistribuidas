const EstadoAnimal = require('../models/EstadoAnimal');

exports.nuevoEstadoAnimal = async (req, res, next) => {
    // Instanciar un objeto EstadoAnimal con los datos de req.body
    const estadoAnimal = new EstadoAnimal(req.body);

    try {
        // Guardar el estado del animal en la base de datos
        await estadoAnimal.save();
        res.json({ mensaje: 'Se agregó un nuevo estado del animal' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarEstadosAnimal = async (req, res, next) => {
    // Obtener todos los estados de los animales de la base de datos
    try {
        const estadosAnimal = await EstadoAnimal.find({});
        res.json(estadosAnimal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarEstadoAnimalPorId = async (req, res, next) => {
    // Obtener un estado del animal por su ID
    try {
        const estadoAnimal = await EstadoAnimal.findById(req.params._id);
        if (!estadoAnimal) {
            res.json({ mensaje: 'No existe ese estado del animal' });
            next();
        }
        res.json(estadoAnimal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.actualizarEstadoAnimal = async (req, res, next) => {
    // Actualizar un estado del animal por su ID
    try {
        const estadoAnimal = await EstadoAnimal.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        res.json(estadoAnimal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.eliminarEstadoAnimal = async (req, res, next) => {
    // Eliminar un estado del animal por su ID
    try {
        await EstadoAnimal.findOneAndDelete({ _id: req.params._id });
        res.json({ mensaje: 'Estado del animal eliminado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}
