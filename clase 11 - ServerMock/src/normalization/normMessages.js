import { normalize, schema, denormalize } from "normalizr";
import util from "util";
import fs from "fs";

const mensajes = JSON.parse(fs.readFileSync("../../mensajes.json"));


const authorSchema = new schema.Entity("authors");

const messageSchema = new schema.Entity("messages", {
    author : authorSchema
});

const messageListSchema = new schema.Entity("messagesList", {
    messages : [messageSchema]
});

function print(data) { 
    console.log(util.inspect(data, false, 12, true));
  }

const mensajesNormalizados = normalize(mensajes, messageListSchema);

print(mensajesNormalizados)
