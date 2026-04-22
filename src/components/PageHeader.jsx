import { Col, Row } from 'react-bootstrap'

function PageHeader({ title, subtitle }) {
  return (
    <Row className="mb-4">
      <Col>
        <h1 className="page-title">{title}</h1>
        <p className="text-muted">{subtitle}</p>
      </Col>
    </Row>
  )
}

export default PageHeader
