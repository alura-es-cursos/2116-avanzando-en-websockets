import { consultarUsuario } from "../bd/usuariosBD.js";
import autenticarUsuario from "../utils/autenticaUsuario.js";
import generarJWT from "../utils/generaJWT.js";

function registrarEventosLogin(socket, io) {
    socket.on('loginUsuario', async (datosUsuario) => {
        const usuario = await consultarUsuario(datosUsuario.usuario);

        console.log(usuario);
        console.log(datosUsuario.contrasena);
        if (usuario) {
            //Autenticación
            const autenticado = autenticarUsuario(datosUsuario.contrasena, usuario);

            if (autenticado) {
                const token = generarJWT({ nombreUsuario: usuario.usuario });
                socket.emit("usuarioAutenticado", token);
            } else {
                socket.emit("errorAutenticando");
            }
        } else {
            socket.emit('usuarioNoEncontrado');
        }

    });
}

export default registrarEventosLogin;