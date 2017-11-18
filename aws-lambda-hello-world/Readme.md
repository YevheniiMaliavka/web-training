# AWS JavaScript Lambda

> This is just a simple guide about how to create a basic Node.js Lambda Deployment Package on the base of the existing Express.js App in TypeScript explained step by step. It's a very basic project and is created only for learning purposes. 

# Intro
We are going to do the following:
* Firstly, we will create a simple Node.js Express Application with one route.
* Then, we will use the [aws-serverless-express](https://github.com/awslabs/aws-serverless-express) to adjust our app to the AWS Lambda, create a Deployment Zip Package that is ready to be deployed to AWS Lambda.
* Finally, we will make our App available by creating a Lambda (uploading our package) and setting up AWS API Gateway.

## Prerequisites
* Make sure you have [NPM](https://www.npmjs.com/) and [Node.js](https://nodejs.org/en/) installed.
* You know what is a [Express Application](https://expressjs.com/).
* You have a basic idea of what [AWS Lambda](https://aws.amazon.com/lambda/) and [AWS API Gateway](https://aws.amazon.com/api-gateway/) are.
* You have an active [AWS Account](https://aws.amazon.com/free/) that allows you creating Lambdas and API Gateways. 

## Step 1: Create an Express App
### 1. Create project structure:
```sh
    $ mkdir aws-lambda-hello-world && cd aws-lambda-hello-world
    $ npm init -y
    $ mkdir src && touch .gitignore tsconfig.json src/App.js src/index.js
```

### 2. Configure project:
Make sure your **.gitignore** contains:
``` 
dist
node_modules
*.zip
```

**tsconfig.json** contains basic options for TypeScript Compiler:
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "dist"
  },
  "exclude": ["node_modules"]
}
```

Update the `package.json` `scripts` property to contain the following commands:
```json
"build": "tsc", // transpiles TypeScript into JavaScript
"start": "npm run build && node dist/index.js", // start the app locally
"dev": "nodemon -e ts --exec npm run build", // restarts app on the code change
```

### 3. Install necessary dependencies
```sh
npm install --save express
npm install --save-dev @types/express nodemon typescript
```

### 3.  Implement app
`App.ts` contains the express application class, where our root route is defined, and exports an instance of the application.
```javascript
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
      res.json('Hello, World! This is Express.js App!');
    });
    this.express.use('/', router);
  }
}

export const app = new App().express;
```

`index.ts` imports the app and starts it listening to `localhost:8080`:
```javascript
import { app } from './App';

const port = process.env.PORT || '8080';

app.listen(port, () => {
  console.log(`Server runs at http://localhost:${port}...`);
});

```

### 4. Build
Simply run `npm start`. Open [localhost:8080](http://localhost:8080) and you should see `Hello, World! This is Express.js App!`.

If you want to extend the application and continue developing locally, you can run `npm dev` which would reload your application every time you change your code.

The transpiled from TypeScript JavaScript code can be found in the `dist/` directory.

So far, we've got our simple Express App that can be developed locally and is ready to be deployed to AWS Lambda.

## Adopt our Express Application to AWS Lambda

### 1. Install aws-serverless-express
We will install [aws-serverless-express](https://github.com/awslabs/aws-serverless-express) that lets running your Node.js Express application on top of AWS Lambda.
```sh
npm install --save aws-serverless-express
npm install --save-dev @types/aws-serverless-express
```
### 2. Adopt Express App
We'll create the `lambda.ts`file in the `src` directory, which imports created earlier application from './App.js'. We create a server that uses our app and proxy it with `aws-serverless-express` functions.
The `handler` function is a function that will handle our lambda events, particulary the HTTP GET.

```javascript
import { createServer, proxy } from 'aws-serverless-express';
import { app } from './App';

const server = createServer(app);

export const handler = (event, context, callback) =>
  proxy(server, event, context);

```

### 3. Create a Zip Deployment Package
We'll add a new command to our `scripts` property in `package.json`.

```sh
"package":"npm run build && zip -q -r lambda-package.zip node_modules/ dist/lambda.js dist/App.js"
```

This command will build the project and make a zip out of the `node_modules/`, `dist/lambda.js` and `dist/App.js`.
> Note: we don't need `index.js` as this just starts a local server using our Express App and is only for the local development.

Now, just enter `npm run package` to the terminal which would generate a `lambda-package.zip` in the project root ready to be deployed.

## Deploy Lambda Package
> There are numerious tools for automating deployment of the labmda package, however in this guide we'll make a deployment manually to get the basic idea of how it goes with the Web GUI.


## Outro
That's it. We've got our JavaScript Lambda running on the AWS.

If you've found some mistakes, got some ideas or suggestions on how to improve this simple guide, you are very welcome to make a PR or create an issue.

