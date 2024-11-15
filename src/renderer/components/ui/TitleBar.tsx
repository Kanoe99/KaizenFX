import { ReactNode, useEffect, useState } from 'react';
import "../../style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faWindowRestore, faWindowMaximize, faXmark, faExpand } from '@fortawesome/free-solid-svg-icons';

interface TitleButtonProps {
  children: ReactNode;
  className?: string;
  id: string;
  onClick: () => void;
}

const TitleButton = ({id, children, className, onClick }: TitleButtonProps) => {
  return (
    <button
      className={`hover:bg-white/40 transition p-1 duration-300 w-14 non-draggable user-select-none cursor-default grid place-items-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

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

  console.log(isMaximized ? 'window is max' : 'win is min');

  return (
    <div className="flex justify-end draggable-region bg-gradient-to-r from-purple-500 from-80% to-purple-600 to-90%">
      <TitleButton id="min" onClick={handleMin}> 
        <FontAwesomeIcon icon={faWindowMinimize} className='w-4 h-4 text-white'/>
      </TitleButton>
      {isMaximized ? (
        <TitleButton id="max" onClick={handleRestore}>
          <FontAwesomeIcon icon={faWindowRestore} />
          {/* <FontAwesomeIcon icon={faWindowRestore} className='w-5 h-5 text-blue-500'/> */}
        </TitleButton>
      ) : (
        <TitleButton id="max" onClick={handleMax}>
          <FontAwesomeIcon icon={faExpand} />
          {/* <FontAwesomeIcon icon={faWindowMaximize} className='w-5 h-5 text-green-500'/> */}
        </TitleButton>
      )}
      <TitleButton id="close" onClick={handleClose} className={"hover:!bg-red-500"}>
        <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
      </TitleButton>
    </div>
  );
};

export { TitleBar };
