import "dotenv/config";

import registrarEventosDocumentos from "./registrarEventos/documentos.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import registrarEventosRegistro from "./registrarEventos/registro.js";
import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

io.of("/usuarios").use(autorizarUsuario);


io.of("/usuarios").on('connection', (socket) => {
    console.log('Se conectó un cliente con id:', socket.id);
    registrarEventosInicio(socket, io);
    registrarEventosDocumentos(socket, io);

});

io.of("/").on('connection', (socket) => {
    console.log('Se conectó un cliente con id:', socket.id);

    registrarEventosRegistro(socket, io);
    registrarEventosLogin(socket, io);

});

