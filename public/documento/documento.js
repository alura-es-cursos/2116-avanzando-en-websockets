import { emitirBorrarDocumento, emitirCambiosEditor, emitirNombreDocumento } from "./socket-front-documento.js";

const textoEditor = document.getElementById('editor-texto');
const tituloDocumento = document.getElementById('titulo-documento');
const listaUsuariosConectados = document.getElementById('usuarios-conectados');
const parametros = new URLSearchParams(window.location.search);

const nombreDocumento = parametros.get('nombre');

tituloDocumento.textContent = nombreDocumento || 'Documento sin titulo';
const botonBorrarDocumento = document.querySelector('#excluir-documento');

function gestionaAutorizacionExitosa(payload) {
    emitirNombreDocumento({ nombreDocumento, nombreUsuario: payload.nombreUsuario });
}

function actualizarListaUsuarios(listaUsuarios) {
    let listaUsuarioHTML = "";

    listaUsuarios.forEach((usuario) => {
        listaUsuarioHTML += `<li class="list-group-item">${usuario}</li > `;
    });

    listaUsuariosConectados.innerHTML = listaUsuarioHTML;
}

textoEditor.addEventListener("keyup", () => {
    emitirCambiosEditor({ textoEditor: textoEditor.value, nombreDocumento });
});

botonBorrarDocumento.addEventListener('click', () => {
    emitirBorrarDocumento(nombreDocumento);
});


function actualizarEditor(texto) {
    textoEditor.value = texto;
}

function alertarYRedirigir(nombre) {
    if (nombre === nombreDocumento) {
        alert(`El documento ${nombre} ha sido borrado`);
        window.location.href = '/';
    }

}

export { actualizarEditor, alertarYRedirigir, gestionaAutorizacionExitosa, actualizarListaUsuarios }