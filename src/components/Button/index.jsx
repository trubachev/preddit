import React from "react"

import css from "./styles.scss"

const Button = ({ children, onClick, disabled }) => {
  const className = [css.button, disabled ? css.disabled : null]
    .filter(Boolean)
    .join(" ")

  const handleClick = () => !disabled && onClick()

  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
