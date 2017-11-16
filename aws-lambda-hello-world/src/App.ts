import * as express from 'express';

class App {
  express: express.Express;

  constructor() {
    this.express = express();
    this.initRoutes();
  }

  private initRoutes(): void {
    const router = express.Router();
    router.get('/', (req, res) => {
      res.json('Hello, World!');
    });
    this.express.use('/', router);
  }
}

export const app = new App().express;
