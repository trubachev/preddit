import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import EntryView from "~/components/EntryView"
import { getEntry } from "~/store/actions"

const Entry = ({ entryId, subreddit }) => {
  const dispatch = useDispatch()
  const { entryData, comments } = useSelector(({ subreddits, comments }) => ({
    entryData: subreddits[subreddit] ? subreddits[subreddit][entryId] : null,
    comments: comments[entryId]
  }))

  useEffect(() => {
    dispatch(getEntry(subreddit, entryId))
  }, [entryId, subreddit])

  if (!entryData) {
    return null
  }

  return <EntryView entryData={entryData} comments={comments} />
}

export default Entry
