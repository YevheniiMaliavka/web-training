import { createServer, proxy } from 'aws-serverless-express';
import { app } from './app';

const server = createServer(app);

export const handler = (event, context, callback) =>
  proxy(server, event, context);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || '8080';
  app.listen(port, () => {
    console.log(`Server runs at http://localhost:${port}...`);
  });
}
