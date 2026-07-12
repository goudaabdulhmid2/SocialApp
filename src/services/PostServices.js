import axios from "axios";



class PostServices{
    async creatPost(formData){
        const res = await axios.request({
        method: 'POST',
        url: `${import.meta.env.VITE_API_URL}/posts`,
        data: formData,
        headers: {
          Token: localStorage.getItem('userToken'),
        },
      });

      return res
    }

    async getPosts(){
        const {data} = await axios.request({
                method:'GET',
                url:`${import.meta.env.VITE_API_URL}/posts`,
                headers:{
                    Token:localStorage.getItem("userToken")
                },
                params:{
                    limit:20,
                    sort:"-createdAt"
                }

            
            })
        return data
    }
}


export default new PostServices()