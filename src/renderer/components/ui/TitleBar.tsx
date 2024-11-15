import { ReactNode, useEffect, useState } from 'react';
import "../../style.css";

interface TitleButtonProps {
  children: ReactNode;
  className?: string;
  id: string;
  onClick: () => void;
}

const TitleButton = ({ children, className, id, onClick }: TitleButtonProps) => {
  return (
    <button
      className={`hover:bg-gray-300 w-20 non-draggable user-select-none cursor-default ${className}`}
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
    <div className="flex justify-end bg-green-500 draggable-region">
      <TitleButton id="min" onClick={handleMin}>
        -
      </TitleButton>
      {isMaximized ? (
        <TitleButton id="max" onClick={handleRestore}>
          [dock]
        </TitleButton>
      ) : (
        <TitleButton id="max" onClick={handleMax}>
          [max]
        </TitleButton>
      )}
      <TitleButton id="close" onClick={handleClose} className={"hover:bg-red-500"}>
        x
      </TitleButton>
    </div>
  );
};

export { TitleBar };
