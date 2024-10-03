import { Link } from "react-router-dom"


const Button = ({children, black, linkTo}) => {

    return(
        
        <Link to={linkTo}>
            <div className={` w-fit px-5 py-2 rounded-lg hover:scale-105 transition-all duration-200 text-richblack-200 font-semibold 
                ${black? "bg-richblack-800 text-white": "bg-yellow-50 text-black"}`}>
                {children}
            </div>
        </Link>
    )
}

export default Button;