import { Button, Form } from "react-bootstrap"

function PostForm({ datiForm, handleChange, addCover, isEdit, edit, handleSubmit }) {
    return (
        <Form onSubmit={(e) => {
            e.preventDefault(); isEdit ? edit(e) : handleSubmit(e)
        }}>
            <Form.Group className="mb-3" >
                <Form.Label>Immagine</Form.Label>
                <Form.Control
                    required={!isEdit}
                    type="file"
                    name='cover'
                    onChange={addCover} />
            </Form.Group>
            {/* autore levato */}
            <Form.Group className="mb-3" >
                <Form.Label>titolo</Form.Label>
                <Form.Control
                    required={!isEdit}
                    name='titolo'
                    value={datiForm.titolo}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>descrizione</Form.Label>
                <Form.Control
                    required={!isEdit}
                    name='descrizione'
                    value={datiForm.descrizione}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>categoria</Form.Label>
                <Form.Control
                    required={!isEdit}
                    name='categoria'
                    value={datiForm.categoria}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>tempo</Form.Label>
                <Form.Control
                    required={!isEdit}
                    type='number'
                    name='value'
                    value={datiForm.readTime.value}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>unità</Form.Label>
                <Form.Control
                    required={!isEdit}
                    name='unit'
                    value={datiForm.readTime.unit}
                    onChange={handleChange} />
            </Form.Group>
            <Button type='submit'>
                {
                    isEdit ? 'Modifica Post' : 'Crea Post'
                }
            </Button>
        </Form>
    )
}

export default PostForm