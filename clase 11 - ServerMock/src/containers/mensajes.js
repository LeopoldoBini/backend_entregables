import { knexLite } from "../db/db.js";


const ContenedorMensajes = class {
  constructor(nombreArchivo) {
    this.nombre = nombreArchivo;
    this.path = `./${nombreArchivo}.txt`;
    this.lastId = 0;
    this.idList = [];
    this.mensajes = [];
  }
  async getAll() {

    try {
      const allMensajes = await knexLite.select("*").from("mensajes");
      return allMensajes;
    } catch (error) {
      console.log(error);
      return { message: "error al obtener los mensajes", error: error.message };
    } finally {
      knexLite.destroy();
    }
  }

  async save(mensajes) {
    try {
      const newMensajId = await knexLite.insert(mensajes).into("mensajes");
      return newMensajId[0];
    } catch (error) {
      console.log(error);
      return { message: "error al guardar el mensaje", error: error.message };
    } finally {
      knexLite.destroy();
    }
  }

};

  const generalMsgs = new ContenedorMensajes("gralMsg");




export default generalMsgs;