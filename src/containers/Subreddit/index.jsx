import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import SubRedditView from "~/components/SubRedditView"
import { getSubreddit, setPage, setLimit } from "~/store/actions"

import selector from "./selector"

const SubReddit = ({ subreddit }) => {
  const dispatch = useDispatch()
  const { entries, page, shouldLoadMore, limit } = useSelector(selector(subreddit))

  useEffect(() => {
    dispatch(setPage(0))
  }, [])

  useEffect(() => {
    shouldLoadMore && dispatch(getSubreddit(subreddit))
  }, [page, limit, subreddit])

  const updateLimit = newLimit => {
    dispatch(setLimit(newLimit))
    dispatch(setPage(0))
  }
  const loadNext = () => dispatch(setPage(page + 1))
  const loadPrev = () => dispatch(setPage(page - 1))

  const hasPrev = page !== 0

  return (
    <SubRedditView
      entries={entries}
      subreddit={subreddit}
      onChangeLimit={updateLimit}
      onNext={loadNext}
      onPrev={loadPrev}
      hasPrev={hasPrev}
      limit={limit}
    />
  )
}

export default SubReddit
