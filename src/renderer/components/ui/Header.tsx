import { Button } from './Button';
import { HeaderProps } from '../../interfaces/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faHandPeace, faImage, faTrashCan } from '@fortawesome/free-solid-svg-icons';
const Header: React.FC<HeaderProps> = ({
  handleFileChange,
  handleSave,
  handleDelete,
  // handlePrint,
  handleResetPos,
  handleResetScale,
}) => {
  return (
    <header className="w-full px-0 py-0 text-lg font-extrabold">
      {/* <Button onClick={handlePrint}>Печать</Button> */}
      <div className="flex flex-col justify-between w-fit h-full absolute z-0 top-0 pt-[3rem]">
        <div className='flex flex-col'>
          <Button>
            <label htmlFor="picker" className="cursor-pointer">
              <FontAwesomeIcon icon={faImage} />
            </label>
            <input
              id="picker"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          <Button onClick={handleSave}>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
          <Button onClick={() => {
            handleResetPos();
            handleResetScale();
          }}>
            <FontAwesomeIcon icon={faHandPeace} />
          </Button>
        </div>
        <Button onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
    </header>
  );
};
export { Header };