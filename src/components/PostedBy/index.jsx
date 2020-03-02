import React from "react"
import { formatRelative } from "date-fns"

import css from "./styles.scss"
import Icon from "../Icon"

const PostedBy = ({ author, created }) => {
  const postedDate = formatRelative(new Date(created * 1000), new Date())
  return (
    <span className={css.postedBy}>
      <span className={css.author}>
        <Icon iconName={"ui-user"} /> {author}
      </span>{" "}
      <span className={css.created}>{postedDate}</span>
    </span>
  )
}

export default PostedBy
