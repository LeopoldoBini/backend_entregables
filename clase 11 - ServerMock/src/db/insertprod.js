import {knexsql ,knexLite} from './db.js';
import {readFileSync} from 'fs';


const productos = JSON.parse(readFileSync('./lista1.txt', 'utf-8'));
const mensajes = [
  {
    message: 'Hola!',
    timestamp: '28/3/2022, 17:38:18',
    nickname: 'Leopoldo'
  },
  {
    message: 'Hola! como estas?! ',
    timestamp: '28/3/2022, 17:39:29',
    nickname: 'Raul'
  },
  {
    message: 'Hola tios!',
    timestamp: '28/3/2022, 17:39:29',
    nickname: 'Raul'
  },
  {
    message: 'Excelente ahora que todo sale bien.',
    timestamp: '28/3/2022, 17:51:43',
    nickname: 'Leopoldo'
  },
  {
    message: 'Hey!',
    timestamp: '9/4/2022, 20:57:18',
    nickname: 'Juan Franco'
  }
]

async function insertProd () {
    try {
      const response = await knexsql.insert(productos).from('productos');
      console.log('✔ Productos agregados');
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      knexsql.destroy();
    }
};

  async function insertMsg () {
    try {
      const response = await knexLite.insert(mensajes).from('mensajes');
      console.log('✔ Msj agregados');
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      knexLite.destroy();
    }
  }

