import { useEffect, useState } from "react"
import { deletePost, editPost, getSinglePost, updateCover } from "../../data/post"
import { useParams } from "react-router-dom"
import SinglePost from "../components/SinglePost"
import { Col, Container, Row } from "react-bootstrap"
import PostForm from "../components/PostForm"

function PostDetail() {

    //id per chiamata axios
    const { id } = useParams()

    const [trueForm, setTrueForm] = useState(false)
    //stato per cover
    const [cover, setCover] = useState()

    //stato con valore campi input
    const [datiForm, setDatiForm] = useState({
        titolo: '',
        descrizione: '',
        categoria: '',
        readTime: {
            value: '',
            unit: ''
        }
    })

    //stato per dati axios ricevuti
    const [singlePost, setSinglePost] = useState()

    //axios per singolo post
    useEffect(() => {
        getPost()
    }, [id])


    async function getPost() {
        const resultsPost = await getSinglePost(id)
        setSinglePost(resultsPost)
    }

    useEffect(() => {
        //condizione perche al primo render ancora è undefined, appena i dati arrivano settiamo datiForm con solo quello che ci occorre
        if (singlePost) {
            setDatiForm({
                titolo: singlePost.titolo,
                categoria: singlePost.categoria,
                readTime: singlePost.readTime,
                descrizione: singlePost.descrizione
            })
        }

    }, [singlePost])

    //dati presi da input al cambio dell onchange
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

    //set stato cover con dati presi dal input al change
    const addCover = (e) => {
        setCover(e.target.files[0])
    }


    //al click della modifica, axios passiamo id del post e contenuto per update
    const edit = async (e) => {
        e.preventDefault()
        const result = await editPost(id, datiForm)
        let finalResult = result
        if (cover) {
            const updateCoverAlso = await updateCover(id, cover)
            finalResult = updateCoverAlso
        }
        setSinglePost(finalResult)
        setTrueForm(false)
    }

    //eliminazione post
    const remove = async () => {
        await deletePost(id)
    }



    return (
        <Container>
            <Row>
                <Col>
                    {
                        singlePost &&
                        <SinglePost
                            post={singlePost}
                            withLinks />

                    }
                    <div className="mt-4">
                        <div>
                            <button onClick={() => setTrueForm(!trueForm)}>
                                <h3>update</h3>
                            </button>
                        </div>
                        <div>
                            <button onClick={remove}>
                                <h3>Delete</h3>
                            </button>
                        </div>
                    </div>
                </Col>

                <Col>
                    {
                        trueForm &&
                        <PostForm
                            datiForm={datiForm}
                            handleChange={handleChange}
                            addCover={addCover}
                            edit={edit}
                            isEdit={true} />
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default PostDetail












































{/* <Form
                            onSubmit={edit}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Immagine</Form.Label>
                                <Form.Control
                                    type="file"
                                    name='cover'
                                    onChange={addCover}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>autore</Form.Label>
                                <Form.Control
                                    required
                                    name='autore'
                                    value={datiForm.autore}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>titolo</Form.Label>
                                <Form.Control
                                    required
                                    name='titolo'
                                    value={datiForm.titolo}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>descrizione</Form.Label>
                                <Form.Control
                                    required
                                    name='descrizione'
                                    value={datiForm.descrizione}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>categoria</Form.Label>
                                <Form.Control
                                    required
                                    name='categoria'
                                    value={datiForm.categoria}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>tempo</Form.Label>
                                <Form.Control
                                    required
                                    type='number'
                                    name='value'
                                    value={datiForm.readTime.value}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>unità</Form.Label>
                                <Form.Control
                                    required
                                    name='unit'
                                    value={datiForm.readTime.unit}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button type='submit'>Modifica post</Button>
                        </Form> */}