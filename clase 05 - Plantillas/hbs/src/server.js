const express = require("express");
const fs = require("fs");
const { engine } = require("express-handlebars");

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
  writeProductosOnFile() {
    const strigyList = JSON.stringify(this.productos);
    fs.writeFileSync(this.path, strigyList);
  }
  save(producto) {
    if (producto.title && producto.price && producto.thumbnail) {
      this.getAll();
      this.idCounter++;
      producto.id = this.idCounter;
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
    this.idCounter = 0;
    this.idList = [];
    this.productos = [];
  }
};
const productos1 = new Contenedor("lista1");

productos1.getAll()

const usuarios = [
  {
    nombre: "Nombre 1",
    edad: 31,
    estilo: "est1",
  },
  {
    nombre: "Nombre 2",
    edad: 32,
    estilo: "est1",
  },
  {
    nombre: "Nombre 3",
    edad: 33,
    estilo: "est2",
  },
];

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
    mostrarProductos: false,
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
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));
