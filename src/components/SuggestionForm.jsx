import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const emptySuggestion = {
  title: '',
  author: '',
  proposer: '',
  month: '',
}

function SuggestionForm({ onAddSuggestion }) {
  const [formData, setFormData] = useState(emptySuggestion)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title.trim() || !formData.proposer.trim() || !formData.month.trim()) {
      return
    }

    onAddSuggestion(formData)
    setFormData(emptySuggestion)
  }

  return (
    <Card className="mb-4">
      <Card.Header>Submit a Monthly Proposal</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="proposalTitle">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  required
                  name="title"
                  value={formData.title}
                  placeholder="Suggested title"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="proposalAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  name="author"
                  value={formData.author}
                  placeholder="Author"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="proposalMember">
                <Form.Label>Proposed By</Form.Label>
                <Form.Control
                  required
                  name="proposer"
                  value={formData.proposer}
                  placeholder="Member name"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="proposalMonth">
                <Form.Label>Voting Month</Form.Label>
                <Form.Control
                  required
                  name="month"
                  value={formData.month}
                  placeholder="May 2026"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button type="submit">Add Suggestion</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SuggestionForm
