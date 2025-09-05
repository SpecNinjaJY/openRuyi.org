import { Col, Divider, Row } from 'antd'
import './index.css'
import { useLanguage } from '../../contexts/languageContext';

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
     
    </div>:<div className='flex justify-around px-10'>
        <div className='w-1/3 flex flex-col'>
            <span className="drop-title">{'协作平台'}</span>
            <div className='text-[#666] text-[16px] flex flex-col justify-start'>
                <a className='h-10'>{'如意构建平台-RuyiBuild'}</a>
                <a className='h-10'>{'如意测试测评平台-RuyiAVA'}</a>
                <a className='h-10'>{'如意CI平台-RuyiCI'}</a>
                <a className='h-10'>{'如意迁移平台-RuyiPort'}</a>
            </div>
        </div>
    
        <div className='w-2/3 flex flex-col'>
            <span className="drop-title">{'工作组'}</span>
            <div className='flex gap-8 text-[#666] text-[16px] justify-start'>
                <a className='h-10'>{'内核'}</a>
                <a className='h-10'>{'语言运行时'}</a>
                <a className='h-10'>{'高性能'}</a>
                <a className='h-10'>{'数据中心'}</a>
            </div>
             <div className='flex gap-8 text-[#666] text-[16px] justify-start'>
                <a className='h-10'>{'工具链'}</a>
                <a className='h-10'>{'固件'}</a>
                <a className='h-10'>{'人工智能'}</a>
                <a className='h-10'>{'操作系统发行版'}</a>
            </div>
             <div className='flex gap-8 text-[#666] text-[16px] justify-start'>
                <a className='h-10'>{'编译器'}</a>
                <a className='h-10'>{'模拟与仿真'}</a>
                <a className='h-10'>{'存储与大数据'}</a>
                <a className='h-10'>{'基础设施'}</a>
            </div>
             <div className='flex gap-8 text-[#666] text-[16px] justify-start'>
                <a className='h-10'>{'系统库'}</a>
                <a className='h-10'>{'调试与测评'}</a>
                <a className='h-10'>{'云计算'}</a>
                <a className='h-10'>{t('more')}</a>
            </div>
        </div>
    </div>
}

export default DropMenu