import { consultarUsuario, registrarUsuario } from "../bd/usuariosBD.js";

function registrarEventosRegistro(socket, io) {
    socket.on('registrarUsuario', async (datosUsuarios) => {
        const usuario = await consultarUsuario(datosUsuarios.usuario);

        if (usuario === null) {
            const resultado = await registrarUsuario(datosUsuarios);
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