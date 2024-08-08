import { eliminarEnlaceDocumentoBorrado, insertarEnlaceDocumento } from "./index.js";
import { obtenerCookie } from "./utils/cookies.js";

const socket = io("/usuarios", {
    auth: {
        token: obtenerCookie('tokenJWT'),
    }
});

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

socket.on("connect_error", (error) => {
    alert(error);
    window.location.href = "/login/index.html";
});

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