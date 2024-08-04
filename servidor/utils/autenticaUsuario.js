import { scryptSync, timingSafeEqual } from "crypto";

function autenticarUsuario(contrasenaEnviada, usuario) {
    const hashPrueba = scryptSync(contrasenaEnviada, usuario.saltContrasena, 64);
    const hashReal = Buffer.from(usuario.hashContrasena, "hex");

    const autenticado = timingSafeEqual(hashPrueba, hashReal);
    return autenticado;
}

export default autenticarUsuario;