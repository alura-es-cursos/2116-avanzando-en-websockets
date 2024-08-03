import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

//import './bd/conexionBD.js';

const app = express();
const port = process.env.port || 3000;

const caminoActual = url.fileURLToPath(import.meta.url);
const rutaPaginas = path.join(caminoActual, '../..', 'public');

app.use(express.static(rutaPaginas));

const servidorHttp = http.createServer(app);

servidorHttp.listen(port, () => {
    console.log('Servidor activo en la puerta ' + port);
});

const io = new Server(servidorHttp);

export default io;