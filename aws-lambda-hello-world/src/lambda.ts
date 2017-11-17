import { createServer, proxy } from 'aws-serverless-express';
import { app } from './App';

const server = createServer(app);

export const handler = (event, context, callback) =>
  proxy(server, event, context);
