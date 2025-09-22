import { useState } from "react"
import { createPost, updateCover } from "../../data/post"
import PostForm from "../components/PostForm"


function AddPost() {

    const [cover, setCover] = useState()

    const [datiForm, setDatiForm] = useState({
        titolo: '',
        descrizione: '',
        categoria: '',
        readTime: {
            value: '',
            unit: ''
        }
    })

    const handleChange = (e) => {
        if (e.target.name === 'unit' || e.target.name === 'value') {
            setDatiForm({
                ...datiForm,
                readTime: {
                    ...datiForm.readTime,
                    [e.target.name]: e.target.value
                }
            })
        } else {
            setDatiForm({
                ...datiForm,
                [e.target.name]: e.target.value
            })
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await createPost(datiForm)
        console.log(result)


        if (cover) {
            const postConCover = await updateCover(result._id, cover)
            console.log("Post aggiornato con cover:", postConCover)
        }
    }

    //aggiunga immagine COVER
    const addCover = (e) => {
        setCover(e.target.files[0])
    }

    return (
        <PostForm
            datiForm={datiForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            addCover={addCover}
            isEdit={false} />
    )
}

export default AddPost