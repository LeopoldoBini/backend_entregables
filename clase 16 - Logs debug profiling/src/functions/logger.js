import winston from "winston";

const logger = {
    i: winston.createLogger({
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        transports: [
            new winston.transports.Console({ level: 'fatal' }),
        ]
    }),
    w: winston.createLogger({
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        transports: [
            new winston.transports.Console({ level: 'warn' }),
            new winston.transports.File({ filename: 'warn.log', level: 'fatal' }),
        ]
    }),
    e: winston.createLogger({
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        transports: [
            new winston.transports.Console({ level: 'error' }),
            new winston.transports.File({ filename: 'error.log', level: 'fatal' })
        ]
    }),
    eHandler(req, error) {
        try {
            const metodo = req.method
            const atUrl = req.url
            const errMsg = error.message
            const objres = { metodo, atUrl , errMsg }
            this.e.error( "ups" , objres)
            return objres
        }catch(err){
            return  err.message 
        }
    }
}

export default logger;