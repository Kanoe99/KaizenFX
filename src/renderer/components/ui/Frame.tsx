import { FrameProps } from "../../interfaces/ui";

  const Frame: React.FC<FrameProps> = ({ type, isPicked, handleClick }) => {
    return (
      <div
        className={`${isPicked && 'shadow-inner-md hover:shadow-inner-lg'} px-3 py-5 cursor-pointer text-center text-6xl shadow-md transition duration-300 hover:shadow-lg`}
        onClick={() => handleClick()}
      >
        {type}
      </div>
    );
  };
  export { Frame };