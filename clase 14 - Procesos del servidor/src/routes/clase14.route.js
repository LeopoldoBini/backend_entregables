import express from "express";
import {fork} from "child_process";


const computo = fork("src/services/randomNumb.js");

export const apiRandomRoute = express.Router();

const desafioClase14 = (req, res) => {
    try {
        const cant = req.query.cantidad || 100000000;
        computo.send(cant);
        computo.on("message", (ObjDesafio) => {
            res.status(200).json(ObjDesafio);
        });
    }
    catch (err) {
        res.status(400).json({ message: "Error por algo" });
    }
}

const info = (req, res) => {
    try {
        const args = [...process.argv]
        args.splice(0, 2);
        const info = {
            1 : args,
            2 : process.platform,
            3 : process.version,
            4 : process.memoryUsage.rss(),
            5 : process.argv[0],
            6 : process.pid,
            7 : process.argv[1],
        }
        console.log(info)
        res.status(200).render("info", info);
    }
    catch (err) {
        res.status(400).json({ message: "Error por algo" });
    }
}

apiRandomRoute.get("/api/randoms" , desafioClase14)
apiRandomRoute.get("/info" , info);