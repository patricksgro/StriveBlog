import { Card, Modal, Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { createComment, deleteComment } from "../../data/comment";


function SinglePost({ post, withLinks }) {

    const { id } = useParams()

    const [showModal, setShowModal] = useState(false);
    const [showFormComment, setShowFormComment] = useState(false)

    const handleOpen = () => setShowModal(true)
    const handleClose = () => setShowModal(false)


    //questo è quello che mandiamo al back-end, se il back-end si aspetta text non possiamo mandare altro, errore 400
    const [datiForm, setDatiForm] = useState({
        text: ''
    })

    const handleChange = (e) => {
        setDatiForm({
            ...datiForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await createComment(id, datiForm)
        console.log(result)
    }


    //rimozione commento
    const removeComment = async (commentID) => {
        await deleteComment(id, commentID)
    }

    return (
        <>
            <Card style={{ width: '22rem' }} className="my-4">
                <Card.Img variant="top" src={post.cover} />
                <Card.Body>
                    <Card.Title className="fw-bold fs-4 text-center">{post.titolo}</Card.Title>
                    <Card.Text className="text-center">
                        {post.descrizione.slice(0, 200)}
                    </Card.Text>
                    <hr />
                </Card.Body>
                {
                    !withLinks ? <Card.Body>
                        <Card.Link to={`/posts/${post._id}`} as={Link}>Mostra dettagli</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                        <Card.Link href="#">Profilo autore</Card.Link>
                    </Card.Body>
                        :
                        <Card.Link onClick={handleOpen}>Visualizza Commenti</Card.Link>
                }
            </Card>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Commenti</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        post.comments.length === 0 ? 'Nessun commento per questo post' :
                            post.comments.map(comment => (
                                <p key={comment._id}>
                                    {comment.autore.nome}: {comment.text}
                                    <button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => removeComment(comment._id)}>🗑️</button>
                                    <button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => updateComment(comment._id)}>✏️</button>
                                </p>
                            ))
                    }
                    <hr />
                    {
                        showFormComment &&
                        <>
                            <Form.Group className="mb-3" >
                                <Form.Control
                                    required
                                    type="text"
                                    name='text'
                                    onChange={handleChange} />
                            </Form.Group>
                            <Button variant="secondary" className="mx-2" onClick={handleSubmit}>Pubblica</Button>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowFormComment(!showFormComment)}>Commenta</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default SinglePost