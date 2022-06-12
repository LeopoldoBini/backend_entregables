import { cartCreator, cartCloser, cartDeleterById, cartGetterById, cartProductAdder, cartProductRemover } from '../functions/cart/index.js';
import logger from '../functions/logger.js';

export const createCart = async (req, res) => {
    try {
        const idClient = req.body.idClient;
        const cartCreatedId = await cartCreator(idClient);
        res.status(200).json({
            message: 'Cart created',
            cartCreatedId
        });
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }
}
export const closeCart = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const cartClosed = await cartCloser(idCart);
        res.status(200).json({
            message: 'Cart closed',
            cartClosed
        });
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }
}
export const deleteCartById = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const cartDeleted = await cartDeleterById(idCart);
        res.status(200).json({
            message: 'Cart deleted',
            cartDeleted
        });
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }
}
export const getProductListByCartId = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const cart = await cartGetterById(idCart);
        const productList = cart.productList;
        res.status(200).json({
            message: 'Cart found',
            productList
        });
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }
}
export const addProductOnCart = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const idProduct = req.body.idProduct;
        const quantity = req.body.quantity;
        const updatedProductList = await cartProductAdder(idCart, idProduct, quantity);
        res.status(200).json({
            message: 'Product added',
            updatedProductList
        });
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }
}
export const removeProductFromCart = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const idProduct = req.body.idProduct;
        const quantity = req.body.quantity;
        const updatedProductList = await cartProductRemover(idCart, idProduct, quantity);
        res.status(200).json({
            message: 'Product removed',
            updatedProductList
        });
    } catch (error) {
        const response = logger.eHandler(req, error)
        res.status(500).json(response)
    }

}