import { Col, Row } from 'react-bootstrap'
import AddBookForm from '../components/AddBookForm'
import BookArchiveCard from '../components/BookArchiveCard'
import PageHeader from '../components/PageHeader'

function ArchivePage({ books, setBooks }) {
  const addBook = (bookDraft) => {
    const nextBook = {
      id: crypto.randomUUID(),
      ...bookDraft,
    }

    setBooks((prev) => [...prev, nextBook])
  }

  const saveBookEdits = (bookId, updates) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) {
          return book
        }

        return {
          ...book,
          ...updates,
        }
      }),
    )
  }

  return (
    <>
      <PageHeader
        title="Reading Archive"
        subtitle="Save your club history with dates, ratings, discussion prompts, and comments."
      />
      <AddBookForm onAddBook={addBook} />
      <Row className="g-3">
        {books.map((book) => (
          <Col key={book.id} lg={6}>
            <BookArchiveCard book={book} onSaveEdit={saveBookEdits} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ArchivePage
