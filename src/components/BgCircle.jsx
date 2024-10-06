import React from 'react'

const BgCircle = ({color}) => {
  return (
    <div className={`absolute z-0 shadow-blur top-11 rounded-full shadow-[${color}]`}></div>
  )
}

export default BgCircle