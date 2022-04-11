import { Request, Response } from 'express';

class ProductController {
  getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res
        .status(200)
        .json(`getProduct ${ id }`);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error get cart',
          error: error.message,
        });
    }
  }

  createProduct(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json('createProduct');
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error creating cart',
          error: error.message,
        });
    }
  }

  updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res
        .status(200)
        .json(`updateProduct ${id}`);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error updating cart',
          error: error.message,
        });
    }
  }

  deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res
        .status(200)
        .json(`deleteProduct ${id}`);
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

const productController = new ProductController();
export default productController;
