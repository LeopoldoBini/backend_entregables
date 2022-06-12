import {  getProducts, productCreator, getProductById, productsUpdater  , productsDeactivetor} from "../functions/products/index.js";
import logger from '../functions/logger.js';

export const productsGetter = async (req, res ) => {
    try {
        const id = req.params?.id;
        if (id) {
            const producto = await getProductById(id);
            producto
                ? res.status(200).json(producto)
                : res.status(404).json({ mensaje: "No se encontró el producto" });
            return;
        }
        const productos = await getProducts();
        console.log(productos)
        res.status(200).json(productos);
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }
};

export const addProduct = async (req, res) => {
    try {
        const producto = req.body;
        console.log(producto, "del body")
        const id = await productCreator(producto);
        res.status(201).json({ mensaje: "Producto creado", id });
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = req.body;
        res.status(200).json(productsUpdater(id, producto));
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        res.status(200).json(productsDeactivetor(id));
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }
}


