import ProductService from "../services/generateProducts.service.js";

export default class ProductController {
    constructor() {
        this.productService = new ProductService();
        this.randomNumber = randomNumb;
    }

    async populateProducts(req, res) {
        try {
            const products = await this.productService.createProducts(5);
            res.status(200).json(products);
        } catch (err) {
            res.status(400).json({ message: "Error populating products" });
        }
    }

    

}
