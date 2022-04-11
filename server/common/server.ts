import express, {
  Express, Router,
} from 'express';
import actuator from 'express-actuator';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import cors from 'cors';

import cartRouter from '../domains/cart/controllers/router';
import productRouter from '../domains/product/controllers/router';

export default class ExpressServer {
  private app: Express;

  private readonly root: string;

  private readonly port: string;

  private routes: Array<{ path: string, domain:string, router: Router }> = [];

  constructor() {
    this.app = express();
    this.root = path.normalize(`${__dirname}/../..`);
    this.app.set('appPath', `${this.root}client`);

    this.port = process.env.PORT || '3000';

    this.routes.push(
      { domain: 'cart', path: '/api/v1/cart', router: cartRouter },
      { domain: 'product', path: '/api/v1/product', router: productRouter },
    );

    this.middlewares();

    this.buildRoutes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lecture and parse of body
    this.app.use(express.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));

    this.app.use(
      express.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      }),
    );

    this.app.use(express.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    this.app.use(cookieParser(process.env.SESSION_SECRET));
    this.app.use(actuator());
    this.app.use(express.static(`${this.root}/public`));
    this.app.use(morgan(`${process.env.MORGAN_FORMAT}`));
  }

  buildRoutes() {
    this.routes.forEach(({ path, router }) => this.app.use(path, router));
  }

  listen() {
    this.app.listen(this.port, () => console.log('[+] Server run in port ', this.port));
  }
}
