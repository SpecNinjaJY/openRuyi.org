import { Col, Row } from 'antd'
import './index.css'
import { useLanguage } from '../../contexts/languageContext';

const DropMenu = () =>{
     const { t } = useLanguage();
    return <div className='flex justify-around px-2'>

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
     
    </div>
}

export default DropMenu