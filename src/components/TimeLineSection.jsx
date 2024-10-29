import logo1 from '../assets/TimeLineLogo/Logo1.svg';
import logo2 from '../assets/TimeLineLogo/Logo2.svg';
import logo3 from '../assets/TimeLineLogo/Logo3.svg';
import logo4 from '../assets/TimeLineLogo/Logo4.svg';
import BgCircle from './BgCircle';

const TimeLineSection = () => {
  return (
    <div className=' relative w-10/12 max-h-max mx-auto flex justify-between gap-16 font-inter bg-[#F9F9F9]'>

    
        <div className='h-full flex flex-col justify-between gap-14 self-center'>
            <div className='relative flex  gap-7'>
                <div className='relative h-16 w-16 rounded-full bg-white items-center justify-center flex'>
                    <img width={'16px'} src={logo1} className=' w-[20px] h-[20px]'/>
                </div>
                <div className='relative flex flex-col h-8'>
                    <h3 className=' font-inter font-bold text-xl'>Leadership</h3>
                    <p className=' text-[16px]'>Fully committed to the success company</p>
                </div>

            </div>
            <div className='relative flex gap-7'>
                <div className='relative h-16 w-16 rounded-full bg-white items-center justify-center flex'>
                    <img width={'24px'} src={logo2} />
                </div>
                <div className='relative flex flex-col h-8'>
                    <h3 className=' font-inter font-bold text-xl'>Responsibility</h3>
                    <p className=' text-[16px]'>Students will always be our top priority</p>
                </div>

            </div>
            <div className='relative flex  gap-7'>
                <div className='relative h-16 w-16 rounded-full bg-white items-center justify-center flex'>
                    <img  width={'24px'} src={logo3} />
                </div>
                <div className='relative flex flex-col h-8'>
                    <h3 className=' font-inter font-bold text-xl'>Flexibility</h3>
                    <p className=' text-[16px]'>Ability to switch is an important skill</p>
                </div>

            </div>
            <div className='relative flex  gap-7'>
                <div className='relative h-16 w-16 rounded-full bg-white items-center justify-center flex'>
                    <img  width={'20px'} src={logo4} />
                </div>
                <div className='relative flex flex-col h-8'>
                    <h3 className=' font-inter font-bold text-xl'>Solve the Problem</h3>
                    <p className=' text-[16px]'>Code your way to solution</p>
                </div>

            </div>
        </div>

        <div className=' min-h-fit relative w-[714px]  shadow-solid'>
            <img src={require('../assets/Images/TimelineImage.png')} className='relative z-40 ' />
        </div>

        
        <div className='absolute right-[30%] top-[56%] scale-x-[2.8]'>
            <BgCircle color={'#65C7F7'} />
        </div>
        
    </div>
  )
};

export default TimeLineSection;