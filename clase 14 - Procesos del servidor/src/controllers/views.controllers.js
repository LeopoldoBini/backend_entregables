import { generateProducts } from "../utils/generateProducts.util.js";

export default class ViewsControllers {
    constructor() {
        this.generateProducts = generateProducts;
    }

    async mainPage (req, res) {
        try {
            const user = req.user;
            const productos = generateProducts(5);
            const nombre = user.firstName;
            console.log(user , "del mainPagecontroller");
            res.status(200).render("main", {  productos , nameLoged : nombre});
        
            
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
      }

}


