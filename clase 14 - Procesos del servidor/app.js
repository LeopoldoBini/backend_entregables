import express, { json, urlencoded } from "express";
import {createServer} from "http";
import { engine } from "express-handlebars";
import ContenedorMensajes from "./src/containers/messages.container.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { Server } from 'socket.io';
import session from "express-session";
import mongoStore from "connect-mongo";
import ViewsRoutes from "./src/routes/views.route.js";
import { apiRandomRoute } from "./src/routes/clase14.route.js";
import { normalizeMensajes, denormalizeMensajes } from "./src/normalization/normMessages.js";
import dotenv from "dotenv";
import passport from "./src/utils/passport.util.js";
import "./src/config/db.js";


dotenv.config();

const app = express();
const server = createServer(app)

const io = new Server(server)

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URISECION,
      options: {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),

    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
    rolling: true,
  }),
);
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "index.hbs",
      layoutsDir: __dirname + "/src/views/layout",
      partialsDir: __dirname + "/src/views/partials",
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.use("", new ViewsRoutes());
app.use("", apiRandomRoute)

const generalMsgs = new ContenedorMensajes("mensajes");

const usuariosConectados = []
io.on('connection', async (socket) => {
  usuariosConectados.push(socket.id)
  console.log(`💻 nuevo usuario conectado, Total: ${usuariosConectados.length}`, usuariosConectados)

  const todosLosMensajes = normalizeMensajes( await generalMsgs.getAll())

  socket.emit('todosLosMensajes', todosLosMensajes)


  
/*   socket.on('productAdded', async (id) => {
    const todosLosProductos = await productos1.getAll()
    console.log(id , ' Acaba de Mandar un producto')
    io.sockets.emit('todosLosProductos', {
      productos: todosLosProductos,
      idProductoAgregado: productos1.lastId
    })
  }) */
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

import minimist from "minimist";

const options = {
  alias: {
    p: "puerto"
  },
  default: {
    puerto: 8080
  },
};
const { puerto } = minimist(process.argv.slice(2), options)

const PORT = puerto

server.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

