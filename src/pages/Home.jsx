import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/HighlightText";

import CTAButton from "../components/Button";
import banner from '../assets/Images/banner.mp4'
import CodeBlock from "../components/CodeBlock";
import { FaArrowRightLong } from "react-icons/fa6";
import TimeLineSection from "../components/TimeLineSection";
import ExploreMore from "../components/ExploreMore";
import LearningLanguage from "../components/LearningLanguage";
import InstructorSection from "../components/InstructorSection";
import Footer from "../components/Footer";

const Home =  () => {
    return(
        <div className="HOME_PAGE relative mx-auto w-screen min-h-screen flex flex-col bg-richblack-900 ">
            
            {/* SECTION 1 */}
            <div className=" max-w-6xl flex flex-col text-richblack-200 mx-auto">
                <div className=" w-fit mx-auto">
                    <Link to={"/signup"}>
                        <div className=" relative  mx-auto py-3 px-6 flex gap-4 items-center bg-richblack-800 font-normal text-[18px] w-fit rounded-full shadow-btn shadow-richblack-200/40 mt-16
                        hover:scale-95 hover:bg-richblack-900 duration-200 transition-all">
                            <p>Become an Instructor</p>
                            <FaArrowRight size={'12px'}/>
                        </div>
                    </Link>
                </div>

                <div className=" flex justify-center font-semibold text-[40px] text-white mt-8">
                    Empower Your Future With <HighlightText text='_Coding Skills'/>
                </div>

                <div className="  text-center text-lg mx-auto mt-5 w-3/4">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors
                </div>

                <div className=" relative flex gap-7 justify-center mt-8">
                    <CTAButton black={false}>
                        Learn More
                    </CTAButton>
                    <CTAButton black={true}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className=" relative md:mx-20 shadow-solids my-12">
                    <video loop autoPlay muted className="max-w-[100%]">
                        <source type="video/mp4" src={banner} />
                    </video>
                </div>

                <div className=" relative my-28">
                    <CodeBlock 
                        position={"lg: flex-row"} 
                        heading={
                            <div className=" font-semibold text-white">
                                Unlock your <HighlightText text={"coding potential "}/>
                                with our online course
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                btnText: 'Try it Yourself',
                                linkTo: '/signup',
                            }
                        }
                        ctabtn2={
                            {
                                btnText: 'Learn More',
                                linkTo: '/login',
                            }
                        }
                        codeContent={
                            '<!DOCTYPE html> \n <html> \n <head><title>Example</\n<title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two\n</a><a href="three/">Three</a>\n</nav>'}
                        codeColor={"text-yellow-25"}
                    />
                </div>

                <div className=" relative my-[90px]">
                    <CodeBlock 
                        position={"lg:flex-row-reverse"} 
                        heading={
                            <div className=" font-semibold text-white">
                                Start <HighlightText text={"coding in seconds "}/>
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btnText: 'Continue Lesson',
                                linkTo: '/signup',
                            }
                        }
                        ctabtn2={
                            {
                                btnText: 'Learn More',
                                linkTo: '/login',
                            }
                        }
                        codeContent={
                            '<!DOCTYPE html> \n <html> \n <head><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two\n</a><a href="three/">Three</a>\n</nav>'}
                        codeColor={"text-yellow-25"}
                        bgGradient={'#12D8FA'}
                    />
                </div>

                <ExploreMore />
            </div>

            {/* Section 2 */}
            <div className=' relative flex flex-col justify-center bg-pure-greys-5 text-richblack-700 font-inter'>
                <div className='homepage_bg flex items-center h-[310px]'>
                    <div className='relative w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>
                        <div className=' relative flex gap-7 mx-auto'>
                            <CTAButton black={false}>
                                <div className=" flex items-center gap-2 font-bold">{'Explore Full Catalog'}{<FaArrowRightLong size={'14px'} />}</div>
                            </CTAButton>

                            <CTAButton black={true}>
                                <div className=" flex items-center gap-2">{'Learn More'}</div>
                            </CTAButton>
                        </div>  
                    </div>
                </div>

                <div className=' relative w-10/12 mx-auto flex justify-between gap-16 my-[100px]'>
                    <div className=' relative text-4xl font-semibold text-richblack-900'>
                        Get the skills you need for a <HighlightText light={true} text={'job that is in demand '}/>
                    </div>
                    <div className=' relative flex flex-col justify-between font-semibold text-richblack-500 text-[16px] gap-12'>
                        <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <CTAButton><p className='font-bold'>Learn More</p></CTAButton>
                    </div>
                </div>

                

                <TimeLineSection />

                <LearningLanguage />
            </div>


            {/*Section 3 */}
            <div className='w-11/12 flex mx-auto max-w-maxContent pb-20 flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>

                <InstructorSection />

                <h2 className='relative text-center text-4xl font-semibold mt-10'>review from Other Learners</h2>
                {/* Review Slider here */}
            </div>


            {/* Footer */}

            <Footer />
        </div>
    )
}

export default Home;