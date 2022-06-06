import "./src/config/db.config.js";
import express, { json, urlencoded, Router } from 'express';
import http from 'http'
import argvs from './src/config/minimist.config.js';
import path from "path";
import { engine } from "express-handlebars"
//ver si se pueden separar
import cluster from "cluster";
import os from "os";
export const numCPUs = os.cpus().length;
//
import { productRouter, cartRouter, messagesRouter, infoRouter, randomRouter } from './src/routes/index.js';



if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    if (argvs.mode == "CLUSTER"){
        console.log(argvs.mode);
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }   
    }
    else{
        cluster.fork();
    }


} else {

    const app = express()
    const server = http.createServer(app)
    //import './src/sockets/messagesSocket.js' ← no se como se integrara esto para hacer andar el cliente ocn un socket modularizadamente

    app.use(json())
    app.use(urlencoded({ extended: true }))
    app.use(express.static("public"));


    app.use('/api', productRouter)
    app.use('/api', cartRouter)
    app.use('/api', messagesRouter)
    app.use('/info', infoRouter)
    app.use('/api/random', randomRouter)

    app.get("/", (req, res) => {
        res.send(`Puerto :${argvs.puertoFromArgv} , PID: ${process.pid}`)
    })

    app.set("views", "./src/views");
    app.set("view engine", "hbs");
    app.engine(
        "hbs",
        engine({
            extname: ".hbs",
            defaultLayout: "index.hbs",
            layoutsDir: path.resolve() + "/src/views/layout",
            partialsDir: path.resolve() + "/src/views/partials",
        })
    );
    const PORT = argvs.puertoFromArgv

    server.listen(PORT, () => {
        console.log(`🤖 Server started on http://localhost:${PORT}`)
    })
    server.on('error', (err) => console.log(err))

}




