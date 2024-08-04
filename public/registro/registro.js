import { emitirRegistroUsuario } from "./socket-front-registro.js";

const form = document.querySelector('#form-cadastro');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const usuario = document.getElementById('input-usuario').value;
    const contrasena = document.getElementById('input-contrasena').value;

    emitirRegistroUsuario({ usuario, contrasena });

});