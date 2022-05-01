    import fs from 'fs';
    import faker from '@faker-js/faker';


    
    const ContenedorMensajes = class {
    constructor(nombreArchivo) {
      this.nombre = nombreArchivo;
      this.path = `./${nombreArchivo}.json`;
      this.lastId = 0;
      this.idList = [];
      this.mensajes = [];
    }
    getAll() {
      try {
        const data = fs.readFileSync(this.path, "utf-8");
        const parsedData = JSON.parse(data);
        ;
        this.idList = parsedData.reduce((a, b) => [...a, b.id], []);
        this.lastId = Math.max(...this.idList) || 0;
        this.mensajes = parsedData;
        return parsedData;
      } catch (er) {
        fs.writeFileSync(this.path, "[]");
        console.log(er);
        return [];
      }
    }
    writeMsgOnFile() {
      const strigyList = JSON.stringify(this.mensajes);
      fs.writeFileSync(this.path, strigyList);
    }
    save(mensajes) {
      this.getAll();
      this.lastId++;
      mensajes.id = this.lastId;
      if (mensajes.author.avatar === "") {
        mensajes.author.avatar = faker.internet.avatar();
        }
      this.mensajes.push(mensajes);
      this.writeMsgOnFile();
    }
  };

  export default ContenedorMensajes