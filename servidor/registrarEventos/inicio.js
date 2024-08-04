import {
    agregarDocumento,
    obtenerDatosDocumento, obtenerDocumentos
} from "../bd/documentosBD.js";

function registrarEventosInicio(socket, io) {
    socket.on('obtenerDocumentos', async (actualizaListaDocumentos) => {
        const documentos = await obtenerDocumentos();
        actualizaListaDocumentos(documentos);
    });

    socket.on('agregarDocumento', async (nombreDocumento) => {

        const existeDocumento = (await obtenerDatosDocumento(nombreDocumento)) !== null;

        if (existeDocumento) {
            socket.emit('documentoExistente', nombreDocumento);
        } else {
            const resultado = await agregarDocumento(nombreDocumento);
            if (resultado.acknowledged) {
                io.emit('agregarDocumentoLista', nombreDocumento)
            }
        }


    });

}

export default registrarEventosInicio;