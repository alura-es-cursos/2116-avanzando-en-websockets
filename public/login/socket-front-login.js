const socket = io();

function emitirLoginUsuario(datosUsuario) {
    socket.emit('loginUsuario', datosUsuario);
}

socket.on("usuarioAutenticado", () => {
    alert('Usuario autenticado correctamente');
    window.location.href = "/";
});

socket.on("errorAutenticando", () => {
    alert('Error en datos.');
});

socket.on("usuarioNoEncontrado", () => {
    alert('Usuario no encontrado');
});

export { emitirLoginUsuario }