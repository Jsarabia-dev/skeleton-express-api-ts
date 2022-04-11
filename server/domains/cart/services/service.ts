import CartRepository from '../repository/CartRepository';
import Cart from '../dto/Cart';

class CartService {
  private repository: CartRepository;

  constructor() {
    this.repository = new CartRepository();
  }

  getCart() {}

  createCart(cart: Cart) {
    return this.repository.createCart(cart);
  }

  updateCart() {}

  deleteCart() {}
}

const cartService = new CartService();
export default cartService;
