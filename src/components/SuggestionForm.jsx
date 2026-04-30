import { useMemo, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { buildMonthYearOptions } from '../utils/monthOptions'

const emptySuggestion = {
  title: '',
  author: '',
  month: '',
}

function SuggestionForm({ onAddSuggestion, currentUser, monthOptions, defaultMonth }) {
  const [formData, setFormData] = useState(emptySuggestion)
  const votingMonthOptions = useMemo(
    () => monthOptions ?? buildMonthYearOptions(24),
    [monthOptions],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const monthValue = formData.month || defaultMonth || votingMonthOptions[0] || ''
    if (!formData.title.trim() || !monthValue) {
      return
    }

    onAddSuggestion({
      ...formData,
      month: monthValue,
    })
    setFormData(emptySuggestion)
  }

  return (
    <Card className="mb-4">
      <Card.Header>Submit a Monthly Proposal</Card.Header>
      <Card.Body>
        <p className="text-muted mb-3">Posting as @{currentUser}</p>
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
              <Form.Group controlId="proposalMonth">
                <Form.Label>Voting Month</Form.Label>
                <Form.Select
                  aria-label="Select voting month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                >
                  <option value="">Select month</option>
                  {votingMonthOptions.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Form.Select>
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
