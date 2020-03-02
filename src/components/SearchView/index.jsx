import React from "react"
import { Link } from "wouter"

import { urls } from "~/routes"
import Button from "~/components/Button"

import css from "./styles.scss"

const SearchView = ({ suggestions, onSubmitSearch, onChangeSearch }) => {
  const handleChangeSearch = e => onChangeSearch(e.target.value)
  const handleSubmitForm = e => {
    e.preventDefault()
    onSubmitSearch()
  }

  return (
    <div className={css.search}>
      <form onSubmit={handleSubmitForm}>
        <div className={css.searchForm}>
          r/
          <input
            type="text"
            placeholder="subreddit name"
            onChange={handleChangeSearch}
          />
          <Button>Go</Button>
        </div>
      </form>

      <div className={css.suggestions}>
        {suggestions.map((suggestion, index) => (
          <Link href={urls.forR(suggestion)} key={index}>
            <a>
              <div className={css.suggestion}>{`r/${suggestion}`}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchView
