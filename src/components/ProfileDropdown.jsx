import React, { useEffect, useState } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { profileEndpoints } from '../services/apis';
import { IoLogOutOutline } from 'react-icons/io5';
import { apiConnector } from '../services/apiConnector';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import axios from 'axios';
import { setUser } from '../Slice/profileSlice';

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [user , setToken] = useState({});
  // let {user} = useSelector( (state) => state.profile );
  // console.log('user in dropdown--', user);
  let token = localStorage.getItem('token');
  token = token.replace(/"/g, '');

  useEffect(() => {
    // if (token && !user){
      getAllUserDetails();
    // }
  },[])

  const getAllUserDetails = async () => {
    const response = await apiConnector("POST", profileEndpoints.GET_USER_DETAILS_API, {token})
    
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    // console.log('got the response', response.data.userDetails);
    setToken(response.data.userDetails);
    console.log('got the user', user);
  }

  // var token = localStorage.getItem('token');
  // const user = localStorage.getItem("user");

  // const user = apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API,{token})
  
  // const { user } = useSelector((state) => state.profile);
  // console.log('token in dropdown', token);


  // console.log('user in profile dropdown-',user);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout(navigate));
  }
  
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className='group flex gap-3 p-2 items-center text-white'>
        <img src={user?.image}  
          alt={`profile-${user?.firstName}`}
        className=' aspect-square w-8 h-8 rounded-full relative'/>
        <span className=' group ' onClick={() => setIsOpen(!isOpen)}>
          <GoChevronDown />
        </span>

        <div className={`bg-richblack-700 z-20 p-1 relative top-[62px] right-[40%] flex flex-col max-w-maxContent rounded-lg ${isOpen ? 'scale-100' :'scale-0'} group-hover:scale-100`}>

          <Link to='/dashboard'>
          <div className=' px-2 py-1 rounded-md flex gap-2 items-center hover:bg-richblack-600'>
            <MdOutlineSpaceDashboard />
            <p>Dashboard</p>
          </div>
          </Link>

          <button onClick={logoutHandler} className=' flex gap-2 items-center px-2 py-1 rounded-md hover:bg-richblack-600'>
            <IoLogOutOutline />
            <p>Logout</p>
          </button>
        </div>
    </div>
  )
}

export default ProfileDropdown