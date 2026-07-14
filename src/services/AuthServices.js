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

    async getLoggedUserData(){
      console.log(this.token)
      const {data} = await axios.request({
        method:'GET',
        url:`${import.meta.env.VITE_API_URL}/users/profile-data`,
        headers: {
          Token:localStorage.getItem('userToken'),
        },
      })

      return data
    }
}


export default new AuthServices()