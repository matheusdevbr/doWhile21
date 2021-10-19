// Receber o code(string)
//Recuperar o acess_token no github
//Recuperando informações do usuario logado
//Veruficar se o usuario existe no DB
// se sim, gerar um token. Se não, add no DB e gerar um token pra ele
//Retornar o token com as infos do usuario
import axios from 'axios';
import prismaClient from '../prisma';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) { 
    const url = "http://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url,null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    })

    const response = await axios.get<IUserResponse>("http://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })
    
    const { name, id, login, avatar_url } = response.data

    let user = await prismaClient.user.findFirst({ 
      where: {
        github_id: id,
      }
    })

    if(!user) {
      user = await prismaClient.user.create({
        data: {
          name,
          login,
          avatar_url,
          github_id: id
        }
      })
    }
    return response.data;
  }
}

export { AuthenticateUserService };