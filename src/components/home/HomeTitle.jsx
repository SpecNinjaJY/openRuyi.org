import retg from '@/assets/home/Rectangle.svg'

const HomeTitle = (props)=>{
    const {title1,title2} = props;
    return (<div className='flex items-baseline mb-6'>
        <span className="lg:text-[36px] text-[24px] text-black mr-3 font-semibold">{title1}</span>
        <img src={retg} className='relative top-[3px] hidden sm:inline-block'/>
        <span className="text-[14px] text-[#666] hidden sm:inline-block ml-3">{title2}</span>
    </div>)
}
export default HomeTitle