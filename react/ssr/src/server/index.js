import express from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../shared/app';
import React from 'react';


const app = express();

app.use(express.static('public'));

app.use('/', (req, res) => {
  res.send(`<html>
    <head>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css"
        rel="stylesheet"
      />
      <script src="/index.bundle.js" defer></script>
    </head>
    <body>
      <div id="app">${renderToStaticMarkup(<App />)}</div>
    </body>
  </html>`);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
