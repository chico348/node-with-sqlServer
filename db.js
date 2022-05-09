let config = require('./dbSettings');
const sql = require('mssql');

async function lista(organigrama) {
    try {
        let pool = await sql.connect(config);
        let buscar = await pool.request()
            .input("id", sql.Int, organigrama.id)
            .execute("atdur.usp_subordinados_organigrama");
        return buscar.recordset;
    } catch (e) {
        console.log(e);
    }
}

async function editar(editar) {
    try {
        let pool = await sql.connect(config);
        let buscar = await pool.request()
            .input("nombre", sql.VarChar, editar.nombre)
            .input("id_padre", sql.Int, editar.id_padre)
            .input("activo", sql.Int, editar.activo)
            .input("id", sql.Int, editar.id)
            .execute("atdur.usp_puestos_organigrama_modificar");
        return buscar.recordset;
    } catch (e) {
        console.log(e);
    }
}

async function guardar(nuevo) {
    try {
        let pool = await sql.connect(config);
        let buscar = await pool.request()
            .input("nombre", sql.VarChar, nuevo.nombre)
            .input("id_padre", sql.Int, nuevo.id_padre)
            .input("activo", sql.Int, nuevo.activo)
            .execute("atdur.usp_puestos_organigrama_crear");
        return buscar.recordset;
    } catch (e) {
        console.log(e);
    }
}

class Editar {
    constructor(nombre, id_padre, activo, id) {
        this.nombre = nombre;
        this.id_padre = id_padre;
        this.activo = activo;
        this.id = id;
    }
}

class Nuevo {
    constructor(nombre, id_padre, activo) {
        this.nombre = nombre;
        this.id_padre = id_padre;
        this.activo = activo;
    }
}

module.exports = {
    lista: lista,
    editar: editar,
    guardar: guardar
}