import express from 'express';
import ProductController from '../controllers/products.controller.js';

export class ProductsRoute extends express.Router {
  constructor() {
    super();
    
    this.productController = new ProductController();
    
    this.get('/popular', this.productController.populateProducts);
  }
}