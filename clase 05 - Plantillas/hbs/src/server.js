const express = require("express");
const fs = require("fs");
const { engine } = require("express-handlebars");

const ContenedorProductos = class {
  constructor(nombreArchivo) {
    this.nombre = nombreArchivo;
    this.path = `./${nombreArchivo}.txt`;
    this.lastId = 0;
    this.idList = [];
    this.productos = [];
  }
  getAll() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf-8");
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        if (parsedData.length > 0) { 
          this.idList = parsedData.reduce((a, b) => [...a, b.id], []);;
          
          this.lastId = Math.max(...this.idList);

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
  writeProductosOnFile() {
    const strigyList = JSON.stringify(this.productos);
    fs.writeFileSync(this.path, strigyList);
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
      throw new Error("Se requieren todos los campos")
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
        console.log(this.productos[indexToReWrite])
      this.writeProductosOnFile();
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
    this.lastId = 0;
    this.idList = [];
    this.productos = [];
  }
};

const ContenedorMensajes = class {
  constructor(nombreArchivo) {
    this.nombre = nombreArchivo;
    this.path = `./${nombreArchivo}.txt`;
    this.lastId = 0;
    this.idList = [];
    this.mensajes = [];
  }
  getAll() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf-8");
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        if (parsedData.length > 0) { 
          this.idList = parsedData.reduce((a, b) => [...a, b.id], []);;
          
          this.lastId = Math.max(...this.idList);

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
  writeMsgOnFile() {
    const strigyList = JSON.stringify(this.mensajes);
    fs.writeFileSync(this.path, strigyList);
  }
  save(mensajes) {
      this.getAll();
      this.lastId++;
      mensajes.id = this.lastId;
      this.mensajes.push(mensajes);
      this.writeMsgOnFile();
  }
}
const productos1 = new ContenedorProductos("lista1");
const generalMsgs = new ContenedorMensajes("gralMsg")

productos1.getAll()
generalMsgs.getAll()


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials",
  }),
);

app.get("/", (req, res) => {
  res.status(200).render("main", {});
});
app.get("/listaProductos", (req, res) => {
  const stringyProducts = productos1.productos.map((prod) => {
    return {stringyProduct : JSON.stringify(prod)}
  })
  res.status(200).render("listaDeProductos", {
    productos : stringyProducts,
  });
});

app.post("/productos", (req, res) => {
  const { body } = req;
  try {
    const id = productos1.save(body);
    const mensaje = (`Producto agregado con exito, id: ${id}`)
    res.status(200).render("main", {
      mensaje
    });
  }catch(err){
    res.status(200).render("main", {
      mensaje : err
    });
  }
  
});

const PORT = 1000;
const server = app.listen(PORT, () =>
  console.log(`???? Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));
