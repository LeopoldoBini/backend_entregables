import { readFileSync, writeFileSync } from "fs";

const ContenedorMensajes = class {
    constructor(nombreArchivo) {
      this.nombre = nombreArchivo;
      this.path = `./${nombreArchivo}.txt`;
      this.lastId = 0;
      this.idList = [];
      this.mensajes = [];
    }
    getAll() {
      try {
        const data = readFileSync(this.path, "utf-8");
        const parsedData = JSON.parse(data);
        ;
        this.idList = parsedData.reduce((a, b) => [...a, b.id], []);
        this.lastId = Math.max(...this.idList);
        this.mensajes = parsedData;
        return parsedData;
      } catch (er) {
        writeFileSync(this.path, "[]");
        console.log(er);
        return [];
      }
    }
    writeMsgOnFile() {
      const strigyList = JSON.stringify(this.mensajes);
      writeFileSync(this.path, strigyList);
    }
    save(mensajes) {
      this.getAll();
      this.lastId++;
      mensajes.id = this.lastId;
      this.mensajes.push(mensajes);
      this.writeMsgOnFile();
    }
  };

  const generalMsgs = new ContenedorMensajes("gralMsg");

export default generalMsgs;