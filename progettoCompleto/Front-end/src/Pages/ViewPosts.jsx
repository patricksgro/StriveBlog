import { useEffect, useState } from "react"
import { getPostByParam } from "../../data/post"
import { Col, Container, Row } from "react-bootstrap"
import SinglePost from "../components/SinglePost"

export function ViewPosts() {

    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState()

    useEffect(() => {
        getPost()
    }, [search])

    const getPost = async () => {
        const results = await getPostByParam(search)
        setPosts(results.data)
    }

    return (
        <Container >
            <Row style={{
                minHeight: "100vh",
                margin: 0,
                background: "linear-gradient(to bottom, #E0E0E0 0%, #F5F5F5 50%, #FFFFFF 100%)"
            }}>
                <div>
                    <input
                        type="text"
                        placeholder="Cerca post.."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
                {
                    posts && <>
                        {
                            posts.map(post => (
                                <Col key={post._id}>
                                    <SinglePost
                                        post={post}
                                        withLinks={false} />
                                </Col>
                            ))
                        }
                    </>
                }
            </Row>
        </Container>
    )
}