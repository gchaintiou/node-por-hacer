const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
        //else resolve('Grabación satisfactoria');
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        console.log("No se encontró la tarea", descripcion);
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
        if (nuevoListado.length === listadoPorHacer.length)
            return false;
        else {
            listadoPorHacer = nuevoListado;
            guardarDB();
            return true;
        }
    } else {
        console.log("No se encontró la tarea", descripcion);
        return false;
    }


}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}