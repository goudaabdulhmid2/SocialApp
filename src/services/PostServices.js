import axios from "axios";



class PostServices{
    token = localStorage.getItem('userToken');

    async creatPost(formData){
        const res = await axios.request({
        method: 'POST',
        url: `${import.meta.env.VITE_API_URL}/posts`,
        data: formData,
        headers: {
          Token: this.token,
        },
      });

      return res
    }

    async getPosts(){
        const {data} = await axios.request({
                method:'GET',
                url:`${import.meta.env.VITE_API_URL}/posts`,
                headers:{
                    Token: this.token,
                },
                params:{
                    limit:20,
                    sort:"-createdAt"
                }

            
            })
        return data
    }


    async getPost(postId){
        const {data} = await axios.request({
            method:'GET',
            url:`${import.meta.env.VITE_API_URL}/posts/${postId}`,
            headers:{
                Token:this.token
            }

        })

        return data
    }

    async deletePost(postId){
       const {data} = await axios.request({
            method:"DELETE",
            url:`${import.meta.env.VITE_API_URL}/posts/${postId}`,
            headers:{
                Token:this.token
            }

        })

        return data
    }

    async savePost(postId){
       const {data} = await axios.request({
            method:"PUT",
            url:`${import.meta.env.VITE_API_URL}/posts/${postId}/bookmark`,
            headers:{
                Token:this.token
            }

        })

        return data
    }


}


export default new PostServices()