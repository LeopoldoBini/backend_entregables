import dotenv from 'dotenv';
import { numCPUs } from '../../server.js';
dotenv.config();


export const info = async (req, res) => {
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
            8 : numCPUs,
        }
        console.log(info)
        res.status(200).render("info", info);
    }
    catch (err) {
        res.status(400).json({ message: "Error por algo" });
    }
}