import { MongoClient } from "mongodb";

const client = new MongoClient(
    'mongodb+srv://aluradocs:1234@aluradocs.o8jnbky.mongodb.net/?retryWrites=true&w=majority&appName=AluraDocs'
);

let coleccionDocumentos;
let coleccionUsuarios;
try {
    await client.connect();

    const db = client.db('aluradocs');
    coleccionDocumentos = db.collection('documentos');
    coleccionUsuarios = db.collection('usuarios');

    console.log('Conectado a la base de datos MongoDB');


} catch (error) {
    console.log(error);
}

export { coleccionDocumentos, coleccionUsuarios }