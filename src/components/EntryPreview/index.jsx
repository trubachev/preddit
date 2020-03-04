import React from "react"
import { Link } from "wouter"

import PostedBy from "../PostedBy"
import Icon from "../Icon"

import { urls } from "~/routes"

import css from "./styles.scss"

const Thumbnail = ({ thumbnail }) => {
  if (thumbnail === "self") {
    return null
  }

  return (
    <div
      className={css.thumbnail}
      style={{ backgroundImage: `url(${thumbnail})` }}
    ></div>
  )
}

const getCommentsText = commentsCount => {
  if (commentsCount === 0) {
    return "No Comments"
  }

  if (commentsCount === 1) {
    return "1 Comment"
  }

  return `${commentsCount} Comments`
}

const Comments = ({ commentsCount }) => (
  <div>
    <Icon iconName="speech-comments" /> {getCommentsText(commentsCount)}
  </div>
)

const Score = ({ score }) => <div>Score {score}</div>

const Title = ({ title, subreddit, entryId }) => (
  <Link href={urls.forEntry(subreddit, entryId)}>
    <a>
      <h2
        className={css.title}
        dangerouslySetInnerHTML={{ __html: title }}
      ></h2>
    </a>
  </Link>
)

const EntryPreview = ({ postData }) => {
  const hasPreview = postData.thumbnail && postData.thumbnail !== "default"

  return (
    <div className={css.postContainer}>
      <div className={css.header}>
        <PostedBy author={postData.author} created={postData.created} />
      </div>
      <div className={css.previewContainer}>
        {hasPreview && <Thumbnail thumbnail={postData.thumbnail} />}
        <Title
          title={postData.title}
          entryId={postData.id}
          subreddit={postData.subreddit}
        />
      </div>
      <div className={css.footer}>
        <Comments commentsCount={postData.num_comments} />
        <Score score={postData.score} />{" "}
        <a href={`https://reddit.com${postData.permalink}`} target="_blank">
          Link <Icon iconName="external-link" />{" "}
        </a>
      </div>
    </div>
  )
}

export default EntryPreview
