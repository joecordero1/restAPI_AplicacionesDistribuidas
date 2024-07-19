const Animal = require('../models/Animal');
const EstadoAnimal = require('../models/EstadoAnimal');
const Intervencion = require('../models/Intervencion');

exports.agregarEstadoAnimal = async (req, res, next) => {
    const { animalId, estadoId, detalles } = req.body;

    try {
        const animal = await Animal.findById(animalId);
        if (!animal) {
            res.json({ mensaje: 'No existe ese animal' });
            return next();
        }

        const estado = await EstadoAnimal.findById(estadoId);
        if (!estado) {
            res.json({ mensaje: 'No existe ese estado del animal' });
            return next();
        }
        // Crear el objeto del nuevo estado con sus detalles
        const nuevoEstado = {
            _id: estado._id,
            nombre: estado.nombre,
            detalles: detalles
        };

        animal.estados.push(nuevoEstado);
        await animal.save();

        res.json({ mensaje: 'Estado agregado al animal' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.agregarIntervencion = async (req, res, next) => {
    const { Id_Animal, Id_Usuario, nombre, detalles, resultadoAntes, resultadoDespues, comentarios } = req.body;

    try {
        // Verificar que el animal existe
        const animal = await Animal.findById(Id_Animal);
        if (!animal) {
            return res.status(404).json({ mensaje: 'No existe ese animal' });
        }
    
        // Crear la nueva intervención
        const nuevaIntervencion = new Intervencion({
            Id_Animal,
            Id_Usuario,
            nombre,
            detalles,
            resultadoAntes,
            resultadoDespues,
            comentarios
        });
    
        // Guardar la intervención en la base de datos
        await nuevaIntervencion.save();
    
        res.json({ mensaje: 'Intervención agregada exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error' });
        next();
    }    
};


exports.nuevoAnimal = async (req, res, next) => {
    // Instanciar un objeto Animal con los datos de req.body
    const animal = new Animal(req.body);

    try {
        // Guardar el animal en la base de datos
        await animal.save();
        res.json({ mensaje: 'Se agregó un nuevo animal' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarAnimales = async (req, res, next) => {
    // Obtener todos los animales de la base de datos
    try {
        const animales = await Animal.find({});
        res.json(animales);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarAnimalPorId = async (req, res, next) => {
    // Obtener un animal por su ID
    try {
        const animal = await Animal.findById(req.params._id);
        if (!animal) {
            res.json({ mensaje: 'No existe ese animal' });
            return next();
        }
        res.json(animal);
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: 'ID inválido' });
        next();
    }
}

exports.actualizarAnimal = async (req, res, next) => {
    // Actualizar un animal por su ID
    try {
        const animal = await Animal.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        res.json(animal);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.eliminarAnimal = async (req, res, next) => {
    // Eliminar un animal por su ID
    try {
        await Animal.findOneAndDelete({ _id: req.params._id });
        res.json({ mensaje: 'Animal eliminado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}
