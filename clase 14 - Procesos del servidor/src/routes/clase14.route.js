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

apiRandomRoute.get("/api/randoms" , desafioClase14);