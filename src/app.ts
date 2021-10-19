//mural de depoimentos
import 'dotenv/config'; 
import express from 'express';
import { router } from './routes';

const app = express();
app.use(express.json());

app.use(router);

app.get("/github", (request, response) => {
  response.redirect(`http://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
}) //rota de login

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;
  
  return response.json(code);
}) //rota de callback

app.listen(4000, () => console.log('🚀 Server is Vraunelas on PORT 4000'));

