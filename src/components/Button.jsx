import { Link } from "react-router-dom"


const Button = ({children, black, linkTo}) => {

    return(
        
        <Link to={linkTo}>
            <div className={` w-fit text-[18px] px-7 py-3 rounded-lg hover:scale-105 transition-all duration-200 
                ${black? "bg-richblack-800 text-white shadow-btn shadow-richblack-200/40": "bg-yellow-50 font-medium text-black shadow-btn shadow-yellow-5"}`}>
                {children}
            </div>
        </Link>
    )
}

export default Button;