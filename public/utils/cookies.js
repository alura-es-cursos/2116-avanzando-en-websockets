function definirCookie(llave, valor) {
    document.cookie = `${llave}=${valor};path=/`;
}

function obtenerCookie(llave) {
    return document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${llave}=`))
        ?.split("=")[1];
}

function borrarCookie(llave) {
    document.cookie =
        `${llave}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; `;
}

export { definirCookie, obtenerCookie, borrarCookie };