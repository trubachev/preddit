import axios from "axios"

import {
  API_GET_SUBREDDIT_SUCCESS,
  API_GET_ENTRY_SUCCESS,
  SET_LIMIT,
  SET_PAGE
} from "./constants"

export const getSubreddit = subreddit => (dispatch, getState) => {
  const { subreddits, limit, page } = getState()

  const posts = subreddits[subreddit]
    ? Object.values(subreddits[subreddit])
    : []

  const edgePost = posts.slice(page * limit - 1, page * limit)[0]

  const afterId = edgePost ? edgePost.name : null

  axios({
    url: `https://www.reddit.com/r/${subreddit}/new.json`,
    params: {
      limit: limit * 2,
      after: afterId
    }
  })
    .then(res => {
      dispatch({
        type: API_GET_SUBREDDIT_SUCCESS,
        payload: {
          subreddit,
          data: res.data.data.children
        }
      })
    })
    // TODO add error handling
    .catch(console.log)
}

export const getEntry = (subreddit, entryId) => dispatch => {
  axios({
    url: `https://www.reddit.com/r/${subreddit}/comments/${entryId}.json`
  }).then(res => {
    dispatch({
      type: API_GET_ENTRY_SUCCESS,
      payload: {
        subreddit,
        entryData: res.data[0].data.children[0],
        commentsData: res.data[1].data.children,
      }
    })
  })
}

export const setLimit = limit => ({
  type: SET_LIMIT,
  payload: limit
})

export const setPage = page => ({
  type: SET_PAGE,
  payload: page
})
