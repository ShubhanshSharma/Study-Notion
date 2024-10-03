import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/HighlightText";

import CTAButton from "../components/Button";
import banner from '../assets/Images/banner.mp4'

const Home =  () => {
    return(
        <div className="HOME_PAGE relative mx-auto w-screen min-h-screen flex flex-col bg-richblack-900 ">
            
            {/* SECTION 1 */}
            <div className=" max-w-6xl flex flex-col text-richblack-200 mx-auto">
                <Link to={"/signup"}>
                    <div className=" relative mx-auto py-2 px-4 flex gap-2 items-center bg-richblack-800 font-bold w-fit rounded-xl mt-16
                     hover:scale-95 hover:bg-richblack-900 duration-200 transition-all">
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </Link>

                <div className=" flex justify-center font-bold text-5xl my-4">
                    Empower your future with  <HighlightText text="Coding Skills" />
                </div>

                <div className=" max-w-3xl mx-auto">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors
                </div>

                <div className=" relative flex gap-7 justify-center my-5">
                    <CTAButton black={false}>
                        Learn More
                    </CTAButton>
                    <CTAButton black={true}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div>
                    <video loop autoPlay muted>
                        <source type="video/mp4" src={banner} />
                    </video>
                </div>

            </div>
        </div>
    )
}

export default Home;