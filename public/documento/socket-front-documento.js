import { obtenerCookie } from "../utils/cookies.js";
import { actualizarEditor, actualizarListaUsuarios, alertarYRedirigir, gestionaAutorizacionExitosa } from "./documento.js";

const socket = io("/usuarios", {
    auth: {
        token: obtenerCookie('tokenJWT'),
    }
});

socket.on("autorizacionExitosa", gestionaAutorizacionExitosa);

socket.on("usuariosEnDocumento", actualizarListaUsuarios);

socket.on("connect_error", (error) => {
    alert(error);
    window.location.href = "/login/index.html";
});

function emitirNombreDocumento(datosEntradaDocumento) {
    socket.emit('nombreDocumento', datosEntradaDocumento, (texto) => {
        console.log('Actualizando datos iniciales del documento');
        actualizarEditor(texto);
    });
}


function emitirCambiosEditor(datos) {
    console.log(datos);
    socket.emit('cambiosEditor', datos);
}

socket.on('actualizarEditor', (texto) => {
    actualizarEditor(texto);
});

function emitirBorrarDocumento(nombreDocumento) {
    socket.emit('borrarDocumento', nombreDocumento);
}

socket.on('documentoBorrado', (nombreDocumento) => {
    alertarYRedirigir(nombreDocumento);
});


export { emitirCambiosEditor, emitirNombreDocumento, emitirBorrarDocumento }