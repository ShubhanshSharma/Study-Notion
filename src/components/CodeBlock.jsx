import './CodeBlock.css';
import CTAButton from './Button';
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";


const CodeBlock = ({
    position, heading , subheading, ctabtn1, ctabtn2, bgGradient, codeContent, codeColor
}) => {

    return(
        <div className={`gap-20 flex ${position}`}>

            {/* Info Block */}
            <div className=" w-1/2 flex flex-col">
                <div className=" flex font-bold text-[40px] leading-[48px] mb-4">
                    {heading}
                </div>
                <div className=" max-w-3xl mx-auto text-[18px]">
                    {subheading}    
                </div>

                <div className=" absolute flex gap-7 bottom-0">
                    <CTAButton black={false} linkTo={ctabtn1.linkTo}>
                        <div className=" flex items-center gap-2">{ctabtn1.btnText}{<FaArrowRightLong />}</div>
                    </CTAButton>
                    <CTAButton black={true} linkTo={ctabtn2.linkTo}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* Code block */}
            <div className=" h-fit py-2 w-1/2 flex bg-gradient-to-r from-[#0E1A2D3D] to-[#111E3261] custom-border-gradient">
                <div className=" flex flex-col w-[10%] text-richblack-500  font-bold font-inter items-center">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={` w-[90%] flex flex-col z-10 font-mono leading-6 `}>
                    <TypeAnimation style={{ whiteSpace: 'pre-line', display: 'block', }}
                        sequence={[codeContent,1000,""]}
                        repeat={Infinity}
                        omitDeletionAnimation 
                        speed={70}
                    />
                </div>
            </div>
            {/* bg circle */}
            <div className={`absolute z-0 ${bgGradient=='#12D8FA'? 'left-[35%] shadow-[#12d7fa2f]': 'right-[35%] shadow-[#ffa60062]' }  shadow-blur top-11 rounded-full`}></div>
        </div>
    )
}

export default CodeBlock;