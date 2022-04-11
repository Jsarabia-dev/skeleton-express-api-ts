import { Request, Response } from 'express';
import cartService from '../services/service';
import Cart from '../dto/Cart';

class CartController {
  getCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res
        .status(200)
        .json(`getCart ${ id }`);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error get cart',
          error: error.message,
        });
    }
  }

  async createCart(req: Request, res: Response) {
    try {
      const cartReq: Cart = req.body;

      console.log('################');
      console.log('[+] cartReq: ', JSON.stringify(cartReq, null, 2));
      console.log('################');

      const cart = await cartService.createCart(cartReq);

      res
        .status(200)
        .json(cart);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error creating cart',
          error: error.message,
        });
    }
  }

  updateCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res
        .status(200)
        .json(`updateCart ${id}`);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error updating cart',
          error: error.message,
        });
    }
  }

  deleteCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res
        .status(200)
        .json(`deleteCart ${id}`);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error deleting cart',
          error: error.message,
        });
    }
  }
}

const cartController = new CartController();
export default cartController;
