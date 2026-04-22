import { Badge, Button, Card } from 'react-bootstrap'

function SuggestionCard({ suggestion, onVote, onMoveToFuture }) {
  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <div>
            <Card.Title className="mb-1">{suggestion.title}</Card.Title>
            <Card.Subtitle className="text-muted">{suggestion.author || 'Unknown author'}</Card.Subtitle>
          </div>
          <Badge bg={suggestion.status === 'future' ? 'secondary' : 'primary'}>
            {suggestion.status === 'future' ? 'Future Read' : `${suggestion.votes} votes`}
          </Badge>
        </div>
        <p className="mb-3">Proposed by {suggestion.proposer}</p>
        {suggestion.status === 'suggested' ? (
          <div className="d-flex gap-2">
            <Button size="sm" onClick={() => onVote(suggestion.id)}>
              Vote
            </Button>
            <Button size="sm" variant="outline-secondary" onClick={() => onMoveToFuture(suggestion.id)}>
              Move to Future Reads
            </Button>
          </div>
        ) : (
          <small className="text-muted">Saved for a future month.</small>
        )}
      </Card.Body>
    </Card>
  )
}

export default SuggestionCard
