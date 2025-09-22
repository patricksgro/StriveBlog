import axios from "./axios.js"

export async function createComment(id, comment) {
    try {
        const response = await axios.post(`/posts/${id}/comments`, comment)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function deleteComment(id, commentID) {
    try {
        const response = await axios.delete(`/posts/${id}/comments/${commentID}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function editComment(id, commentID, comment) {
    try {
        const response = await axios.put(`/posts/${id}/comments/${commentID}`, comment)
        return response.data
    } catch (err) {
        console.log(err)
    }
}