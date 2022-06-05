
export const randomN = (req, res) => {
    try {
        const cant = req.query.cantidad || 100000000;
        computo.send(cant);
        computo.on("message", (ObjDesafio) => {
            res.status(200).json(ObjDesafio);
        });
    }
    catch (err) {
        res.status(400).json({ message: "Error por algo" });
    }
}