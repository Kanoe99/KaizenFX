import { Tile } from './Tile';
interface MenuProps {
  formats: string[];
  cards: string[];
  handleIsPickedFormat: (item: string) => void;
  handleIsPickedCard: (item: string) => void;
  isPickedCard: string | null;
  isPickedFormat: string | null;
}
const Menu: React.FC<MenuProps> = ({
  formats,
  cards,
  isPickedCard,
  isPickedFormat,
  handleIsPickedFormat,
  handleIsPickedCard,
}) => {
  return (
    <div className="h-fit flex flex-1 flex-col gap-10 text-lg font-medium shadow px-10 py-5">
      <h2 className="border-b px-2">Выберите формат</h2>
      <div className="flex justify-start gap-10">
        {formats.map((format) => (
          <Tile
            key={format}
            type={format}
            isPicked={format === isPickedFormat}
            handleClick={() => handleIsPickedFormat(format)}
          />
        ))}
      </div>
      <h2 className="border-b px-2">Выберите поздравление</h2>
      <div className="flex justify-start gap-10">
        {cards.map((card) => (
          <Tile
            styles="text-sm"
            key={card}
            type={card}
            isPicked={card === isPickedCard}
            handleClick={() => handleIsPickedCard(card)}
          />
        ))}
      </div>
    </div>
  );
};
export { Menu };