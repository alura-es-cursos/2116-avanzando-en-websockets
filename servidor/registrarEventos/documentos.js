import {
    actualizarDatosDocumento, borrarDocumento,
    obtenerDatosDocumento
} from "../bd/documentosBD.js";
import { agregarConexion, borrarConexionUsuario, consultarConexionUsuario, obtenerUsuariosDocumento } from "../utils/conexionesDocumentos.js";


function registrarEventosDocumentos(socket, io) {


    socket.on('nombreDocumento', async ({ nombreDocumento, nombreUsuario }, devolverDocumento) => {


        const documentoActual = await obtenerDatosDocumento(nombreDocumento);

        if (documentoActual) {

            const usuarioConectado = consultarConexionUsuario(nombreDocumento, nombreUsuario);

            if (!usuarioConectado) {

                socket.data = {
                    usuarioSeConecto: true,
                }
                agregarConexion({ nombreDocumento, nombreUsuario });
                socket.join(nombreDocumento);
                const usuariosEnDocumento = obtenerUsuariosDocumento(nombreDocumento);

                io.to(nombreDocumento).emit('usuariosEnDocumento', usuariosEnDocumento);
                devolverDocumento(documentoActual.texto);
            } else {
                socket.emit('usuarioConectado');
            }

        }

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

        socket.on('disconnect', () => {

            if (socket.data.usuarioSeConecto) {
                borrarConexionUsuario(nombreDocumento, nombreUsuario);

                const usuariosEnDocumento = obtenerUsuariosDocumento(nombreDocumento);

                io.to(nombreDocumento).emit('usuariosEnDocumento', usuariosEnDocumento);
            }

        });
    });


}

export default registrarEventosDocumentos;