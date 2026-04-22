import { useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppNavbar from './components/AppNavbar'
import HomePage from './pages/HomePage'
import ArchivePage from './pages/ArchivePage'
import VotingPage from './pages/VotingPage'
import ProgressPage from './pages/ProgressPage'

const initialBooks = [
  {
    id: crypto.randomUUID(),
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    monthRead: 'January 2026',
    dateRead: '2026-01-27',
    rating: 4.7,
    questions: 'How does perspective change your feelings about each character?',
    comments: 'Great character development and discussion-friendly twists.',
  },
  {
    id: crypto.randomUUID(),
    title: 'The Midnight Library',
    author: 'Matt Haig',
    monthRead: 'February 2026',
    dateRead: '2026-02-23',
    rating: 4.2,
    questions: 'Which life path felt most realistic and why?',
    comments: 'Some members loved the concept, others wanted more depth.',
  },
]

const initialSuggestions = [
  {
    id: crypto.randomUUID(),
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    proposer: 'Mia',
    votes: 4,
    month: 'May 2026',
    status: 'suggested',
  },
  {
    id: crypto.randomUUID(),
    title: 'Circe',
    author: 'Madeline Miller',
    proposer: 'Jordan',
    votes: 6,
    month: 'May 2026',
    status: 'suggested',
  },
  {
    id: crypto.randomUUID(),
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    proposer: 'Alex',
    votes: 0,
    month: 'June 2026',
    status: 'future',
  },
]

const initialProgress = [
  { id: crypto.randomUUID(), member: 'Mia', percent: 55 },
  { id: crypto.randomUUID(), member: 'Jordan', percent: 40 },
  { id: crypto.randomUUID(), member: 'Alex', percent: 72 },
  { id: crypto.randomUUID(), member: 'Sam', percent: 33 },
]

function App() {
  const [books, setBooks] = useState(initialBooks)
  const [suggestions, setSuggestions] = useState(initialSuggestions)
  const [progress, setProgress] = useState(initialProgress)
  const [currentVoteMonth, setCurrentVoteMonth] = useState('May 2026')

  const currentMonthSuggestions = useMemo(
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

  const selectedBook = useMemo(() => {
    if (currentMonthSuggestions.length === 0) {
      return null
    }

    return [...currentMonthSuggestions].sort((a, b) => b.votes - a.votes)[0]
  }, [currentMonthSuggestions])

  const groupProgress = useMemo(() => {
    if (progress.length === 0) {
      return 0
    }

    const total = progress.reduce((sum, memberProgress) => sum + memberProgress.percent, 0)
    return Math.round(total / progress.length)
  }, [progress])

  return (
    <div className="app-shell">
      <AppNavbar />
      <Container className="py-4">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                books={books}
                currentMonthSuggestions={currentMonthSuggestions}
                futureReads={futureReads}
                selectedBook={selectedBook}
                groupProgress={groupProgress}
              />
            }
          />
          <Route path="/archive" element={<ArchivePage books={books} setBooks={setBooks} />} />
          <Route
            path="/voting"
            element={
              <VotingPage
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                currentVoteMonth={currentVoteMonth}
                setCurrentVoteMonth={setCurrentVoteMonth}
              />
            }
          />
          <Route
            path="/progress"
            element={<ProgressPage progress={progress} setProgress={setProgress} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
