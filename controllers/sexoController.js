const Sexo = require('../models/Sexo');

exports.nuevoSexo = async (req, res, next) => {
    // Instanciar un objeto Sexo con los datos de req.body
    const tipoSexo = new Sexo(req.body);

    try {
        // Guardar el tipo de sexo en la base de datos
        await tipoSexo.save();
        res.json({ mensaje: 'Se agregó un nuevo tipo de sexo' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarTiposSexo = async (req, res, next) => {
    // Obtener todos los tipos de sexoes de la base de datos
    try {
        const tiposSexo = await Sexo.find({});
        res.json(tiposSexo);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarSexoPorId = async (req, res, next) => {
    // Obtener un tipo de sexo por su ID
    try {
        const tipoSexo = await Sexo.findById(req.params._id);
        if (!tipoSexo) {
            return res.json({ mensaje: 'No existe ese tipo de sexo' }); // Devuelve la respuesta y termina la ejecución
        }
        res.json(tipoSexo);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}


exports.actualizarSexo = async (req, res, next) => {
    // Actualizar un tipo de sexo por su ID
    try {
        const tipoSexo = await Sexo.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        res.json(tipoSexo);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.eliminarSexo = async (req, res, next) => {
    // Eliminar un tipo de sexo por su ID
    try {
        await Sexo.findOneAndDelete({ _id: req.params._id });
        res.json({ mensaje: 'Sexo eliminado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}
