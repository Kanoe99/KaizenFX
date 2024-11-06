import type { Stage } from 'konva/lib/Stage';

interface DownloadProps {
  uri: string | undefined;
  fileName: string | undefined;
  stageRef: React.RefObject<Stage> | undefined;
}

interface PickedProps {
  isPickedItem: string | null;
  item: string;
}

interface CanvasProps {
  cardText?: string | null;
  imageSrc: string | null | undefined;
  stageRef: React.RefObject<Stage> | undefined;
  xPos: number;
  yPos: number;
  setPosition:({xPos, yPos} : {xPos: number, yPos: number}) => void;
}

interface ImageProps {
  width: number;
  height: number;
}

interface ElectronProps {
  key: string;
  value: string;
}

interface MenuProps {
  formats: ElectronProps[];
  cards: ElectronProps[];
  handleIsPickedFormat: (item: string) => void;
  handleIsPickedCard: (item: string) => void;
  isPickedCard: string | null;
  isPickedFormat: string | null;
}

export { DownloadProps, PickedProps, CanvasProps, ImageProps, ElectronProps, MenuProps };