const socket = io();

function emitirRegistroUsuario(datosUsuario) {
    socket.emit('registrarUsuario', datosUsuario);
}

socket.on('usuarioRegistrado', () => alert('Usuario registrado correctamente'));
socket.on('errorRegistrandoUsuario', () => alert('Error registrando el usuario'));
socket.on('usuarioRepetido', () => alert('Usuario ya registrado'));

export { emitirRegistroUsuario };