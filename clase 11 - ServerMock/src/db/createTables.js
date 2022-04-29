import {knexsql} from './db.js';
import {knexLite} from './db.js';


async function createTableProductos () {
  try {

    const productosExist = await knexsql.schema.hasTable('productos');
    if (!productosExist) {
      await knexsql.schema.createTable('productos', (table) => {
        table.increments('id').primary().notNullable(),
          table.string('price', 100).notNullable(),
          table.string('title', 100).notNullable(),
          table.string('thumbnail', 100).notNullable();
      });
      console.log('🔥 Tabla "productos" creada!');
    }

  } catch (error) {
    console.log(error);
  } finally {
    knexsql.destroy();
  }
}


async function createTableMessages () {
    try {
      const mensajesExist = await knexLite.schema.hasTable('mensajes');
      if (!mensajesExist) {
        await knexLite.schema.createTable('mensajes', (table) => {
            table.increments('id').primary().notNullable(),
            table.string('nickname', 100).notNullable(),
            table.string('message', 100).notNullable(),
            table.string('timestamp', 100).notNullable();
        });
        console.log('🔥 Tabla "mensajes" creada!');
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      knexLite.destroy();
    }
  }

  createTableMessages()