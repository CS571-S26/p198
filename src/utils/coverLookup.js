const OPEN_LIBRARY_SEARCH = 'https://openlibrary.org/search.json'
const OPEN_LIBRARY_COVER = 'https://covers.openlibrary.org/b/id'

async function searchForCover(params) {
  const response = await fetch(`${OPEN_LIBRARY_SEARCH}?${params.toString()}`)
  if (!response.ok) {
    return ''
  }

  const data = await response.json()
  const docs = data?.docs ?? []
  const withCover = docs.find((doc) => Boolean(doc?.cover_i))
  return withCover?.cover_i ? `${OPEN_LIBRARY_COVER}/${withCover.cover_i}-M.jpg` : ''
}

export async function fetchBookCoverUrl(title, author = '') {
  if (!title?.trim()) {
    return ''
  }

  try {
    const titleAndAuthorParams = new URLSearchParams({
      title: title.trim(),
      limit: '20',
    })

    if (author.trim()) {
      titleAndAuthorParams.set('author', author.trim())
    }

    const combinedSearchCover = await searchForCover(titleAndAuthorParams)
    if (combinedSearchCover) {
      return combinedSearchCover
    }

    const titleOnlyParams = new URLSearchParams({
      title: title.trim(),
      limit: '20',
    })

    const titleOnlyCover = await searchForCover(titleOnlyParams)
    if (titleOnlyCover) {
      return titleOnlyCover
    }

    const broadQueryParams = new URLSearchParams({
      q: author.trim() ? `${title.trim()} ${author.trim()}` : title.trim(),
      limit: '20',
    })

    return await searchForCover(broadQueryParams)
  } catch {
    return ''
  }
}
