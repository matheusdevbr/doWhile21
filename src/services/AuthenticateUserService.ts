// Receber o code(string)
//Recuperar o acess_token no github
//Verufucar se o usuario eciste no DB
// se sim, gerar um token. Se não, add no DB e gera um token pra ele
//Retornar o token com as infos do usuario
import axios from 'axios';

interface IAccessTokenResponse {
  access_token: string;
}

class AuthenticateUserService {
  async execute(code: string) { 
    const url = "http://github.com/login/oauth/access_token";

    const response = await axios.post<IAccessTokenResponse>(url,null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    })

    return response.data;
  }
}

export { AuthenticateUserService };