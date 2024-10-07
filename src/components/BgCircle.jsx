import React from 'react'

const BgCircle = ({color}) => {
  return (
    <div className={`relative shadow-blur rounded-full shadow-[${color}]`}></div>
  )
}

export default BgCircle