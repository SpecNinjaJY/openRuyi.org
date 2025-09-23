import { useNavigate } from 'react-router-dom';
import '@/components/index.css'

const NewItem = (props) =>{
    const {title,url,desc,date,type,id} = props
      const navigate = useNavigate(); // 路由导航
    return (
        <div className="flex lg:mt-8 lg:w-[48%] w-full cursor-pointer p-4 rounded-md" onClick={()=>navigate(`/newsdetail/news-${id+1}`,{state:{fromHome:true}})}>
            <div className="sm:w-2/3 w-full flex flex-col justify-between group">
                <div className="text-[#333] text-[16px] two-line-ellipsis group-hover:text-[#0062ff]">
                    {title}
                </div>
                 <div className="text-[#666] sm:text-[14px] text-[12px] mt-1 mb-3 w-full two-line-ellipsis group-hover:text-[#61a0ff]">
                    {desc}
                </div>
                <div className="text-[#666] text-[12px] group-hover:text-[#61a0ff]">
                    {date}
                </div>
            </div>
            <div className="relative w-1/3 ml-3 hidden sm:block" >
                <div className="bg-[#0062ff] text-white absolute top-0 right-0 py-1 px-2 rounded-tr-md rounded-bl-md">{type}</div>
                <img src={url} className="w-full h-[116px] rounded-lg" />
            </div>
        </div>
    )
}

export default NewItem