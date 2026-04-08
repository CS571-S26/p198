import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import BookCard from "./components/BookCard"
import AddBookForm from "./components/AddBookForm"
import VoteCard from "./components/VoteCard"
import ProgressBar from "./components/ProgressBar"

function Layout() {
  const [books, setBooks] = useState([
        { title: "The Great Gatsby", totalPages: 0, pagesRead: 0 }
      ])
  const [votingBook, setVotingBook] = useState(null)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Book Club Hub</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/books">Books</Link>
            <Link className="nav-link" to="/club">My Club</Link>
            <Link className="nav-link" to="/stats">My Stats</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="books" element={
            <BooksPage books={books} setBooks={setBooks} setVotingBook={setVotingBook}/>
          } />
          <Route path="club" element={
            <ClubPage votingBook={votingBook} setVotingBook={setVotingBook}/>
          } />
          <Route path="stats" element={
            <StatsPage books={books} setBooks={setBooks} />
          } />
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

function BooksPage({ books, setBooks, setVotingBook }) {
  const [input, setInput] = useState("")

  const addBook = () => {
    if (!input) return

    setBooks([
      ...books,
      { title: input, totalPages: 0, pagesRead: 0 }
    ])

    setInput("")
  }

  return (
    <div>
      <h2>Books</h2>

      <input
        className="form-control mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a book"
      />

      <button className="btn btn-primary mb-3" onClick={addBook}>
        Add Book
      </button>

      {books.map((book, i) => (
        <div key={i} className="card mb-2 p-2 d-flex justify-content-between">
          <span>{book.title}</span>

          <button
            className="btn btn-success btn-sm"
            onClick={() => setVotingBook(book.title)}
          >
            Send to Vote
          </button>
        </div>
      ))}
    </div>
  )
}

function ClubPage({ votingBook, setVotingBook }) {
  const [votes, setVotes] = useState(0)

  if (!votingBook) {
    return <p>No book selected for voting yet.</p>
  }

  return (
    <div>
      <h2>My Club</h2>

      <div className="card p-3">
        <h4>{votingBook}</h4>
        <p>Votes: {votes}</p>

        <button
          className="btn btn-success"
          onClick={() => setVotes(votes + 1)}
        >
          Vote 👍
        </button>

        <button
          className="btn btn-danger mt-2"
          onClick={() => {
            setVotingBook(null)
            setVotes(0)
          }}
        >
          Clear Voting
        </button>
      </div>
    </div>
  )
}

function StatsPage({ books, setBooks }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [totalPages, setTotalPages] = useState("")
  const [pagesRead, setPagesRead] = useState("")

  const selectedBook = books[selectedIndex]

  const handleSave = () => {
    const updated = [...books]

    updated[selectedIndex] = {
      ...selectedBook,
      totalPages: Number(totalPages),
      pagesRead: Number(pagesRead)
    }

    setBooks(updated)
  }

  const progress =
    selectedBook.totalPages > 0
      ? (selectedBook.pagesRead / selectedBook.totalPages) * 100
      : 0

  return (
    <div>
      <h2>My Stats</h2>

      {/* SELECT BOOK */}
      <select
        className="form-select mb-3"
        value={selectedIndex}
        onChange={(e) => setSelectedIndex(e.target.value)}
      >
        {books.map((book, i) => (
          <option key={i} value={i}>
            {book.title}
          </option>
        ))}
      </select>

      {/* INPUTS */}
      <input
        className="form-control mb-2"
        type="number"
        placeholder="Total pages"
        value={totalPages}
        onChange={(e) => setTotalPages(e.target.value)}
      />

      <input
        className="form-control mb-3"
        type="number"
        placeholder="Pages read"
        value={pagesRead}
        onChange={(e) => setPagesRead(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={handleSave}>
        Save Progress
      </button>

      {/* PROGRESS BAR */}
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        >
          {Math.round(progress)}%
        </div>
      </div>
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
