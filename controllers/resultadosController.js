const Resultado = require('../models/Resultado');

exports.nuevoResultado = async (req, res, next) => {
    // Instanciar un objeto Resultado con los datos de req.body
    const resultado = new Resultado(req.body);

    try {
        // Guardar el resultado en la base de datos
        await resultado.save();
        res.json({ mensaje: 'Se agregó un nuevo resultado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarResultados = async (req, res, next) => {
    // Obtener todos los resultados de la base de datos
    try {
        const resultados = await Resultado.find({});
        res.json(resultados);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarResultadoPorId = async (req, res, next) => {
    // Obtener un resultado por su ID
    try {
        const resultado = await Resultado.findById(req.params._id);
        if (!resultado) {
            return res.json({ mensaje: 'No existe ese resultado' }); // Devuelve la respuesta y termina la ejecución
        }
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.actualizarResultado = async (req, res, next) => {
    // Actualizar un resultado por su ID
    try {
        const resultado = await Resultado.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.eliminarResultado = async (req, res, next) => {
    // Eliminar un resultado por su ID
    try {
        await Resultado.findOneAndDelete({ _id: req.params._id });
        res.json({ mensaje: 'Resultado eliminado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}
