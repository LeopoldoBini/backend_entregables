import { generateProducts } from "../utils/generateProducts.util.js";

export default class ViewsControllers {
    constructor() {
        this.generateProducts = generateProducts;
    }

    async mainPage (req, res) {
        try {
            const productos = generateProducts(5);
            const nombre = req.session.nombre;
            console.log(req.session)
            res.status(200).render("main", {  productos , nameLoged : nombre});
            console.log (nombre , "del view controller main page")
            
        } catch (error) {
            res.status(500).json({ message: "Error en el VC" });
        }
      
      }

}


