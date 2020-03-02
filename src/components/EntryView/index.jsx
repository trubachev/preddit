import React from "react"
import { Link } from "wouter"

import { parseMd } from "~/core/parse-md"
import { decodeHtml } from "~/core/decode-html"
import { urls } from "~/routes"

import Comments from "../Comments"

import css from "./styles.scss"
import Icon from "../Icon"

const Selftext = ({ selftext }) => (
  <div dangerouslySetInnerHTML={{ __html: parseMd(selftext) }}></div>
)

const Preview = ({ preview }) => (
  <div>
    <img
      className={css.preview}
      src={decodeHtml(preview.images[0].resolutions[3].url)}
    />
  </div>
)

const Title = ({ title }) => <h1 className={css.title}>{title}</h1>

const Url = ({ url }) => {
  const urlText = url.length > 28 ? url.slice(0, 28) + "..." : url
  return (
    <div>
      <a href={url} target="_blank">
        {urlText} <Icon iconName="external-link" />
      </a>{" "}
    </div>
  )
}

const EntryView = ({
  entryData: { subreddit, preview, title, selftext, url },
  comments
}) => (
  <div>
    <Link href={urls.forR(subreddit)}>
      <a>Back to r/{subreddit}</a>
    </Link>
    <Title title={title} />
    {selftext && <Selftext selftext={selftext} />}
    {preview && <Preview preview={preview} />}
    {url && <Url url={url} />}
    {comments && <Comments comments={comments} />}
  </div>
)

export default EntryView
