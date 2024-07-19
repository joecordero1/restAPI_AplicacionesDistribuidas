const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req, res, next) => {
    // Instanciar un objeto Cliente con los datos de req.body
    const cliente = new Clientes(req.body);

    try {
        // Guardar el cliente en la base de datos
        await cliente.save();
        res.json({ mensaje: 'Se agregó un nuevo cliente' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarClientes = async (req, res, next) => {
    // Instanciar un objeto Cliente con los datos de req.body
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.mostrarClienteID = async (req, res, next) => {
    // Instanciar un objeto Cliente con los datos de req.body
    try {
        const cliente = await Clientes.findById(req.params._id);
        if(!cliente){
            res.json({ mensaje: 'no existe ese cliente' });
            next()
        }
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.updateCliente = async (req, res, next) => {
    // Instanciar un objeto Cliente con los datos de req.body
    try {
        const cliente = await Clientes.findOneAndUpdate({_id: req.params._id}, 
            req.body, {
                new : true
            
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.deleteCliente = async (req, res, next) => {
    // Instanciar un objeto Cliente con los datos de req.body
    try {
        await Clientes.findOneAndDelete({_id: req.params._id});
        res.json({ mensaje: 'Cliente eliminado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}