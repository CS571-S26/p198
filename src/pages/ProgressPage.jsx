import { useMemo, useState } from 'react'
import { Button, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import GroupProgressPanel from '../components/GroupProgressPanel'
import PageHeader from '../components/PageHeader'
import ProgressMemberCard from '../components/ProgressMemberCard'

function ProgressPage({ progress, setProgress, currentUser, currentlyReading, setCurrentlyReading }) {
  const navigate = useNavigate()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const averageProgress = useMemo(() => {
    if (progress.length === 0) {
      return 0
    }
    const total = progress.reduce((sum, memberProgress) => sum + memberProgress.percent, 0)
    return Math.round(total / progress.length)
  }, [progress])

  const updateMemberProgress = (memberId, nextPercent) => {
    setProgress((prev) =>
      prev.map((memberProgress) =>
        memberProgress.id === memberId && memberProgress.member === currentUser
          ? { ...memberProgress, percent: nextPercent }
          : memberProgress,
      ),
    )
  }

  const addCurrentUserProgress = () => {
    setProgress((prev) => {
      const alreadyExists = prev.some((entry) => entry.member === currentUser)
      if (alreadyExists) {
        return prev
      }

      return [...prev, { id: crypto.randomUUID(), member: currentUser, percent: 0 }]
    })
  }

  const hasCurrentUserProgress = progress.some((entry) => entry.member === currentUser)
  const currentUserReads = currentlyReading.filter((item) => item.addedBy === currentUser)

  const addCurrentlyReading = (event) => {
    event.preventDefault()
    if (!newTitle.trim() || !newAuthor.trim()) {
      return
    }

    setCurrentlyReading((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: newTitle.trim(),
        author: newAuthor.trim(),
        percent: 0,
        addedBy: currentUser,
      },
    ])
    setNewTitle('')
    setNewAuthor('')
  }

  const updateCurrentReadProgress = (readId, nextPercent) => {
    setCurrentlyReading((prev) =>
      prev.map((item) =>
        item.id === readId && item.addedBy === currentUser ? { ...item, percent: nextPercent } : item,
      ),
    )
  }

  const markAsFinished = (readId) => {
    const completedRead = currentlyReading.find((item) => item.id === readId && item.addedBy === currentUser)
    if (!completedRead) {
      return
    }

    setCurrentlyReading((prev) => prev.filter((item) => item.id !== readId))

    navigate('/archive', {
      state: {
        prefillBook: {
          title: completedRead.title,
          author: completedRead.author,
          monthRead: '',
          dateRead: new Date().toISOString().slice(0, 10),
          rating: '',
          questions: '',
          comments: '',
        },
      },
    })
  }

  return (
    <>
      <PageHeader
        title="Reading Progress Tracker"
        subtitle="Update each member's completion percentage and monitor overall accountability."
      />
      {!hasCurrentUserProgress ? (
        <Button className="mb-3" onClick={addCurrentUserProgress}>
          Create My Progress Entry
        </Button>
      ) : null}
      <GroupProgressPanel averageProgress={averageProgress} />
      {progress.map((memberProgress) => (
        <ProgressMemberCard
          key={memberProgress.id}
          memberProgress={memberProgress}
          onUpdatePercent={updateMemberProgress}
          canEdit={memberProgress.member === currentUser}
        />
      ))}
      <Card className="mb-4">
        <Card.Header>Currently Reading</Card.Header>
        <Card.Body>
          <Form onSubmit={addCurrentlyReading} className="mb-3">
            <Row className="g-2">
              <Col md={5}>
                <Form.Control
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="Book title"
                  aria-label="Currently reading title"
                />
              </Col>
              <Col md={5}>
                <Form.Control
                  value={newAuthor}
                  onChange={(event) => setNewAuthor(event.target.value)}
                  placeholder="Author"
                  aria-label="Currently reading author"
                />
              </Col>
              <Col md={2}>
                <Button type="submit" className="w-100">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>

          {currentUserReads.length > 0 ? (
            currentUserReads.map((item) => (
              <Card key={item.id} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>{item.title}</strong>
                      <div className="text-muted small">{item.author}</div>
                    </div>
                    <Button size="sm" variant="success" onClick={() => markAsFinished(item.id)}>
                      Mark as Finished
                    </Button>
                  </div>
                  <Form.Range
                    min={0}
                    max={100}
                    value={item.percent}
                    onChange={(event) => updateCurrentReadProgress(item.id, Number(event.target.value))}
                  />
                  <ProgressBar now={item.percent} label={`${item.percent}%`} />
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-muted mb-0">No active reads yet. Add one above to start tracking it.</p>
          )}
        </Card.Body>
      </Card>
      <Card>
        <Card.Body className="text-muted">
          Tip: set a weekly checkpoint in your meetings and update this page together.
        </Card.Body>
      </Card>
    </>
  )
}

export default ProgressPage
