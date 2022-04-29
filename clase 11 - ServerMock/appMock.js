import express, { json, urlencoded } from "express";
import {createServer} from "http";
import { engine } from "express-handlebars";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { Server } from 'socket.io';
import ViewsRoutes from "./src/routes/views.route.js";

const app = express();
const server = createServer(app)

const io = new Server(server)

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
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


app.use("", new ViewsRoutes());




const PORT = 8080;
server.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));