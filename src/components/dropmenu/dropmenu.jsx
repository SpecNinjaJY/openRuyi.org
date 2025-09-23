import { Col, Divider, Row } from 'antd'
import './index.css'
import { useLanguage } from '@/contexts/languageContext.jsx';

const DropMenu = (props) =>{
    const { activeKey } = props
     const { t } = useLanguage();
    return activeKey == 'project'? <div className='flex justify-around px-2'>

            <div className='w-1/6 '>
                <span className="drop-title">{'openRuyiOS'}</span>
                <div className='text-[#666] text-[16px] flex flex-col'>
                    <a className='h-10'>{'Kernel'}</a>
                    <a className='h-10'>{t('more')}</a>
                </div>
            </div>
            <div className='w-1/6'>
                <span className="drop-title">{'RuyiSDK'}</span>
                <div className='text-[#666] text-[16px] flex flex-col justify-start'>
                    <a className='h-10'>{'ruyi-packaging'}</a>
                    <a className='h-10'>{'packages-index'}</a>
                    <a className='h-10'>{'support-matrix'}</a>
                    <a className='h-10'>{t('more')}</a>
                </div>
            </div>
            <div className='w-1/6 '>
                 <span className="drop-title">{'Kernel'}</span>
                 <div className='text-[#666] text-[16px] flex flex-col justify-start'>
                    <a className='h-10'>{'rvck'}</a>
                    <a className='h-10'>{'rvck-olk'}</a>
                    <a className='h-10'>{'lavaci'}</a>
                    <a className='h-10'>{t('more')}</a>
                </div>
            </div>
            <div className='w-1/6'>
                <span className="drop-title">{'Compiler'}</span>
                <div className='text-[#666] text-[16px] flex flex-col justify-start'>
                    <a className='h-10'>{'riscv-gcc'}</a>
                    <a className='h-10'>{'riscv-llvm'}</a>
                  
                    <a className='h-10'>{t('more')}</a>
                </div>
            </div>
            <div className='w-1/6'>
                 <span className="drop-title">{'Library'}</span>
                 <div className='text-[#666] text-[16px] flex flex-col justify-start'>
                    <a className='h-10'>{'riscv-glibc'}</a>
                    <a className='h-10'>{t('more')}</a>
                </div>
                 
            </div>
            <div className='w-1/6'>
                 <span className="drop-title">{'Firmware'}</span>
                 <div className='text-[#666] text-[16px] flex flex-col justify-start'>
                    <a className='h-10'>{'ruyisbi'}</a>
                    <a className='h-10'>{t('more')}</a>
                </div>
            </div>
     
    </div>:
    
    activeKey == 'develop'?<div className='flex justify-center'>
        <div className='w-full flex flex-col justify-center items-center '>
                <span className="drop-title lg:text-[28px] text-[24px]">{t('coplatform')}</span>
                <div className='text-[#666] lg:text-[16px] text-[14px] flex justify-start items-center gap-32'>
                    <a onClick={()=>window.open('https://build.openruyi.cn')} className='h-[80px]'>{t('developlist.0')}<br/> {'RuyiBuild'}</a>
                    <a onClick={()=>window.open('https://lava.openruyi.cn')} className='h-[80px]'>{t('developlist.1')}<br/> {'RuyiAVA'}</a>
                    <a className='h-[80px]' onClick={()=>window.open('https://ci.openruyi.cn')}>{t('developlist.2')}<br/> {'RuyiCI'}</a>
                    <a className='h-[80px]' onClick={()=>window.open('https://port.openruyi.cn')}>{t('developlist.3')}<br/>{'RuyiPort'}</a>
                </div>
        </div>
    
        {/* <div className='w-2/3 flex flex-col justify-center '>
            <div>
                <span className="drop-title">{'工作组'}</span>
                <div className='flex gap-2 text-[#666] text-[16px] justify-start'>
                    <a className='items'>{'内核'}</a>
                    <a className='items'>{'语言运行时'}</a>
                    <a className='items'>{'高性能'}</a>
                    <a className='items'>{'数据中心'}</a>
                </div>
                <div className='flex gap-2 text-[#666] text-[16px] justify-start'>
                    <a className='items'>{'工具链'}</a>
                    <a className='items'>{'固件'}</a>
                    <a className='items'>{'人工智能'}</a>
                    <a className='items'>{'操作系统发行版'}</a>
                </div>
                <div className='flex gap-2 text-[#666] text-[16px] justify-start'>
                    <a className='items'>{'编译器'}</a>
                    <a className='items'>{'模拟与仿真'}</a>
                    <a className='items'>{'存储与大数据'}</a>
                    <a className='items'>{'基础设施'}</a>
                </div>
                <div className='flex gap-2 text-[#666] text-[16px] justify-start'>
                    <a className='items'>{'系统库'}</a>
                    <a className='items'>{'调试与测评'}</a>
                    <a className='items'>{'云计算'}</a>
                    <a className='items'>{t('more')}</a>
                </div>
            </div>
           
        </div> */}
    </div>:
    <div  className='flex justify-around '>
         <div className='w-1/3 flex flex-col justify-start '>
            <div>
                <span className="drop-title">{'RISC-V公共技术'}</span>
                <div className='text-[#666] text-[16px] flex flex-col justify-start'>
                    <a className='h-10'>{'xiangshan'}</a>
                    <a className='h-10'>{'xuantie'}</a>
                </div>
            </div>
         </div>
         <div className='w-2/3 flex flex-col justify-start'>
            <div>
                <span className="drop-title">{'解决方案'}</span>
                <div className='flex gap-32'>
                    <div>
                        <span className="text-[#333] text-[20px] font-medium mb-7 inline-block">{'技术解决方案'}</span>
                        <div className='text-[#666] text-[16px] flex flex-col justify-start'>
                            <a className='h-10'>{'高性能计算'}</a>
                            <a className='h-10'>{'虚拟化'}</a>
                            <a className='h-10'>{'人工智能'}</a>
                        </div>
                    </div>
                    <div>
                        <span className="text-[#333] text-[20px] font-medium mb-7 inline-block">{'行业解决方案'}</span>
                        <div className='text-[#666] text-[16px] flex flex-col justify-start'>
                            <a className='h-10'>{'科研&教育'}</a>
                            <a className='h-10'>{'工业'}</a>
                             <a className='h-10'>{'金融'}</a>
                            <a className='h-10'>{'运营商'}</a>
                              <a className='h-10'>{'能源'}</a>
                        </div>
                    </div>
                </div>
               
                
            </div>
         </div>

    </div>
}

export default DropMenu