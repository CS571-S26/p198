import { useMemo } from 'react'
import { Button, Card } from 'react-bootstrap'
import GroupProgressPanel from '../components/GroupProgressPanel'
import PageHeader from '../components/PageHeader'
import ProgressMemberCard from '../components/ProgressMemberCard'

function ProgressPage({ progress, setProgress, currentUser }) {
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
      <Card>
        <Card.Body className="text-muted">
          Tip: set a weekly checkpoint in your meetings and update this page together.
        </Card.Body>
      </Card>
    </>
  )
}

export default ProgressPage
