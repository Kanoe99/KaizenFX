import { Button } from './Button';
import { HeaderProps } from '../../interfaces/ui';
const Header: React.FC<HeaderProps> = ({
  handleFileChange,
  handleSave,
  handleDelete,
  handlePrint,
  handleResetPos,
  handleResetScale,
}) => {
  return (
    <header className="flex justify-between w-full px-14 py-5 text-lg font-extrabold">
      {/* <Button onClick={handlePrint}>Печать</Button> */}
      <div className="flex gap-10">
        <Button>
          <label htmlFor="picker" className="cursor-pointer">
            Выбрать
          </label>
          <input
            id="picker"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        <Button onClick={handleSave}>Сохранить</Button>
        <Button onClick={handleDelete}>Удалить</Button>
        <Button onClick={handleResetPos}>Сбросить позицию картинки</Button>
        <Button onClick={handleResetScale}>Вернуть исходный размер картинки</Button>
      </div>
    </header>
  );
};
export { Header };