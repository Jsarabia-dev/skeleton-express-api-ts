import express from 'express';
import productController from './controller';

const productRouter = express
  .Router()
  .post('/', productController.createProduct)
  .get('/:id', productController.getProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct);

export default productRouter;
