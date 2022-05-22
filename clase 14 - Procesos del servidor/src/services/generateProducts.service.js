import { generateProducts } from "../utils/generateProducts.util.js";

export default class ProductService {
    constructor() {
        this.products = [];
    }

    async createProducts ( n = 5) {
        this.products = await generateProducts(n);
    }

}