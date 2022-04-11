import express from 'express';

import cartController from './controller';

const cartRouter = express
  .Router()
  .post('/', cartController.createCart)
  .get('/:id', cartController.getCart)
  .put('/:id', cartController.updateCart)
  .delete('/:id', cartController.deleteCart);

export default cartRouter;
