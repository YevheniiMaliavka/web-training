import { app } from './App';

const port = process.env.PORT || '8080';

app.listen(port, () => {
  console.log(`Server runs at http://localhost:${port}...`);
});
