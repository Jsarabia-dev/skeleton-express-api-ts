import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import userRouter from '../routes/usuarios';

export default class ExpressServer {

    app: Express;
    port: string;
    routes: Array<{ path: string, domain:string, router: Router }> = [];
    


    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.routes.push(
            { path: '/user', domain: 'user', router: userRouter },
        );

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.buildRoutes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    buildRoutes() { 
        this.routes.forEach( ({ path, router }) => this.app.use( path, router ));
    }
        
    listen() {
        this.app.listen( this.port, () => console.log('Servidor corriendo en puerto', this.port ) );
    }

}

