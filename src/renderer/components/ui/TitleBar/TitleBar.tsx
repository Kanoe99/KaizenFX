import { useEffect, useState} from 'react';
import "../../../style.css";

import {DefaultButtons} from './DefaultButtons';
import {TitleBarProps} from '../../../interfaces/ui'
import { DropDownButton } from '../DropDownButton';


const TitleBar = ({...props}: TitleBarProps) => {
  const {handleFileChange, handleSave, handleResetPos, handleResetScale, handleDelete} = props;
  const [isMaximized, setIsMaximized] = useState(false);


  useEffect(() => {
    const fetchIsMaximized = async () => {
      const result = await window.electron.window.isMaximized();
      setIsMaximized(result);
    };

    fetchIsMaximized();

    const handleWindowMaximized = (event: CustomEvent<boolean>) => {
      setIsMaximized(event.detail);
    };

    // Add custom event listener
    const listener = handleWindowMaximized as EventListener;
    window.addEventListener('windowMaximized', listener);

    return () => {
      window.removeEventListener('windowMaximized', listener);
    };
  }, []); // Runs on component mount

  const handleMin = () => {
    window.electron.window.minimize();
  };
  const handleMax = () => {
    window.electron.window.maximize();
    setIsMaximized(true);
  };
  const handleClose = () => {
    window.electron.window.close();
  };
  const handleRestore = () => {
    window.electron.window.restore();
    setIsMaximized(false);
  };

  const imgSrc = 'http://localhost:8080/icon.png';
  
  return (
    <div className="flex h-fit draggable-region align-center bg-gradient-to-r from-purple-500 from-80% to-purple-600 to-90%">
      <img src={imgSrc} alt="Logo" className='h-[2.5rem] non-draggable px-2 py-0'/>
      <h1 className='grid place-items-center font-bold'>Редактор Открыток</h1>
      
      <div className='relative group ml-3'>        
        <DropDownButton className='group non-draggable font-bold text-xl'>Картинка</DropDownButton>          
        <div className="hidden group-hover:flex flex-col text-nowrap absolute">
            <DropDownButton className='!px-0 !py-0 text-xl font-bold'> 
            <label htmlFor="picker" className="cursor-pointer block px-3 py-2 h-full w-full">
              Выбрать
            </label>
            <input
              id="picker"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            </DropDownButton>
            <DropDownButton onClick={handleSave}>Сохранить</DropDownButton>
            <DropDownButton onClick={handleDelete}>Удалить</DropDownButton>
            <DropDownButton onClick={handleResetPos}>Сбросить позицию картинки</DropDownButton>
            <DropDownButton onClick={handleResetScale}>Вернуть исходный размер картинки</DropDownButton>
        </div>
      </div>   
    <DefaultButtons handleClose={handleClose} handleMax={handleMax} handleMin={handleMin} handleRestore={handleRestore} isMaximized={isMaximized} />
    </div>
  );
};

export { TitleBar };
