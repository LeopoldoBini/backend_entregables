export default class LoginController {
    constructor() {
    }
    async loginForm(req, res) {
        try {
            res.status(200).render("login");
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    }
    
    async loginController (req, res) {
        try {
          
            res.redirect("/");
            //status(200).render("main", { nameLoged : nombre ,productos });
            
        } catch (error) {
            res.status(500).json({ message: "Error populating products" });
        }
        
    }
    async failLogin(req, res) {
        try {
            res.status(200).render("login-error", { message: "Usuario o contraseña incorrectos" });
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    }  



    async signupForm(req, res) {
        try {
            res.status(200).render("signup");
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    }
    async signupController (req, res) {
        try {
            res.status(200).render("login");
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    }
    async failSingup(req, res) {
        try {
            res.status(200).render("signup-error");
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }   
    }

    async logout(req, res) {
        try {
            req.logout();
            res.redirect("/login");
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }   
    }

}


