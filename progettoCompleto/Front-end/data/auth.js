import axios from './axios.js'

export async function getMe() {
    try {
        const response = await axios.get('/authors/me')
        return response.data
    } catch (err) {
        console.log(err)
    }
}