export default class LoginController {
    constructor() {
    }
    async loginForm(req, res) {
        try {
            res.status(200).render("login");
        } catch (error) {
            res.status(500).json({ message: "Error en el VC" });
        }
    }

    async loginController (req, res) {
        try {
            const nombre = req.body.nombre;
            req.session.nombre = nombre;
            req.session.login = true;
            res.redirect("/");
            //status(200).render("main", { nameLoged : nombre ,productos });
            
        } catch (error) {
            res.status(500).json({ message: "Error populating products" });
        }
    
      }
    async logout(req, res) {
        try {
            req.session.destroy();
            res.redirect("/login");
        } catch (error) {
            res.status(500).json({ message: "Error en el VC" });
        }   
    }

}


