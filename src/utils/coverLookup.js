const OPEN_LIBRARY_SEARCH = 'https://openlibrary.org/search.json'
const OPEN_LIBRARY_COVER = 'https://covers.openlibrary.org/b/id'

export async function fetchBookCoverUrl(title, author = '') {
  if (!title?.trim()) {
    return ''
  }

  try {
    const params = new URLSearchParams({
      title: title.trim(),
      limit: '1',
    })

    if (author.trim()) {
      params.set('author', author.trim())
    }

    const response = await fetch(`${OPEN_LIBRARY_SEARCH}?${params.toString()}`)
    if (!response.ok) {
      return ''
    }

    const data = await response.json()
    const first = data?.docs?.[0]
    if (!first?.cover_i) {
      return ''
    }

    return `${OPEN_LIBRARY_COVER}/${first.cover_i}-M.jpg`
  } catch {
    return ''
  }
}
