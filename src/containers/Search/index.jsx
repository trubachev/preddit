import React, { useState, useCallback } from "react"
import { useLocation } from "wouter"
import SearchView from "~/components/SearchView"
import { urls } from "~/routes"

const suggestions = ["analog", "sweden", "science", "javascript"]

const Search = () => {
  const [_, setLocation] = useLocation()
  const [subreddit, setSubreddit] = useState("")

  const navigateToSubreddit = useCallback(() => {
    setLocation(urls.forR(subreddit))
  }, [subreddit])

  const updateSubreddit = useCallback(subreddit => {
    setSubreddit(subreddit)
  }, [])

  return (
    <SearchView
      suggestions={suggestions}
      onSubmitSearch={navigateToSubreddit}
      onChangeSearch={updateSubreddit}
    />
  )
}

export default Search
