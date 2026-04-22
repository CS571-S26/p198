import { Card, ProgressBar } from 'react-bootstrap'

function GroupProgressPanel({ averageProgress }) {
  return (
    <Card className="mb-4">
      <Card.Header>Overall Group Progress</Card.Header>
      <Card.Body>
        <ProgressBar now={averageProgress} label={`${averageProgress}%`} className="mb-2" />
        <p className="mb-0 text-muted">
          This average updates in real time as members adjust their individual reading progress.
        </p>
      </Card.Body>
    </Card>
  )
}

export default GroupProgressPanel
