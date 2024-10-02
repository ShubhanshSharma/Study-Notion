import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";



const Home =  () => {
    return(
        <div className="HOME_PAGE relative mx-auto w-screen min-h-screen flex flex-col bg-richblack-900 ">
            
            {/* SECTION 1 */}
            <div className=" w-11/12 flex flex-col text-richblack-200">
                <Link to={"/signup"}>
                    <div className=" relative mx-auto py-2 px-4 flex gap-2 items-center bg-richblack-800 font-bold w-fit rounded-xl mt-16
                     hover:scale-95 hover:bg-richblack-900 duration-200 transition-all">
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Home;