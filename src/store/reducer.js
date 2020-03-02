import {
  API_GET_ENTRY_SUCCESS,
  API_GET_SUBREDDIT_SUCCESS,
  SET_LIMIT,
  SET_PAGE
} from "./constants"
import { keyBy } from "../core/key-by"

const defaultState = {
  subreddits: {},
  limit: 5,
  page: 0,
  comments: {}
}

const buildEntryObj = ({ data }) => ({
  id: data.id,
  title: data.title,
  thumbnail: data.thumbnail,
  created: data.created,
  num_comments: data.num_comments,
  author: data.author,
  score: data.score,
  permalink: data.permalink,
  tile: data.title,
  name: data.name,
  subreddit: data.subreddit,
  selftext: data.selftext,
  preview: data.preview,
  stickied: data.stickied,
  url: data.url
})

const buildCommentObj = ({ data }) => ({
  id: data.id,
  body: data.body,
  created: data.created,
  author: data.author,
  replies: data.replies ? data.replies.data.children.map(buildCommentObj) : null
})

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch (type) {
    case API_GET_SUBREDDIT_SUCCESS:
      return {
        ...state,
        subreddits: {
          ...state.subreddits,
          [payload.subreddit]: {
            ...state.subreddits[payload.subreddit],
            ...keyBy(payload.data.map(buildEntryObj), "id")
          }
        }
      }
    case SET_LIMIT:
      return {
        ...state,
        limit: payload
      }
    case SET_PAGE:
      return {
        ...state,
        page: payload
      }
    case API_GET_ENTRY_SUCCESS:
      return {
        ...state,
        subreddits: {
          ...state.subreddits,
          [payload.subreddit]: {
            ...state.subreddits[payload.subreddit],
            [payload.entryData.data.id]: buildEntryObj(payload.entryData)
          }
        },
        comments: {
          ...state.comments,
          [payload.entryData.data.id]: payload.commentsData.map(buildCommentObj)
        }
      }
    default:
      return state
  }

  return state
}
