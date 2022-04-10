import {knexsql} from './db.js';
import {readFileSync} from 'fs';


const productos = JSON.parse(readFileSync('./lista1.txt', 'utf-8'));


(async function insertProd () {
    try {
      const response = await knexsql.insert(productos).from('productos');
      console.log('✔ Productos agregados');
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      knexsql.destroy();
    }
  })();
