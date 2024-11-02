import { TileProps } from "../../interfaces/ui";

  const Tile: React.FC<TileProps> = ({
    type,
    isPicked,
    handleClick,
    styles,
  }) => {
    const handleClickPD = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleClick();
    }
    return (
      <button
        className={`${isPicked ? 'shadow-inner-md hover:shadow-inner-lg' : 'shadow-md hover:shadow-lg'} px-3 py-5 cursor-pointer text-center transition duration-300 !${styles}`}
        onClick={handleClickPD}
      >
        {type}
      </button>
    );
  };
  export { Tile };