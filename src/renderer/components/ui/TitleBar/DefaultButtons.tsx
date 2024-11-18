import { ReactNode } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faWindowRestore, faXmark, faExpand } from '@fortawesome/free-solid-svg-icons';

interface TitleButtonProps {
    children: ReactNode;
    className?: string;
    id: string;
    onClick: () => void;
}

interface DefaultButtonsProps{
    handleMin: () => void;
    handleRestore: () => void;
    handleMax: () => void;
    handleClose: () => void;
    isMaximized: boolean;
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

const DefaultButtons = ({handleMin, handleRestore, handleMax, handleClose, isMaximized} : DefaultButtonsProps) =>{
    return (
    <div className="flex flex-1 justify-end">
      <TitleButton id="min" onClick={handleMin}> 
        <FontAwesomeIcon icon={faWindowMinimize} className='w-4 h-4 text-white'/>
      </TitleButton>
      {isMaximized ? (
        <TitleButton id="max" onClick={handleRestore}>
          <FontAwesomeIcon icon={faWindowRestore} />
        </TitleButton>
      ) : (
        <TitleButton id="max" onClick={handleMax}>
          <FontAwesomeIcon icon={faExpand} />
        </TitleButton>
      )}
      <TitleButton id="close" onClick={handleClose} className={"hover:!bg-red-500"}>
        <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
      </TitleButton>
     </div>)
}

  export {DefaultButtons};