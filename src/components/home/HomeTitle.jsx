import retg from '@/assets/home/Rectangle.svg'

const HomeTitle = (props)=>{
    const {title1,title2} = props;
    return (<div className='flex items-baseline mb-6'>
        <span className="text-[36px] text-black mr-3 font-semibold">{title1}</span>
        <img src={retg} className='relative top-[3px]'/>
         <span className="text-[14px] text-[#666] ml-3">{title2}</span>
    </div>)
}
export default HomeTitle