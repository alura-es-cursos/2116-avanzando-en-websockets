import { randomBytes, scryptSync } from "crypto";

function crearHashYSalt(contrasena) {
    const saltContrasena = randomBytes(16).toString("hex");

    const hashContrasena = scryptSync(contrasena, saltContrasena, 64).toString("hex");

    return { saltContrasena, hashContrasena };
}

export default crearHashYSalt;