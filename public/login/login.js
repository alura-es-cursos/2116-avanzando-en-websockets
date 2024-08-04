import { emitirLoginUsuario } from "./socket-front-login.js";


const form = document.querySelector('#form-login');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const usuario = document.getElementById('input-usuario').value;
    const contrasena = document.getElementById('input-contrasena').value;

    emitirLoginUsuario({ usuario, contrasena });

});