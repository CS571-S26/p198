import { useState } from 'react'
import { Badge, Button, Card, Form } from 'react-bootstrap'

function BookArchiveCard({ book, onSaveEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftComments, setDraftComments] = useState(book.comments ?? '')
  const [draftRating, setDraftRating] = useState(book.rating ?? 0)

  const saveChanges = () => {
    onSaveEdit(book.id, {
      comments: draftComments,
      rating: Number(draftRating) || 0,
    })
    setIsEditing(false)
  }

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <Card.Title className="mb-1">{book.title}</Card.Title>
            <Card.Subtitle className="text-muted">{book.author}</Card.Subtitle>
          </div>
          <Badge bg="secondary">{book.monthRead || 'No month set'}</Badge>
        </div>
        <p className="small mb-2">
          Finished: {book.dateRead || 'Not added'} | Group Rating: {Number(book.rating).toFixed(1)} / 5
        </p>
        <p className="mb-2">
          <strong>Discussion Prompt:</strong> {book.questions || 'No questions added yet.'}
        </p>
        {isEditing ? (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Update Rating</Form.Label>
              <Form.Control
                min={0}
                max={5}
                step={0.1}
                type="number"
                value={draftRating}
                onChange={(event) => setDraftRating(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Update Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={draftComments}
                onChange={(event) => setDraftComments(event.target.value)}
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button size="sm" onClick={saveChanges}>
                Save
              </Button>
              <Button size="sm" variant="outline-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-3">
              <strong>Comments:</strong> {book.comments || 'No comments added yet.'}
            </p>
            <Button size="sm" variant="outline-primary" onClick={() => setIsEditing(true)}>
              Edit Entry
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  )
}

export default BookArchiveCard
