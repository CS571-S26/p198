import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">p198</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/books">Books</Link>
            <Link className="nav-link" to="/vote">Vote</Link>
            <Link className="nav-link" to="/progress">Progress</Link>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="vote" element={<VotingPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div>
      <h1>Book Club Hub</h1>
      <p>Track books, vote on future reads, and monitor your progress!</p>
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>This is my p198 project.</p>
    </div>
  )
}

function BooksPage() {
  const [books, setBooks] = useState(["The Great Gatsby"])

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book, i) => <li key={i}>{book}</li>)}
      </ul>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  )
}

function App() {
  return <Layout />
}

export default App
