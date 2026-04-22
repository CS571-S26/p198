import { Card, Col, Row } from 'react-bootstrap'

function DashboardStats({
  archiveCount,
  currentVoteCount,
  futureReadCount,
  selectedBookTitle,
  groupProgress,
}) {
  return (
    <Row className="g-3 mb-4">
      <Col md={6} lg={3}>
        <Card className="h-100 stat-card">
          <Card.Body>
            <Card.Title>Archive Books</Card.Title>
            <Card.Text className="display-6">{archiveCount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={3}>
        <Card className="h-100 stat-card">
          <Card.Body>
            <Card.Title>Current Ballot</Card.Title>
            <Card.Text className="display-6">{currentVoteCount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={3}>
        <Card className="h-100 stat-card">
          <Card.Body>
            <Card.Title>Future Reads</Card.Title>
            <Card.Text className="display-6">{futureReadCount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={3}>
        <Card className="h-100 stat-card">
          <Card.Body>
            <Card.Title>Group Progress</Card.Title>
            <Card.Text className="display-6">{groupProgress}%</Card.Text>
            <small className="text-muted">Leading vote: {selectedBookTitle ?? 'No votes yet'}</small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default DashboardStats
