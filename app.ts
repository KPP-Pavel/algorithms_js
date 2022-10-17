import express from 'express';
import { Routes } from 'express';

const routes = Routes();

class App {
    server = new express();
    constructor() {
        this.middlewares();
    }
    middlewares = () => {
        this.server.use(express.json());
    };
    poutes = () => {
        this.server.use(routes);
    };
}

export const app = new App();
