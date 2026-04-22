import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const blankForm = {
  title: '',
  author: '',
  monthRead: '',
  dateRead: '',
  rating: '',
  questions: '',
  comments: '',
}

function AddBookForm({ onAddBook }) {
  const [formData, setFormData] = useState(blankForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title.trim() || !formData.author.trim()) {
      return
    }

    onAddBook({
      ...formData,
      rating: Number(formData.rating) || 0,
    })
    setFormData(blankForm)
  }

  return (
    <Card className="mb-4">
      <Card.Header>Add a Completed Club Book</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="newBookTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  name="title"
                  value={formData.title}
                  placeholder="Book title"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="newBookAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  required
                  name="author"
                  value={formData.author}
                  placeholder="Author"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="newBookMonth">
                <Form.Label>Month Read</Form.Label>
                <Form.Control
                  name="monthRead"
                  value={formData.monthRead}
                  placeholder="May 2026"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="newBookDate">
                <Form.Label>Date Finished</Form.Label>
                <Form.Control name="dateRead" type="date" value={formData.dateRead} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="newBookRating">
                <Form.Label>Group Rating (0-5)</Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  step={0.1}
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group controlId="newBookQuestions">
                <Form.Label>Discussion Questions</Form.Label>
                <Form.Control
                  name="questions"
                  value={formData.questions}
                  placeholder="Main discussion prompt"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="newBookComments">
                <Form.Label>Member Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="comments"
                  value={formData.comments}
                  placeholder="Optional summary or comments"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button type="submit" variant="primary">
                Add to Archive
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddBookForm