import { sortEntries } from "~/core/sort-entries"

const calculateShouldLoadMore = (allEntries, page, limit) => {
  const startIndex = page * limit
  const endIndex = (page + 1) * limit

  const entriesIdsArray = Object.keys(allEntries)

  if (entriesIdsArray.length < endIndex) {
    return true
  }

  if (entriesIdsArray.slice(startIndex).length < limit * 2) {
    return true
  }

  return false
}

export default subreddit => ({ subreddits, limit, page }) => {
  const allEntries = subreddits[subreddit]
    ? Object.values(subreddits[subreddit])
    : []

  const entries = sortEntries(allEntries).slice(
    page * limit,
    (page + 1) * limit
  )
  return {
    entries,
    page,
    limit,
    shouldLoadMore: calculateShouldLoadMore(allEntries, page, limit)
  }
}
