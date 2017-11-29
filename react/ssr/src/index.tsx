import * as express from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import { getView } from './components/page';

const app = express();

app.use('/', (req, res) => {
  res.send(getView());
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
