import { useMemo } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BookCover from '../components/BookCover'
import GroupProgressPanel from '../components/GroupProgressPanel'
import PageHeader from '../components/PageHeader'
import ProgressMemberCard from '../components/ProgressMemberCard'

function ProgressPage({ progress, setProgress, currentUser, clubCurrentRead, setClubCurrentRead }) {
  const navigate = useNavigate()

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

  const markAsFinished = () => {
    if (!clubCurrentRead) {
      return
    }

    const completedRead = clubCurrentRead
    setClubCurrentRead(null)

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
        subtitle="Progress updates apply to the one active club read selected from the voting winner."
      />
      {clubCurrentRead ? (
        <Card className="mb-3">
          <Card.Header>Current Club Read</Card.Header>
          <Card.Body>
            <BookCover title={clubCurrentRead.title} author={clubCurrentRead.author} coverUrl={clubCurrentRead.coverUrl} />
            <p className="h5 mb-1">{clubCurrentRead.title}</p>
            <p className="text-muted mb-3">{clubCurrentRead.author || 'Unknown author'}</p>
            <Button size="sm" variant="success" onClick={markAsFinished}>
              Mark as Finished and Add to Archive
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="warning">
          No current read selected. Go to Voting and choose the winning book as the current read first.
        </Alert>
      )}
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
          canEdit={memberProgress.member === currentUser && Boolean(clubCurrentRead)}
        />
      ))}
      <Card>
        <Card.Body className="text-muted">
          Tip: set a weekly checkpoint in your meetings and update this page together.
        </Card.Body>
      </Card>
    </>
  )
}

export default ProgressPage
