import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'

export function LoginRegister() {

    const { login } = useAuthContext()

    const [showRegister, setShowRegister] = useState(false)
    // const navigate = useNavigate()

    const googleLogin = () => {
        window.location.href = import.meta.env.VITE_BASEURL + import.meta.env.VITE_GOOGLE_PATH
    }

    const [searchParams] = useSearchParams()


    useEffect(() => {
        const token = searchParams.get('jwt')
        if (token) {
            login(token)
        }
    }, [searchParams])

    const [datiForm, setDatiForm] = useState({
        nome: '',
        cognome: '',
        dataDiNascita: '',
        readTime: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setDatiForm({
            ...datiForm,
            [e.target.name]: e.target.value
        })
    }

    //register locale
    const handleRegister = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: datiForm.nome,
                    cognome: datiForm.cognome,
                    email: datiForm.email,
                    password: datiForm.password,
                    dataDiNascita: datiForm.dataDiNascita
                })
            })

            const data = await res.json()
            login(data.jwt)

            if (!res.ok) {
                return
            }
        } catch (err) {
            console.log(err)
        }
    }

    //login locale
    const localLogin = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: datiForm.email,
                    password: datiForm.password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message); // mostra eventuali errori
                return;
            }

            login(data.jwt)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <>
            <Container className="my-5">
                <Row>
                    <Col className="align-items-center d-flex">
                        <Card style={{ width: '27rem' }}>
                            <Card.Body>
                                <Card.Title className="fs-2 text-center">Welcome</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text-center">Sign in to your account</Card.Subtitle>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        value={datiForm.email}
                                        type="email"
                                        placeholder="name@example.com"
                                        onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name='password'
                                        value={datiForm.password}
                                        type="password"
                                        onChange={handleChange} />
                                </Form.Group>

                                <Card.Link href="#">Forgot password</Card.Link>
                                <Card.Link onClick={() => setShowRegister(!showRegister)}>Sign Up</Card.Link>
                                <Card.Text className="my-3">
                                    <Button onClick={localLogin}>
                                        Login
                                    </Button>
                                </Card.Text>
                                <Card.Text className="my-3">
                                    <Button onClick={googleLogin}>
                                        Login with Google
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        {
                            showRegister &&
                            <Card style={{ width: '35rem' }}>
                                <Card.Body>
                                    <Card.Title className="fs-2 text-center">Create account</Card.Title>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            name="nome"
                                            onChange={handleChange}
                                            value={datiForm.nome}
                                            type="text" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Cognome</Form.Label>
                                        <Form.Control
                                            name="cognome"
                                            onChange={handleChange}
                                            value={datiForm.cognome}
                                            type="text" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Data di nascita</Form.Label>
                                        <Form.Control
                                            name="dataDiNascita"
                                            onChange={handleChange}
                                            value={datiForm.dataDiNascita}
                                            type="date" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            onChange={handleChange}
                                            value={datiForm.email}
                                            type="email"
                                            placeholder="name@example.com" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            name="password"
                                            onChange={handleChange}
                                            value={datiForm.password}
                                            type="password" />
                                    </Form.Group>

                                    <Card.Text className="my-3">
                                        <Button onClick={handleRegister}>
                                            Create
                                        </Button>
                                    </Card.Text>

                                    <hr />

                                    <Card.Subtitle className="mb-2 text-muted text-center">Or create using social media</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}