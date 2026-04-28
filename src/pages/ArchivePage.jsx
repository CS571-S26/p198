import { Col, Row } from 'react-bootstrap'
import AddBookForm from '../components/AddBookForm'
import BookArchiveCard from '../components/BookArchiveCard'
import PageHeader from '../components/PageHeader'
import { fetchBookCoverUrl } from '../utils/coverLookup'

function ArchivePage({ books, setBooks, currentUser }) {
  const addBook = async (bookDraft) => {
    const coverUrl = await fetchBookCoverUrl(bookDraft.title, bookDraft.author)
    const nextBook = {
      id: crypto.randomUUID(),
      ...bookDraft,
      coverUrl,
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
          lastEditedBy: currentUser,
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
      <AddBookForm onAddBook={addBook} currentUser={currentUser} />
      <Row className="g-3">
        {books.length > 0 ? (
          books.map((book) => (
            <Col key={book.id} lg={6}>
              <BookArchiveCard book={book} onSaveEdit={saveBookEdits} />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-muted">No books in the archive yet. Add your first completed read above.</p>
          </Col>
        )}
      </Row>
    </>
  )
}

export default ArchivePage
