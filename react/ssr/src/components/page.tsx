import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from './app';

const facts = ['I am 21 now', 'I am going 22 in 13 days', 'I like december'];

export function Page() {
  return (
    <html>
      <head>
        <link
          href="http://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <App facts={facts} />
        <script src="https://code.jquery.com/jquery-2.1.1.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js" />
      </body>
    </html>
  );
}

export function getView() {
  return renderToStaticMarkup(<Page />);
}
