import React from 'react'

const Button = ({title, handleClick}) => {
  return (
    <button
        onClick={handleClick}
    >{title}</button>
  )
}

export default Button
