import { emitirAgregarDocumento, emitirObtenerDocumentosBaseDatos } from "./socket-front-index.js";
import { borrarCookie, obtenerCookie } from "./utils/cookies.js";

const tokenJWT = obtenerCookie("tokenJWT");
console.log(tokenJWT);
const listaDocumentos = document.querySelector('#lista-documentos');
const formulario = document.querySelector('#form-agrega-documento');
const inputNuevoDocumento = document.querySelector('#input-documento');
const botonLogout = document.querySelector('#boton-logout');

botonLogout.addEventListener('click', () => {
    borrarCookie('tokenJWT');
    alert("Sesión cerrada correctamente");
    window.location.href = "/login/index.html";
});

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    emitirAgregarDocumento(inputNuevoDocumento.value);
    inputNuevoDocumento.value = '';
});



function insertarEnlaceDocumento(nombreDocumento) {
    listaDocumentos.innerHTML += `
       <a href="documento/index.html?nombre=${nombreDocumento}" id="doc-${nombreDocumento}" class="list-group-item list-group-item-action">
        ${nombreDocumento}
      </a>
    `;

}

function eliminarEnlaceDocumentoBorrado(nombreDocumento) {
    const enlace = document.getElementById(`doc-${nombreDocumento}`);

    if (enlace) {
        listaDocumentos.removeChild(enlace);
    }

}
emitirObtenerDocumentosBaseDatos();

export { insertarEnlaceDocumento, eliminarEnlaceDocumentoBorrado }