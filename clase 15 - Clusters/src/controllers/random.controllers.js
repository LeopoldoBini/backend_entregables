import {randomNumb} from '../functions/randomNumb.js'
import argvs from '../config/minimist.config.js';

export const randomN = async (req, res) => {
    try {
        const cant = req.query.cantidad || 100000000;
        const obj = randomNumb(cant);
        const response = {
            puerto : argvs.puertoFromArgv,
            process: process.pid,
            obj
        }
        res.status(200).json(response);
        
    }
    catch (err) {
        res.status(400).json({ message: "Error por algo" });
    }
}