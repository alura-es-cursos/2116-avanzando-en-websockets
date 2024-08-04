import "dotenv/config";

import registrarEventosDocumentos from "./registrarEventos/documentos.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import registrarEventosRegistro from "./registrarEventos/registro.js";
import io from "./servidor.js";

io.on('connection', (socket) => {
    console.log('Se conectó un cliente con id:', socket.id);

    registrarEventosRegistro(socket, io);
    registrarEventosLogin(socket, io);
    registrarEventosInicio(socket, io);
    registrarEventosDocumentos(socket, io);

});

