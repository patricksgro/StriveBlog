import axios from './axios.js'

export async function getAll() {
    try {
        const response = await axios.get('/posts')
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function getPostByParam(search) {
    try {
        const response = await axios.get('/posts', {
            params: { search }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function getSinglePost(id) {
    try {
        const response = await axios.get(`/posts/${id}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function createPost(newPost) {
    try {
        const response = await axios.post('/posts', newPost);
        return response.data
    } catch (err) {
        //rivelare meglio l'errore
        console.error("Errore createPost:", err.response?.data || err.message)
        throw err
    }
}

export async function editPost(idPost, dati) {
    try {
        const response = await axios.put(`/posts/${idPost}`, dati)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function updateCover(idPost, coverFile) {
    try {
        const formData = new FormData()
        formData.append("cover", coverFile)

        const response = await axios.patch(`/posts/${idPost}/cover`, formData)
        return response.data
    } catch (err) {
        console.error("Errore in updateCover:", err)
        throw err
    }
}


export async function deletePost(id) {
    try {
        const response = await axios.delete(`/posts/${id}`)
        response.data
    } catch (err) {
        console.log(err)
    }
}
