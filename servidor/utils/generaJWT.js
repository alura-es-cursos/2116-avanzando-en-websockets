import jwt from "jsonwebtoken";

function generarJWT(payload) {
    const token = jwt.sign(payload, process.env.FRASE_JWT, {
        "expiresIn": "1h"
    });

    return token;
}

export default generarJWT;