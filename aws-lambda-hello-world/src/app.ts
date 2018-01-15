import * as express from 'express';

const app = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Hello, World! This is Express.js App!');
});

app.use('/', router);

export { app };
