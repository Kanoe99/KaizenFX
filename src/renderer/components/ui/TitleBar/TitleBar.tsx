import { useEffect, useState } from 'react';
import "../../../style.css";
import logo from '../../../../../assets/icon.png'

import {DefaultButtons} from './DefaultButtons';

const TitleBar = () => {
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
    <div className="flex draggable-region bg-gradient-to-r from-purple-500 from-80% to-purple-600 to-90%">
      <img src={imgSrc} alt="Logo" className='h-[2rem] px-2 py-1'/>
      <h1 className='grid place-items-center font-bold'>Редактор Открыток</h1>
      <DefaultButtons handleClose={handleClose} handleMax={handleMax} handleMin={handleMin} handleRestore={handleRestore} isMaximized={isMaximized} />
    </div>
  );
};

export { TitleBar };
