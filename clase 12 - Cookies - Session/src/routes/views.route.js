import express from 'express';
import ViewsControllers from '../controllers/views.controllers.js';
import LoginController from '../controllers/login.controller.js';
import auth from '../middleware/auth.middleware.js';  


export default class ViewsRoutes extends express.Router {
  constructor() {
    super();
    this.auth = auth;
    this.viewsControllers = new ViewsControllers();
    this.loginController = new LoginController();
    
    this.get('/',auth,  this.viewsControllers.mainPage)
    this.get('/login', this.loginController.loginForm);
    this.post('/login', this.loginController.loginController)
    this.get('/logout', this.loginController.logout);
  }
}