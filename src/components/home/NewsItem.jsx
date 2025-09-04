import '../index.css'

const NewItem = (props) =>{
    const {title,url,desc,date,type} = props
    return (
        <div className="flex mt-8 w-[48%] cursor-pointer hover:shadow-md p-4 rounded-md">
            <div className="w-2/3 flex flex-col justify-between group">
                <div className="text-[#333] text-[16px] two-line-ellipsis group-hover:text-[#0062ff]">
                    {title}
                </div>
                 <div className="text-[#666] text-[14px] mt-1 mb-3 w-full two-line-ellipsis group-hover:text-[#61a0ff]">
                    {desc}
                </div>
                <div className="text-[#666] text-[12px] group-hover:text-[#61a0ff]">
                    {date}
                </div>
            </div>
            <div className="relative w-1/3 ml-3">
                <div className="bg-[#0062ff] text-white absolute top-0 right-0 py-1 px-2 rounded-tr-md rounded-bl-md">{type}</div>
                <img src={url} className="w-full h-[116px] rounded-lg" />
            </div>
        </div>
    )
}

export default NewItem