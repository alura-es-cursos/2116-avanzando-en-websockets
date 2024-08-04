import crearHashYSalt from "../utils/codificaContrasena.js";
import { coleccionUsuarios } from "./conexionBD.js";

function consultarUsuario(usuario) {
    return coleccionUsuarios.findOne({ usuario });
}

function registrarUsuario({ usuario, contrasena }) {
    const { saltContrasena, hashContrasena } = crearHashYSalt(contrasena);
    return coleccionUsuarios.insertOne({ usuario, hashContrasena, saltContrasena });
}

export { registrarUsuario, consultarUsuario }