import { normalize, schema, denormalize } from "normalizr";


export const normalizeMensajes = (mensajes) => {

    const authorSchema = new schema.Entity("authors");
    const messageSchema = new schema.Entity("messages", {
        author : authorSchema   });
    const messageListSchema = new schema.Array(messageSchema);

    const mensajesNormalizados = normalize(mensajes, messageListSchema);

    return mensajesNormalizados;
}


export const denormalizeMensajes = (mensajesNormalizados) => {
    const authorSchema = new schema.Entity("authors");
    const messageSchema = new schema.Entity("messages", {
        author : authorSchema   });
    const messageListSchema = new schema.Array(messageSchema);
    const mensajesDenormalizados = denormalize(mensajesNormalizados.result, messageListSchema, mensajesNormalizados.entities);
    return mensajesDenormalizados;
}




