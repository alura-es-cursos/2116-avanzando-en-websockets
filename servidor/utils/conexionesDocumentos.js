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

export { agregarConexion, obtenerUsuariosDocumento }