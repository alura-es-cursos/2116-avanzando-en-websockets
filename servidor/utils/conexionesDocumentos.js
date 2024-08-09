const conexionesDocumentos = [];

function agregarConexion(conexion) {
    conexionesDocumentos.push(conexion);
    console.log(conexionesDocumentos);
}

function obtenerUsuariosDocumento(nombreDocumento) {
    return conexionesDocumentos
        .filter((conexion) => conexion.nombreDocumento === nombreDocumento)
        .map((conexion) => conexion.nombreUsuario);
}

function borrarConexionUsuario(nombreDocumento, nombreUsuario) {
    const posicionConexion = conexionesDocumentos.findIndex((conexion) => conexion.nombreDocumento === nombreDocumento
        && conexion.nombreUsuario === nombreUsuario);

    if (posicionConexion >= 0) {
        conexionesDocumentos.splice(posicionConexion, 1);
    }
    console.log(conexionesDocumentos);
}

function consultarConexionUsuario(nombreDocumento, nombreUsuario) {
    return conexionesDocumentos.find((conexion) => conexion.nombreDocumento === nombreDocumento
        && conexion.nombreUsuario === nombreUsuario);
}

export { agregarConexion, obtenerUsuariosDocumento, borrarConexionUsuario, consultarConexionUsuario }