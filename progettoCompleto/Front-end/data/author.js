import axios from "./axios.js"


export async function editAuthor(idAuthor, dati) {
    try {
        const response = await axios.put(`/authors/${idAuthor}`, dati)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function updateAvatar(idAuthor, avatarFile) {
    try {
        const formData = new FormData()
        formData.append("avatar", avatarFile)

        const response = await axios.patch(`/authors/${idAuthor}/avatar`, formData)
        return response.data
    } catch (err) {
        console.error("Errore in updateAvatar:", err)
        throw err
    }
}

export async function deleteAuthor(id) {
    try {
        const response = await axios.delete(`/authors/${id}`)
        response.data
    } catch (err) {
        console.log(err)
    }
}