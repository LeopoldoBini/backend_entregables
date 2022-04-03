const { query } = require("express");
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const apiProd = express.Router();
app.use("/api/productos", apiProd);

const Contenedor = class {
  constructor(nombreArchivo) {
    this.nombre = nombreArchivo;
    this.path = `./${nombreArchivo}.txt`;
    this.idCounter = 0;
    this.idList = [];
    this.productos = [];
  }
  getAll() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf-8");
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        if (parsedData.length > 0) {
          const idList = parsedData.reduce((a, b) => {
            return [...a, b.id];
          }, []);
          this.idList = idList;
          const maxId = Math.max(...idList);
          this.idCounter = maxId;

          this.productos = parsedData;
        }
        return parsedData;
      } else {
        fs.writeFileSync(this.path, "[]");
        return [];
      }
    } else {
      fs.writeFileSync(this.path, "[]");
      return [];
    }
  }
  
  writeProductosFile() {
    const strigyList = JSON.stringify(this.productos);
    fs.writeFileSync(this.path, strigyList);
  }
  save(producto) {
    if (producto.title && producto.price && producto.thumbnail) {
      this.getAll();

      this.idCounter++;
      producto.id = this.idCounter;
      console.log(this.productos, "antes del push");
      this.productos.push(producto);
      console.log(this.productos, "despues del pus");
      this.writeProductosFile();

      return producto.id;
    } else {
      console.log("formato equivocado");
    }
  }


  getByid(id) {
    this.getAll();
    const foundProduct = this.productos.filter((producto) => producto.id == id);
    return foundProduct.length == 0
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
        console.log(this.productos[indexToReWrite])
      this.writeProductosFile();
      return{
          mensaje : 'producto actualizado',
          producto : this.productos[indexToReWrite]
      }
    }else{'no tenemos ese producto'}
  }
  deleteById(id) {
    this.getAll();
    if (this.idList.includes(id)) {
      const filteredList = this.productos.filter((prod) => prod.id != id);
      fs.writeFileSync(this.path, JSON.stringify(filteredList));
      this.getAll();
      return "Producto eliminado"
    }else{
        return "no tenemos ese producto"
    }
  }
  deleteAll() {
    fs.writeFileSync(this.path, "[]");
    this.idCounter = 0;
    this.idList = [];
    this.productos = [];
  }
};

const productos1 = new Contenedor("lista1");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/entregable.html");
});

apiProd.get("/", (req, res) => {
  productos1.getAll();
  const { id } = req.query;
  id
    ? res.status(200).json(productos1.getByid(id))
    : res.status(200).json(productos1.productos);
});

apiProd.post("/", (req, res) => {
  const { body } = req;
  const id = productos1.save(body);
  res.status(200).send(`Producto agregado con exito, id: ${id}`);
});

apiProd.put("/", (req, res) => {
    const { body } = req;
    const { id } = body
    console.log(id , body , 'del put')
    res.status(200).send(productos1.reWrite( id , body));
  });

  apiProd.delete("/", (req, res) => {
    const { id } = req.query;
    res.status(200).json(productos1.deleteById(id))

  })




const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log("🤖 Server started on http://localhost:8080");
});
server.on("error", (err) => console.log(err));
