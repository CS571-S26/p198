import { useMemo, useState } from 'react'

function BookCover({ title, author, coverUrl }) {
  const [attemptIndex, setAttemptIndex] = useState(0)

  const candidateUrls = useMemo(() => {
    const cleanedTitle = encodeURIComponent((title ?? '').trim())
    const cleanedAuthor = encodeURIComponent((author ?? '').trim())

    const candidates = []
    if (coverUrl) {
      candidates.push(coverUrl)
    }
    if (cleanedTitle) {
      candidates.push(`https://covers.openlibrary.org/b/title/${cleanedTitle}-M.jpg?default=false`)
      candidates.push(`https://covers.openlibrary.org/b/title/${cleanedTitle}-L.jpg?default=false`)
    }
    if (cleanedAuthor) {
      candidates.push(`https://covers.openlibrary.org/b/author/${cleanedAuthor}-M.jpg?default=false`)
    }

    return [...new Set(candidates)]
  }, [title, author, coverUrl])

  const activeUrl = candidateUrls[attemptIndex]

  if (!activeUrl) {
    return (
      <div
        className="mb-3 rounded border d-inline-flex align-items-center justify-content-center text-muted"
        style={{ width: '96px', height: '140px', fontSize: '0.8rem' }}
        aria-label={`No cover available for ${title}`}
      >
        No Cover
      </div>
    )
  }

  return (
    <img
      src={activeUrl}
      alt={`Book cover for ${title}`}
      className="mb-3 rounded"
      style={{ width: '96px', height: '140px', objectFit: 'cover' }}
      onError={() => setAttemptIndex((prev) => prev + 1)}
    />
  )
}

export default BookCover
