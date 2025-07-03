import express from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../controller/productcontroller';
import { verifyToken } from '../controller/authcontroller';

const productRoutes = express.Router();

productRoutes.post('/', verifyToken, addProduct);
productRoutes.get('/', verifyToken, getProducts);
productRoutes.put('/:id', verifyToken, updateProduct);
productRoutes.delete('/:id', verifyToken, deleteProduct);

export default productRoutes;
