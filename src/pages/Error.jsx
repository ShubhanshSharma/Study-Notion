import React from 'react'

const Error = ({message}) => {
  return (
    <div className=' flex relative min-h-screen flex-col justify-center items-center gap-8 font-inter text-richblack-5'>
        <h1 className=' text-[22px] font-semibold'>Errror</h1>
        <div>
            {message?message:'Error- 404 Not Found'}
        </div>
    </div>
  )
}

export default Error