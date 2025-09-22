import { useEffect, useState } from "react"
import { getMe } from "../../data/auth"
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"
import SinglePost from "../components/SinglePost"
import { editAuthor, updateAvatar } from "../../data/author"
import { useAuthContext } from "../../context/authContext"

function UserProfile() {

    const { loggeedUser } = useAuthContext()

    const [trueForm, setTrueForm] = useState(false)
    const [avatar, setAvatar] = useState()

    const [datiForm, setDatiForm] = useState({
        nome: ''
    })

    //chiamo dati utente
    const [dataUser, setDataUser] = useState({})

    console.log(loggeedUser?._id)

    // per prendere i dati del nome
    const handleChange = (e) => {
        setDatiForm({
            ...datiForm,
            [e.target.name]: e.target.value
        })
    }

    const addAvatar = (e) => {
        setAvatar(e.target.files[0])
    }

    console.log(dataUser)

    const editData = async (e) => {
        e.preventDefault()
        const result = await editAuthor(loggeedUser?._id, datiForm)
        let finalResult = result
        if (avatar) {
            const updateAvatarAlso = await updateAvatar(loggeedUser?._id, avatar)
            finalResult = updateAvatarAlso
        }
        // setDataUser(finalResult)
        setTrueForm(false)
    }

    return (
        <Container fluid >
            <Row>

                <Col
                    lg={3}
                    className="py-5 d-flex flex-column align-items-center "
                    style={{ minHeight: "100vh" }} // assicura che la colonna abbia tutta l'altezza
                >
                    <div className="text-center">
                        <div>
                            <img
                                src={loggeedUser?.avatar}
                                alt="Image"
                                style={{ borderRadius: "50%", width: "132px", height: "132px" }}
                            />
                        </div>

                        <div>
                            <h1 className="mb-0">{loggeedUser?.nome}</h1>
                            <span className="text-secondary">{loggeedUser?.email}</span>
                        </div>

                        <div>
                            <h3>About</h3>
                            <h3>Services</h3>
                            <h3>Works</h3>
                            <h3>Blog</h3>
                            <h3>Contacts</h3>
                        </div>

                        <div className="d-flex justify-content-center gap-2">
                            <Image src="/public/github_logo_94lqwcmbt0ue_32.png" alt="github" />
                            <Image src="/public/instagram_jpp48aua8bc9_32.png" alt="instagram" />
                            <Image src="/public/twitter_2fqykdbdzeg3_32.png" alt="twitter" />
                        </div>

                        <Button className="my-4" onClick={() => setTrueForm(!trueForm)}>
                            Modifica profilo
                        </Button>

                        {loggeedUser?._id && trueForm && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Avatar</Form.Label>
                                    <Form.Control
                                        required
                                        type="file"
                                        name="avatar"
                                        onChange={addAvatar}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        required
                                        name="nome"
                                        value={datiForm.nome}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button onClick={editData}>Applica modifiche</Button>
                            </>
                        )}
                    </div>
                </Col>


                <Col lg={9} className="py-5" style={{
                    minHeight: "100vh",
                    margin: 0,
                    background: "linear-gradient(to bottom, #E0E0E0 0%, #F5F5F5 50%, #FFFFFF 100%)"
                }}>
                    <h1>
                        Tutti i tuoi post
                    </h1>
                    <div className="d-flex flex-wrap gap-3">

                        {loggeedUser?.posts && loggeedUser?.posts.map(post => (
                            <SinglePost
                                key={post._id}
                                post={post} />
                        ))}
                    </div>
                </Col>

            </Row>
        </Container>
    )
}

export default UserProfile