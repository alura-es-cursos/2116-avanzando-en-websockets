import registrarEventosDocumentos from "./registrarEventos/documentos.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import io from "./servidor.js";

io.on('connection', (socket) => {
    console.log('Se conectó un cliente con id:', socket.id);

    registrarEventosInicio(socket, io);
    registrarEventosDocumentos(socket, io);

});

