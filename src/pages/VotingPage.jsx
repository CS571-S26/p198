import { useMemo } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import SuggestionCard from '../components/SuggestionCard'
import SuggestionForm from '../components/SuggestionForm'
import { fetchBookCoverUrl } from '../utils/coverLookup'
import { buildMonthYearOptions } from '../utils/monthOptions'

function VotingPage({
  suggestions,
  setSuggestions,
  currentVoteMonth,
  setCurrentVoteMonth,
  currentUser,
  onSetCurrentRead,
  clubCurrentRead,
}) {
  const monthOptions = useMemo(() => {
    const generated = buildMonthYearOptions(24)
    if (currentVoteMonth && !generated.includes(currentVoteMonth)) {
      return [currentVoteMonth, ...generated]
    }
    return generated
  }, [currentVoteMonth])

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

  const currentUserVoteId = useMemo(() => {
    const votedSuggestion = monthlySuggestions.find((suggestion) =>
      (suggestion.voters ?? []).includes(currentUser),
    )
    return votedSuggestion?.id ?? null
  }, [monthlySuggestions, currentUser])

  const addSuggestion = async (suggestionDraft) => {
    const coverUrl = await fetchBookCoverUrl(suggestionDraft.title, suggestionDraft.author)
    setSuggestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...suggestionDraft,
        coverUrl,
        proposer: currentUser,
        votes: 0,
        voters: [],
        status: 'suggested',
      },
    ])
  }

  const addVote = (suggestionId) => {
    setSuggestions((prev) =>
      prev.map((suggestion) => {
        if (suggestion.month !== currentVoteMonth || suggestion.status !== 'suggested') {
          return suggestion
        }

        const existingVoters = suggestion.voters ?? []
        const withoutCurrentUser = existingVoters.filter((voter) => voter !== currentUser)
        const nextVoters =
          suggestion.id === suggestionId ? [...withoutCurrentUser, currentUser] : withoutCurrentUser

        return {
          ...suggestion,
          voters: nextVoters,
          votes: nextVoters.length,
        }
      }),
    )
  }

  const moveToFutureReads = (suggestionId) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === suggestionId ? { ...suggestion, status: 'future' } : suggestion,
      ),
    )
  }

  const moveToCurrentBallot = (suggestionId) => {
    setSuggestions((prev) =>
      prev.map((suggestion) => {
        if (suggestion.id !== suggestionId) {
          return suggestion
        }

        return {
          ...suggestion,
          status: 'suggested',
          month: currentVoteMonth,
          voters: [],
          votes: 0,
        }
      }),
    )
  }

  const deleteFutureRead = (suggestionId) => {
    setSuggestions((prev) =>
      prev.filter((suggestion) => !(suggestion.id === suggestionId && suggestion.status === 'future')),
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
      <SuggestionForm
        onAddSuggestion={addSuggestion}
        currentUser={currentUser}
        monthOptions={monthOptions}
        defaultMonth={currentVoteMonth}
      />

      <Form.Group className="mb-3" controlId="votingMonth">
        <Form.Label>Active Voting Month</Form.Label>
        <Form.Select
          aria-label="Select active voting month"
          value={currentVoteMonth}
          onChange={(event) => setCurrentVoteMonth(event.target.value)}
        >
          {monthOptions.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Alert variant="info">
        {winningSuggestion
          ? `Current leader for ${currentVoteMonth}: ${winningSuggestion.title} (${winningSuggestion.votes} votes)`
          : `No active suggestions yet for ${currentVoteMonth}.`}
      </Alert>
      <Button
        className="me-2 mb-4"
        variant="primary"
        onClick={() => onSetCurrentRead(winningSuggestion)}
        disabled={!winningSuggestion}
      >
        Set Winning Book as Current Read
      </Button>
      <Button className="mb-4" variant="success" onClick={finalizeMonth} disabled={!winningSuggestion}>
        Finalize Month and Move Remaining Books to Future Reads
      </Button>
      {clubCurrentRead ? (
        <p className="text-muted mb-4">
          Current read is set to <strong>{clubCurrentRead.title}</strong>.
        </p>
      ) : null}

      <h2 className="section-title">Current Ballot</h2>
      <Row className="g-3 mb-4">
        {monthlySuggestions.length > 0 ? (
          monthlySuggestions.map((suggestion) => (
            <Col key={suggestion.id} lg={6}>
              <SuggestionCard
                suggestion={suggestion}
                onVote={addVote}
                onMoveToFuture={moveToFutureReads}
                onMoveToCurrent={moveToCurrentBallot}
                onDeleteFutureRead={deleteFutureRead}
                hasCurrentUserVote={currentUserVoteId === suggestion.id}
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
              <SuggestionCard
                suggestion={suggestion}
                onVote={addVote}
                onMoveToFuture={moveToFutureReads}
                onMoveToCurrent={moveToCurrentBallot}
                onDeleteFutureRead={deleteFutureRead}
                hasCurrentUserVote={false}
              />
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
