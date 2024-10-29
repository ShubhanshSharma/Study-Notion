import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const dispatch = useDispatch(); 

    const [sentEmail, setSentEmail] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setSentEmail(true)));
    }
  return (
    <div className=' flex flex-col self-center items-center min-h-screen font-inter text-richblack-5 w-screen justify-center'>
        {
            loading ? 
            (
                <div>Loading.....</div>
            ) : 
            (
                <div className=' relative max-w-lg flex flex-col gap-5'>
                    <h1 className=' font-bold text-3xl'>
                        {
                            !sentEmail ? "Reset Your Password" : " Check your Email"
                        }
                    </h1>

                    <p className=' text-richblack-200 text-[18px]'>
                        {
                            !sentEmail ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                            : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={submitHandler}>
                        {
                            !sentEmail && (
                                <label className=' flex flex-col'>
                                    <p className=' text-richblack-100 mb-2'>Email Adress <span className=' text-pink-300 font-bold'>*</span></p>
                                    <input className=' py-2 px-4 rounded-lg bg-richblack-700 border-b border-b-richblack-300'
                                    required
                                    name='email'
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your Email'
                                    >
                                    </input>
                                </label>
                            )
                        }
                        {
                            <button type='submit' className=' w-full bg-yellow-100 mt-5 rounded-lg py-3 font-bold text-black'>
                                {
                                    !sentEmail ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        }
                    </form>

                    <Link to='/login' className=' flex gap-2 items-center'>
                        <FaArrowLeftLong />
                        Back to Login
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword