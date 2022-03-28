const express = require("express");
const http = require('http')
const fs = require("fs");
const { engine } = require("express-handlebars");
const app = express();
const server = http.createServer(app)
const { Server } = require('socket.io');
const { isObject } = require("util");
const { Console } = require("console");
const io = new Server(server)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
      const data = fs.readFileSync(this.path, "utf-8");
      const parsedData = JSON.parse(data);

      this.idList = parsedData.reduce((a, b) => [...a, b.id], []);
      this.lastId = Math.max(...this.idList);
      this.productos = parsedData;
      return parsedData;
    } catch (er) {
      fs.writeFileSync(this.path, "[]");
      console.log(er);
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
      fs.writeFileSync(this.path, JSON.stringify(filteredList));
      this.getAll();
      return "Producto eliminado";
    } else {
      return "no tenemos ese producto";
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
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      const parsedData = JSON.parse(data);
      ;
      this.idList = parsedData.reduce((a, b) => [...a, b.id], []);
      this.lastId = Math.max(...this.idList);
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
    this.mensajes.push(mensajes);
    this.writeMsgOnFile();
  }
};
const productos1 = new ContenedorProductos("lista1");
const generalMsgs = new ContenedorMensajes("gralMsg");


productos1.getAll();
generalMsgs.getAll();

const usuariosConectados = []
const todosLosMensajes = []

io.on('connection', (socket) => {
  usuariosConectados.push(socket.id)
  console.log(`💻 nuevo usuario conectado, Total: ${usuariosConectados.length}`, usuariosConectados)

  socket.emit('todosLosMensajes', todosLosMensajes)


  socket.on('MensajeDesdeClienteAlConectarse', (d) => {
    console.log(d)
  })
  socket.on('productAdded', (id) => {
    console.log(id , ' Acaba de Mandar un producto')
    io.sockets.emit('todosLosProductos', {
      productos: productos1.productos,
      idProductoAgregado: productos1.lastId
    })
  })
  socket.on('inputChatCliente', (fullMessage) => {
    todosLosMensajes.push(fullMessage)
    io.sockets.emit('todosLosMensajes', todosLosMensajes)

  })

  socket.on('disconnect', () => {
    console.log('❌ Usuario desconectado')
    usuariosConectados.splice(socket.id)
  })
})


app.set("views", "./src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials",
  })
);

app.get("/", (req, res) => {
  res.status(200).render("main", { productos: productos1.productos })

});
app.get("/listaProductos", (req, res) => {
  res.status(200).json(productos1.productos);
});
app.get('/fetchProductos', (req, res) => {
  res.send({ productos: productos1.productos, lastId: productos1.lastIds })
})

app.post("/", (req, res) => {
  const { body } = req;
  try {
    console.log(body)
    console.log()
    res.status(200).json(productos1.save(body));
  } catch (err) {
    console.log(err);
    res.status(400)
  }
});

const PORT = 1000;
server.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));
