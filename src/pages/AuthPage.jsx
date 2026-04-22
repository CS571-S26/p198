import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

function AuthPage({ currentUser, onSignup, onLogin }) {
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    const name = username.trim()
    if (!name || !password) {
      setError('Username and password are required.')
      return
    }

    const action = mode === 'signup' ? onSignup : onLogin
    const result = action(name, password)

    if (!result.ok) {
      setError(result.message)
    }
  }

  return (
    <>
      <PageHeader
        title="Login or Sign Up"
        subtitle="Create an account and all posts/suggestions will be tied to your username."
      />
      <Row className="justify-content-center">
        <Col md={7} lg={5}>
          <Card>
            <Card.Body>
              <div className="d-flex gap-2 mb-3">
                <Button
                  variant={mode === 'login' ? 'primary' : 'outline-primary'}
                  onClick={() => setMode('login')}
                >
                  Login
                </Button>
                <Button
                  variant={mode === 'signup' ? 'primary' : 'outline-primary'}
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </Button>
              </div>

              {error ? <Alert variant="danger">{error}</Alert> : null}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="authUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={username}
                    placeholder="yourname"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="authPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
                <Button type="submit">{mode === 'signup' ? 'Create Account' : 'Login'}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AuthPage
