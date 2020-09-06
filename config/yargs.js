const descripcion = { demand: true, alias: 'd', desc: 'Descripcíon de la tarea a realizar' };

const completado = { alias: 'c', default: true, desc: 'Marca como completado o pendiente' };

const argv = require('yargs')
    .command('listar', 'Lista las tareas a realizar')
    .command('crear', 'Crea una nueva tarea a realizar', { descripcion })
    .command('actualizar', 'Actualiza el estado de una tarea', { descripcion, completado })
    .command('borrar', "Elimina una tarea", { descripcion })
    .help()
    .argv;

module.exports = {
    argv
}