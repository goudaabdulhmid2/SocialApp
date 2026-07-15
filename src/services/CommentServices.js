import axios from "axios";



class CommentServices {
    token = localStorage.getItem('userToken');


    async getComments(postId, page, limit) {
        const { data } = await axios.request({
            method: 'GET',
            url: `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
            headers: {
                Token: this.token,
            },
            params: {
                page,
                limit,
            }


        })
        return data
    }

    async createComment(postId, formData ){
        const {data} = await axios.request({
            method:'POST',
            url: `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
            headers: {
                Token: this.token,
            },
            data:formData

        })

        return data;
    }




}


export default new CommentServices()