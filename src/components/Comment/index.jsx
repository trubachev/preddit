import React from "react"

import { parseMd } from "~/core/parse-md"
import PostedBy from "../PostedBy"
import Comments from "../Comments"

import css from "./styles.scss"

const Comment = ({ comment }) => (
  <div className={css.comment}>
    <div className={css.meta}>
      <PostedBy created={comment.created} author={comment.author} />
    </div>
    <div
      className={css.body}
      dangerouslySetInnerHTML={{ __html: parseMd(comment.body) }}
    ></div>
    {comment.replies && <Comments comments={comment.replies} />}
  </div>
)

export default Comment
