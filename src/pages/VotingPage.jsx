import { useMemo } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import SuggestionCard from '../components/SuggestionCard'
import SuggestionForm from '../components/SuggestionForm'

function VotingPage({ suggestions, setSuggestions, currentVoteMonth, setCurrentVoteMonth, currentUser }) {
  const monthlySuggestions = useMemo(
    () =>
      suggestions.filter(
        (suggestion) =>
          suggestion.month === currentVoteMonth && suggestion.status === 'suggested',
      ),
    [suggestions, currentVoteMonth],
  )

  const futureReads = useMemo(
    () => suggestions.filter((suggestion) => suggestion.status === 'future'),
    [suggestions],
  )

  const winningSuggestion = useMemo(() => {
    if (monthlySuggestions.length === 0) {
      return null
    }
    return [...monthlySuggestions].sort((a, b) => b.votes - a.votes)[0]
  }, [monthlySuggestions])

  const addSuggestion = (suggestionDraft) => {
    setSuggestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...suggestionDraft,
        proposer: currentUser,
        votes: 0,
        status: 'suggested',
      },
    ])
  }

  const addVote = (suggestionId) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === suggestionId ? { ...suggestion, votes: suggestion.votes + 1 } : suggestion,
      ),
    )
  }

  const moveToFutureReads = (suggestionId) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === suggestionId ? { ...suggestion, status: 'future' } : suggestion,
      ),
    )
  }

  const finalizeMonth = () => {
    if (!winningSuggestion) {
      return
    }

    setSuggestions((prev) =>
      prev.map((suggestion) => {
        const isSameMonth = suggestion.month === currentVoteMonth
        const isNotWinner = suggestion.id !== winningSuggestion.id
        if (isSameMonth && suggestion.status === 'suggested' && isNotWinner) {
          return { ...suggestion, status: 'future' }
        }
        return suggestion
      }),
    )
  }

  return (
    <>
      <PageHeader
        title="Monthly Suggestions & Voting"
        subtitle="Members can submit proposals, vote, and preserve non-selected books for later."
      />
      <SuggestionForm onAddSuggestion={addSuggestion} currentUser={currentUser} />

      <Form.Group className="mb-3" controlId="votingMonth">
        <Form.Label>Active Voting Month</Form.Label>
        <Form.Control
          value={currentVoteMonth}
          placeholder="May 2026"
          onChange={(event) => setCurrentVoteMonth(event.target.value)}
        />
      </Form.Group>

      <Alert variant="info">
        {winningSuggestion
          ? `Current leader for ${currentVoteMonth}: ${winningSuggestion.title} (${winningSuggestion.votes} votes)`
          : `No active suggestions yet for ${currentVoteMonth}.`}
      </Alert>
      <Button className="mb-4" variant="success" onClick={finalizeMonth} disabled={!winningSuggestion}>
        Finalize Month and Move Remaining Books to Future Reads
      </Button>

      <h2 className="section-title">Current Ballot</h2>
      <Row className="g-3 mb-4">
        {monthlySuggestions.length > 0 ? (
          monthlySuggestions.map((suggestion) => (
            <Col key={suggestion.id} lg={6}>
              <SuggestionCard
                suggestion={suggestion}
                onVote={addVote}
                onMoveToFuture={moveToFutureReads}
              />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-muted">No books on this month&apos;s ballot yet.</p>
          </Col>
        )}
      </Row>

      <h2 className="section-title">Future Reads</h2>
      <Row className="g-3">
        {futureReads.length > 0 ? (
          futureReads.map((suggestion) => (
            <Col key={suggestion.id} lg={6}>
              <SuggestionCard suggestion={suggestion} onVote={addVote} onMoveToFuture={moveToFutureReads} />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-muted">No future reads saved yet.</p>
          </Col>
        )}
      </Row>
    </>
  )
}

export default VotingPage
