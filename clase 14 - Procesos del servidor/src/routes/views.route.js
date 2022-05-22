import express from "express";
import passport from "../utils/passport.util.js";
import ViewsControllers from "../controllers/views.controllers.js";
import LoginController from "../controllers/login.controller.js";
import auth from "../middleware/auth.middleware.js";

export default class ViewsRoutes extends express.Router {
  constructor() {
    super();
    this.auth = auth;
    this.viewsControllers = new ViewsControllers();
    this.loginController = new LoginController();

    this.get("/", auth, this.viewsControllers.mainPage);

    //login
    this.get("/login", this.loginController.loginForm);
    this.post(
      "/login",
      passport.authenticate("login", { failureRedirect: "/failLogin" }),
      this.loginController.loginController
    );
    this.get("/failLogin", this.loginController.failLogin);
    
    

    //signup
    this.get("/signup", this.loginController.signupForm);
    this.post(
      "/signup",
      passport.authenticate("signup", { failureRedirect: "/failSignup" }),
      this.loginController.signupController
      );
    this.get("failSignup", this.loginController.failSingup);
      
    this.get("/logout", this.loginController.logout);
  }
}
