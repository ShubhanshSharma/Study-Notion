import logo1 from '../assets/TimeLineLogo/Logo1.svg';
import logo2 from '../assets/TimeLineLogo/Logo2.svg';
import logo3 from '../assets/TimeLineLogo/Logo3.svg';
import logo4 from '../assets/TimeLineLogo/Logo4.svg';
import BgCircle from './BgCircle';

const TimeLineSection = () => {
  return (
    <div className=' relative w-10/12 max-h-max mx-auto flex justify-between gap-16 font-inter'>

        
            <div className='h-full flex flex-col justify-between gap-14 self-center'>
                <div className='relative flex justify-between gap-7'>
                    <div className=' h-16 w-16 rounded-full bg-white items-center justify-center flex'>
                        <img src={logo1} />
                    </div>
                    <div className='relative flex flex-col h-8'>
                        <h3 className=' font-inter font-bold text-xl'>Leadership</h3>
                        <p className=' text-[16px]'>Fully committed to the success company</p>
                    </div>

                </div>
                <div className='relative flex justify-between gap-7'>
                    <div className=' h-16 w-16 rounded-full bg-white items-center justify-center flex'>
                        <img src={logo2} />
                    </div>
                    <div className='relative flex flex-col h-8'>
                        <h3 className=' font-inter font-bold text-xl'>Leadership</h3>
                        <p className=' text-[16px]'>Fully committed to the success company</p>
                    </div>

                </div>
                <div className='relative flex justify-between gap-7'>
                    <div className=' h-16 w-16 rounded-full bg-white items-center justify-center flex'>
                        <img src={logo3} />
                    </div>
                    <div className='relative flex flex-col h-8'>
                        <h3 className=' font-inter font-bold text-xl'>Leadership</h3>
                        <p className=' text-[16px]'>Fully committed to the success company</p>
                    </div>

                </div>
                <div className='relative flex justify-between gap-7'>
                    <div className=' h-16 w-16 rounded-full bg-white items-center justify-center flex'>
                        <img src={logo4} />
                    </div>
                    <div className='relative flex flex-col h-8'>
                        <h3 className=' font-inter font-bold text-xl'>Leadership</h3>
                        <p className=' text-[16px]'>Fully committed to the success company</p>
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