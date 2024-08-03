import { MongoClient } from "mongodb";

const client = new MongoClient(
    'mongodb+srv://aluradocs:1234@aluradocs.o8jnbky.mongodb.net/?retryWrites=true&w=majority&appName=AluraDocs'
);

let coleccion;
try {
    await client.connect();

    const db = client.db('aluradocs');
    coleccion = db.collection('documentos');

    console.log('Conectado a la base de datos MongoDB');


} catch (error) {
    console.log(error);
}

export { coleccion }