import { readFileSync, writeFileSync } from "fs";
import {knexsql} from './db.js';

const ContenedorProductos = class {
    constructor(nombreArchivo) {
      this.nombre = nombreArchivo;
      this.path = `./${nombreArchivo}.txt`;
      this.lastId = 0;
      this.idList = [];
      this.productos = [];
    }
    getAll() {
      try {
        const data = readFileSync(this.path, "utf-8");
        const parsedData = JSON.parse(data);
  
        this.idList = parsedData.reduce((a, b) => [...a, b.id], []);
        this.lastId = Math.max(...this.idList);
        this.productos = parsedData;
        return parsedData;
      } catch (er) {
        writeFileSync(this.path, "[]");
        console.log(er);
        return [];
      }
    }
    writeProductosOnFile() {
      const strigyList = JSON.stringify(this.productos);
      writeFileSync(this.path, strigyList);
    }
    save(producto) {
      if (producto.title && producto.price && producto.thumbnail) {
        this.getAll();
        this.lastId++;
        producto.id = this.lastId;
        this.productos.push(producto);
        this.writeProductosOnFile();
        return producto.id;
      } else {
        throw new Error("Se requieren todos los campos");
      }
    }
    getByid(id) {
      this.getAll();
      const foundProduct = this.productos.filter((producto) => producto.id == id);
      return foundProduct.length === 0
        ? "no tenemos ningun producto con ese id"
        : foundProduct;
    }
    reWrite(id, producto) {
      this.getAll();
      if (this.idList.includes(id)) {
        const { title, price, thumbnail } = producto;
        const indexToReWrite = this.productos.findIndex(
          (producto) => producto.id == id
        );
  
        title ? (this.productos[indexToReWrite].title = title) : "";
        price ? (this.productos[indexToReWrite].price = price) : "";
        thumbnail ? (this.productos[indexToReWrite].thumbnail = thumbnail) : "";
        ;
        this.writeProductosOnFile();
        return {
          mensaje: "producto actualizado",
          producto: this.productos[indexToReWrite],
        };
      } else {
        ("no tenemos ese producto");
      }
    }
    deleteById(id) {
      this.getAll();
      if (this.idList.includes(id)) {
        const filteredList = this.productos.filter((prod) => prod.id != id);
        writeFileSync(this.path, JSON.stringify(filteredList));
        this.getAll();
        return "Producto eliminado";
      } else {
        return "no tenemos ese producto";
      }
    }
    deleteAll() {
      writeFileSync(this.path, "[]");
      this.lastId = 0;
      this.idList = [];
      this.productos = [];
    }
  };

  const productos1 = new ContenedorProductos("lista1");

  export default productos1;