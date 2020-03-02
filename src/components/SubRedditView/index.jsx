import React from "react"
import { Link } from "wouter"

import { urls } from "~/routes"
import EntryPreview from "../EntryPreview"
import Button from "~/components/Button"

import css from "./styles.scss"

const LimitControls = ({ selectedLimit, onSelectLimit }) => (
  <div className={css.limitControls}>
    Entries per page
    <div className={css.buttons}>
      <Button disabled={selectedLimit === 5} onClick={onSelectLimit(5)}>
        5
      </Button>
      <Button disabled={selectedLimit === 10} onClick={onSelectLimit(10)}>
        10
      </Button>
      <Button disabled={selectedLimit === 25} onClick={onSelectLimit(25)}>
        25
      </Button>
    </div>
  </div>
)

const LinkBack = () => (
  <Link href={urls.home}>
    <a>Back</a>
  </Link>
)

const Title = ({ title }) => <h1>r/{title}</h1>

const Entries = ({ entries }) => (
  <div>
    {entries.map((post, index) => (
      <EntryPreview postData={post} key={index} />
    ))}
  </div>
)

const PaginationControls = ({ onNext, onPrev, hasPrev }) => (
  <div className={css.pagination}>
    <Button onClick={onNext}>Next</Button>
    {hasPrev && <Button onClick={onPrev}>Prev</Button>}
  </div>
)

const SubRedditView = ({
  subreddit,
  entries,
  limit,
  onChangeLimit,
  onNext,
  onPrev,
  hasPrev
}) => {
  const setLimit = limit => () => onChangeLimit(limit)

  const hasEntries = entries.length > 0

  return (
    <div>
      <LinkBack />
      <Title title={subreddit} />
      {hasEntries && <Entries entries={entries} />}
      {hasEntries && (
        <PaginationControls onNext={onNext} onPrev={onPrev} hasPrev={hasPrev} />
      )}
      <LimitControls selectedLimit={limit} onSelectLimit={setLimit} />
    </div>
  )
}

export default SubRedditView
