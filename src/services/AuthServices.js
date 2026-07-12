import axios from "axios";


class AuthServices{
    async signIn(data){
        const res =  await axios.request({
        method: 'POST',
        url: `${import.meta.env.VITE_API_URL}/users/signin`,
        data,
      });

      return res
    }

    async signUp(data){
        const res = await axios.request({
        method: 'POST',
        url:`${import.meta.env.VITE_API_URL}/users/signup`,
        data,
      });

      return res
    }
}


export default new AuthServices()