import { consultarUsuario, registrarUsuario } from "../bd/usuariosBD.js";

function registrarEventosRegistro(socket, io) {
    socket.on('registrarUsuario', async (datosUsuario) => {
        const usuario = await consultarUsuario(datosUsuario.usuario);

        if (usuario === null) {
            const resultado = await registrarUsuario(datosUsuario);
            console.log(resultado);
            if (resultado.acknowledged) {
                socket.emit('usuarioRegistrado');
            } else {
                socket.emit('errorRegistrandoUsuario');
            }
        } else {
            socket.emit('usuarioRepetido');
        }


    })
}

export default registrarEventosRegistro;