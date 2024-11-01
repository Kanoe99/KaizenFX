import { Frame } from './Frame';
import { Card } from './Card';
interface MenuProps {
  formats: string[];
  cards: string[];
  handleIsPickedFormat: (format: string) => void;
  handleIsPickedCel: (card: string) => void;
  isPickedCel: string | null;
  isPickedFormat: string | null;
}
const Menu: React.FC<MenuProps> = ({
  formats,
  cards,
  isPickedCel,
  isPickedFormat,
  handleIsPickedFormat,
  handleIsPickedCel,
}) => {
  return (
    <div className="h-fit flex flex-1 flex-col gap-10 text-lg font-medium shadow px-10 py-5">
      <h2 className="border-b px-2">Выберите формат</h2>
      <div className="flex justify-start gap-10">
        {formats.map((format) => (
          <Frame
            key={format}
            type={format}
            isPicked={format === isPickedFormat}
            handleClick={() => handleIsPickedFormat(format)} // Pass the format
          />
        ))}
      </div>
      <h2 className="border-b px-2">Выберите поздравление</h2>
      <div className="flex justify-start gap-10">
        {cards.map((card) => (
          <Card
            styles="text-sm"
            key={card}
            type={card}
            isPicked={card === isPickedCel}
            handleClick={() => handleIsPickedCel(card)} // Pass the card
          />
        ))}
      </div>
    </div>
  );
};
export { Menu };