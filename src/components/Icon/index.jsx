import React from "react"

import css from "./icofont.css"

const Icon = ({ iconName, onClick }) => {
  const iconClass = css[`icofont-${iconName}`]
  return <i className={`${css.icofont} ${iconClass}`} onClick={onClick}></i>
}

export default Icon
