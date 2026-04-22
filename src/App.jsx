import { useEffect, useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppNavbar from './components/AppNavbar'
import HomePage from './pages/HomePage'
import ArchivePage from './pages/ArchivePage'
import VotingPage from './pages/VotingPage'
import ProgressPage from './pages/ProgressPage'
import AuthPage from './pages/AuthPage'

const USERS_KEY = 'book-club-users'
const SESSION_KEY = 'book-club-current-user'
const BOOKS_KEY = 'book-club-books'
const SUGGESTIONS_KEY = 'book-club-suggestions'
const PROGRESS_KEY = 'book-club-progress'
const VOTE_MONTH_KEY = 'book-club-vote-month'

const readStorage = (key, fallbackValue) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallbackValue
  } catch {
    return fallbackValue
  }
}

function App() {
  const [users, setUsers] = useState(() => readStorage(USERS_KEY, []))
  const [currentUser, setCurrentUser] = useState(() => readStorage(SESSION_KEY, ''))
  const [books, setBooks] = useState(() => readStorage(BOOKS_KEY, []))
  const [suggestions, setSuggestions] = useState(() => readStorage(SUGGESTIONS_KEY, []))
  const [progress, setProgress] = useState(() => readStorage(PROGRESS_KEY, []))
  const [currentVoteMonth, setCurrentVoteMonth] = useState(() => readStorage(VOTE_MONTH_KEY, 'May 2026'))

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser))
  }, [currentUser])

  useEffect(() => {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books))
  }, [books])

  useEffect(() => {
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(suggestions))
  }, [suggestions])

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    localStorage.setItem(VOTE_MONTH_KEY, JSON.stringify(currentVoteMonth))
  }, [currentVoteMonth])

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

  const signup = (username, password) => {
    const normalized = username.toLowerCase()
    const exists = users.some((user) => user.username.toLowerCase() === normalized)
    if (exists) {
      return { ok: false, message: 'That username already exists.' }
    }

    setUsers((prev) => [...prev, { username, password }])
    setCurrentUser(username)
    return { ok: true }
  }

  const login = (username, password) => {
    const foundUser = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase() && user.password === password,
    )

    if (!foundUser) {
      return { ok: false, message: 'Invalid username or password.' }
    }

    setCurrentUser(foundUser.username)
    return { ok: true }
  }

  const logout = () => {
    setCurrentUser('')
  }

  const protectedElement = (element) => {
    if (!currentUser) {
      return <Navigate to="/auth" replace />
    }
    return element
  }

  return (
    <div className="app-shell">
      <AppNavbar currentUser={currentUser} onLogout={logout} />
      <Container className="py-4">
        <Routes>
          <Route
            path="/auth"
            element={<AuthPage currentUser={currentUser} onSignup={signup} onLogin={login} />}
          />
          <Route
            path="/"
            element={protectedElement(
              <HomePage
                currentUser={currentUser}
                books={books}
                currentMonthSuggestions={currentMonthSuggestions}
                futureReads={futureReads}
                selectedBook={selectedBook}
                groupProgress={groupProgress}
              />
            )}
          />
          <Route
            path="/archive"
            element={protectedElement(
              <ArchivePage books={books} setBooks={setBooks} currentUser={currentUser} />,
            )}
          />
          <Route
            path="/voting"
            element={protectedElement(
              <VotingPage
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                currentVoteMonth={currentVoteMonth}
                setCurrentVoteMonth={setCurrentVoteMonth}
                currentUser={currentUser}
              />
            )}
          />
          <Route
            path="/progress"
            element={protectedElement(
              <ProgressPage progress={progress} setProgress={setProgress} currentUser={currentUser} />,
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
