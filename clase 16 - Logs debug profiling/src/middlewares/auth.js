import logger from '../functions/logger.js';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log("autorizado: " , token === "autorizado")
  
    if (token === "autorizado") {
      next()
      
    } else {

       const e = new Error('Not authorized')
       const response = logger.eHandler(req, e)
       res.status(500).json(response)
    }
  } catch (error) {
    next(error)
  }
}
