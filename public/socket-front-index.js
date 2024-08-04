import { eliminarEnlaceDocumentoBorrado, insertarEnlaceDocumento } from "./index.js";

const socket = io('http://localhost:3000');

function emitirObtenerDocumentosBaseDatos() {
    socket.emit('obtenerDocumentos', (documentos) => {
        documentos.forEach((documento) => {
            insertarEnlaceDocumento(documento.nombre);
        })
    });
}

function emitirAgregarDocumento(nombreDocumento) {
    socket.emit('agregarDocumento', nombreDocumento);
}

socket.on('agregarDocumentoLista', (nombreDocumento) => {
    insertarEnlaceDocumento(nombreDocumento);
});

socket.on('documentoExistente', (nombreDocumento) => {
    alert(`El documento ${nombreDocumento} ya exite en AluraDocs. Por favor verifique`);
});

socket.on('documentoBorrado', (nombreDocumento) => {
    eliminarEnlaceDocumentoBorrado(nombreDocumento);
});

export { emitirObtenerDocumentosBaseDatos, emitirAgregarDocumento }