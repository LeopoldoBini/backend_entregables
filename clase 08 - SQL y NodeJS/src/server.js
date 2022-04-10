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


productos1.getAll();
generalMsgs.getAll();



const usuariosConectados = []
const todosLosMensajes = []

io.on('connection', (socket) => {
  usuariosConectados.push(socket.id)
  console.log(`💻 nuevo usuario conectado, Total: ${usuariosConectados.length}`, usuariosConectados)

  socket.emit('todosLosMensajes', generalMsgs.mensajes)


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
    
    generalMsgs.save(fullMessage)
    io.sockets.emit('todosLosMensajes', generalMsgs.mensajes)

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

