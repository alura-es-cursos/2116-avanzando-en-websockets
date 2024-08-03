import { actualizarDatosDocumento, agregarDocumento, borrarDocumento, obtenerDatosDocumento, obtenerDocumentos } from "./bd/documentosBD.js";
import io from "./servidor.js";

io.on('connection', (socket) => {
    console.log('Se conectó un cliente con id:', socket.id);

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

    socket.on('nombreDocumento', async (nombreDocumento, devolverDocumento) => {
        socket.join(nombreDocumento);

        const documentoActual = await obtenerDatosDocumento(nombreDocumento);

        if (documentoActual) {
            devolverDocumento(documentoActual.texto);
        }
    })

});

