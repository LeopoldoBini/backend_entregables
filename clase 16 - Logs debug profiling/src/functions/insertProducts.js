import "../config/db.config.js";
import fs from "fs";
import {createManyProducts} from "./products/index.js";
import path from "path";

const productsToInsert = fs.readFileSync( path.resolve() + '/src/functions/productos.json', 'utf-8');

//createManyProducts(JSON.parse(productsToInsert));