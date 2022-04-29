import ProductService from "../services/generateProducts.service.js";
import { generateProducts } from "../utils/generateProducts.util.js";

export default class ViewsControllers {
    constructor() {
        this.productService = new ProductService();
        this.generateProducts = generateProducts;
    }

    async mainPage (req, res) {
        try {
            const productos = generateProducts(5);
            res.status(200).render("main", { productos });
            
        } catch (error) {
            res.status(500).json({ message: "Error populating products" });
        }
      
      }

}


