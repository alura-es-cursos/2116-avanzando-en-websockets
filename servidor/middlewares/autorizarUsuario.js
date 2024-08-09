import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next) {
    const tokenJWT = socket.handshake.auth.token;

    try {
        const payload = jwt.verify(tokenJWT, process.env.FRASE_JWT);

        socket.emit("autorizacionExitosa", payload);
        next();
    } catch (error) {
        next(error);
    }
}

export default autorizarUsuario;