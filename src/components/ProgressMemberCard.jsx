import { Card, Col, Form, ProgressBar, Row } from 'react-bootstrap'

function ProgressMemberCard({ memberProgress, onUpdatePercent }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={3}>
            <strong>{memberProgress.member}</strong>
          </Col>
          <Col md={7}>
            <Form.Range
              min={0}
              max={100}
              value={memberProgress.percent}
              onChange={(event) => onUpdatePercent(memberProgress.id, Number(event.target.value))}
            />
          </Col>
          <Col md={2} className="text-md-end">
            {memberProgress.percent}%
          </Col>
        </Row>
        <ProgressBar now={memberProgress.percent} label={`${memberProgress.percent}%`} />
      </Card.Body>
    </Card>
  )
}

export default ProgressMemberCard
