import { coleccionDocumentos } from "./conexionBD.js";


async function obtenerDocumentos() {
    const documentos = coleccionDocumentos.find().toArray();
    console.log(documentos);
    return documentos;
}

async function obtenerDatosDocumento(nombreDocumento) {
    // return listaDocumentos.find((documento) => {
    //     return documento.nombre === nombreDocumento;
    // })
    const documento = await coleccionDocumentos.findOne({
        nombre: nombreDocumento
    });

    return documento;
}

async function actualizarDatosDocumento(nombreDocumento, texto) {
    const actualizacion = await coleccionDocumentos.updateOne({
        nombre: nombreDocumento
    }, {
        $set: {
            texto
        }
    });

    return actualizacion;
}

async function agregarDocumento(nombreDocumento) {
    const resultado = await coleccionDocumentos.insertOne({
        nombre: nombreDocumento,
        texto: ''
    });
    return resultado;
}

async function borrarDocumento(nombreDocumento) {
    const resultado = await coleccionDocumentos.deleteOne({
        nombre: nombreDocumento
    });

    return resultado;
}


export { obtenerDatosDocumento, actualizarDatosDocumento, obtenerDocumentos, agregarDocumento, borrarDocumento }