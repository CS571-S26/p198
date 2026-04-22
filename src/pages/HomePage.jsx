import { Card, Col, Row } from 'react-bootstrap'
import DashboardStats from '../components/DashboardStats'
import PageHeader from '../components/PageHeader'

function HomePage({
  currentUser,
  books,
  currentMonthSuggestions,
  futureReads,
  selectedBook,
  groupProgress,
}) {
  return (
    <>
      <PageHeader
        title="Book Club Hub"
        subtitle={`Welcome @${currentUser}. Archive books, vote on upcoming reads, and track progress together.`}
      />

      <DashboardStats
        archiveCount={books.length}
        currentVoteCount={currentMonthSuggestions.length}
        futureReadCount={futureReads.length}
        selectedBookTitle={selectedBook?.title}
        groupProgress={groupProgress}
      />

      <Row className="g-3">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Current Monthly Leader</Card.Title>
              {selectedBook ? (
                <>
                  <h4>{selectedBook.title}</h4>
                  <p className="mb-0 text-muted">
                    {selectedBook.votes} votes | Proposed by {selectedBook.proposer}
                  </p>
                </>
              ) : (
                <p className="mb-0">No suggestions for this month yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Archive Snapshot</Card.Title>
              <p className="mb-2">
                Most recent read:{' '}
                <strong>{books.length ? books[books.length - 1].title : 'No books yet'}</strong>
              </p>
              <p className="mb-0 text-muted">
                Keep adding history so your club can revisit previous discussions and ratings.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default HomePage
