import express from 'express';
import ViewsControllers from '../controllers/views.controllers.js';

export default class ViewsRoutes extends express.Router {
  constructor() {
    super();
    
    this.viewsControllers = new ViewsControllers();
    
    this.get('/', this.viewsControllers.mainPage);
  }
}