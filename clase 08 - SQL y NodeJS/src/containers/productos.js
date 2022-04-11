import { knexsql } from "../../db/db.js";

const ContenedorProductos = class {
  constructor(nombreArchivo) {
    this.nombre = nombreArchivo;
    this.path = `./${nombreArchivo}.txt`;
    this.lastId = 0;
    this.idList = [];
    this.productos = [];
  }
  async getAll() {

    try {
      const allproducts = await knexsql.select("*").from("productos");
      return allproducts;	
      
    } catch (error) {
      console.log(error);
      return { message: "error al obtener los productos", error: error.message };
    } finally {
      knexsql.destroy();
    }

  }

  async save(producto) {
    try { 
      const newProductId = await knexsql.insert(producto).into("productos");
      return newProductId[0];
    } catch (error) {
      console.log(error);
      return { message: "error al guardar el producto", error: error.message };
    } finally {
      knexsql.destroy();
    }
  }
  async getByid(id) {
    try {
      const foundProduct = await knexsql.select("*").from("productos").where("id" ,id);
      return foundProduct[0];	
    } catch (error) {
      console.log(error);
      return { message: "error al obtener el producto", error: error.message };
    } finally {
      knexsql.destroy();
    }

  }
  async reWrite(id, producto) {
    try {
      await knexsql.update(producto).into("productos").where("id", id);
      const updatedProduct = await this.getByid(id);
      return { message: "producto actualizado", producto: updatedProduct };
    } catch (error) {
      console.log(error);
      return { message: "error al actualizar el producto", error: error.message };
    } finally {
      knexsql.destroy();
    }
  }
  async deleteById(id) {
    try {
      const deletedProd = await this.getByid(id);
      await knexsql.delete().from("productos").where("id", id);
      return { message: "producto eliminado", producto: deletedProd };
    } catch (error) {
      console.log(error);
      return { message: "error al eliminar el producto", error: error.message };
    } finally {
      knexsql.destroy();
    }
  }

};

const productos1 = new ContenedorProductos("lista1");


export default productos1;