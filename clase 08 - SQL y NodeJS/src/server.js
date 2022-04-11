import express from "express";
import bodyParser from 'body-parser';
import { createServer } from 'http';
import generalMsgs from "./containers/mensajes.js";
import productos1 from "./containers/productos.js";
import { engine } from "express-handlebars";
const app = express();
const server = createServer(app)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { Server } from 'socket.io';


const io = new Server(server)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));





const usuariosConectados = [];


io.on('connection', async (socket) => {
  usuariosConectados.push(socket.id)
  console.log(`💻 nuevo usuario conectado, Total: ${usuariosConectados.length}`, usuariosConectados)

  const todosLosMensajes = await generalMsgs.getAll()
  console.log(todosLosMensajes)
  socket.emit('todosLosMensajes', todosLosMensajes)


  
  socket.on('productAdded', async (id) => {
    const todosLosProductos = await productos1.getAll()
    console.log(id , ' Acaba de Mandar un producto')
    io.sockets.emit('todosLosProductos', {
      productos: todosLosProductos,
      idProductoAgregado: productos1.lastId
    })
  })
  socket.on('inputChatCliente', async (fullMessage) => {
    await generalMsgs.save(fullMessage)
    const todosLosMensajes = await generalMsgs.getAll()
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

app.get("/", async (req, res) => {
  const productos = await productos1.getAll();
  res.status(200).render("main", { productos });

});
app.get("/listaProductos", async (req, res) => {
  const productos = await productos1.getAll(); 
  res.status(200).json(productos);
});
app.get('/fetchProductos', async (req, res) => {
  const productos = await productos1.getAll();
  const lastId = Math.max(productos.map(producto => producto.id))
  res.send({ productos: productos, lastId: lastId })
})

app.post("/", async (req, res) => {
  const { body } = req;
  try {
    console.log(body)
    const savedProd = await productos1.save(body);
    res.status(200).json(savedProd);
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

