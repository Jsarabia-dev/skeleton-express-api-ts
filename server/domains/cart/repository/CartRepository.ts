import mongoose from 'mongoose';

import cartModel from '../model/cartModel';
import Cart from '../dto/Cart';

export default class CartRepository {
  public async getCart(userId: string): Promise<any> {
    return cartModel.findOne({ userId });
  }

  public async createCart(cart: Cart): Promise<void> {
    const _id = new mongoose.Types.ObjectId();

    const newCart = Object.assign(cart, {
      _id,
    });

    const newDocument = await cartModel.create(newCart);

    return newDocument;
  }
}
