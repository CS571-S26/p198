import { Badge, Button, Card } from 'react-bootstrap'

function SuggestionCard({ suggestion, onVote, onMoveToFuture, onMoveToCurrent, hasCurrentUserVote }) {
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
        {suggestion.coverUrl ? (
          <img
            src={suggestion.coverUrl}
            alt={`Book cover for ${suggestion.title}`}
            className="mb-3 rounded"
            style={{ width: '96px', height: '140px', objectFit: 'cover' }}
          />
        ) : (
          <div
            className="mb-3 rounded border d-inline-flex align-items-center justify-content-center text-muted"
            style={{ width: '96px', height: '140px', fontSize: '0.8rem' }}
            aria-label={`No cover available for ${suggestion.title}`}
          >
            No Cover
          </div>
        )}
        <p className="mb-3">Proposed by {suggestion.proposer}</p>
        {suggestion.status === 'suggested' ? (
          <div className="d-flex gap-2">
            <Button size="sm" onClick={() => onVote(suggestion.id)}>
              {hasCurrentUserVote ? 'Your Vote' : 'Vote'}
            </Button>
            <Button size="sm" variant="outline-secondary" onClick={() => onMoveToFuture(suggestion.id)}>
              Move to Future Reads
            </Button>
          </div>
        ) : (
          <div className="d-flex gap-2 align-items-center">
            <small className="text-muted">Saved for a future month.</small>
            <Button size="sm" variant="outline-primary" onClick={() => onMoveToCurrent(suggestion.id)}>
              Return to Current Ballot
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default SuggestionCard
