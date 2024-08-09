import {
    actualizarDatosDocumento, borrarDocumento,
    obtenerDatosDocumento
} from "../bd/documentosBD.js";
import { agregarConexion, obtenerUsuariosDocumento } from "../utils/conexionesDocumentos.js";


function registrarEventosDocumentos(socket, io) {
    socket.on('borrarDocumento', async (nombreDocumento) => {
        const resultado = await borrarDocumento(nombreDocumento);

        if (resultado.deletedCount) {
            io.emit('documentoBorrado', nombreDocumento);
        }
        console.log(resultado);
    });

    socket.on('cambiosEditor', async ({ textoEditor, nombreDocumento }) => {
        //const documentoActual = await obtenerDatosDocumento(nombreDocumento);
        const actualizacion = await actualizarDatosDocumento(nombreDocumento, textoEditor);

        console.log(actualizacion);

        if (actualizacion.modifiedCount) {
            socket.to(nombreDocumento).emit('actualizarEditor', textoEditor);
        }

    });

    socket.on('nombreDocumento', async ({ nombreDocumento, nombreUsuario }, devolverDocumento) => {


        const documentoActual = await obtenerDatosDocumento(nombreDocumento);

        if (documentoActual) {
            agregarConexion({ nombreDocumento, nombreUsuario });
            socket.join(nombreDocumento);
            const usuariosEnDocumento = obtenerUsuariosDocumento(nombreDocumento);

            io.to(nombreDocumento).emit('usuariosEnDocumento', usuariosEnDocumento);
            devolverDocumento(documentoActual.texto);
        }
    })
}

export default registrarEventosDocumentos;