import type { Stage } from 'konva/lib/Stage';
import React, {ButtonHTMLAttributes} from 'react';
import { Action } from '../utils/reducer';
import { Text } from 'konva/lib/shapes/Text';
import { Transformer } from 'konva/lib/shapes/Transformer';

interface DownloadProps {
  uri: string | undefined;
  fileName: string | undefined;
  stageRef: React.RefObject<Stage>;
  textRef: React.RefObject<Text>;
  trRef: React.RefObject<Transformer>;
}

interface PickedProps {
  isPickedItem: string | null;
  item: string;
}

interface CanvasProps {
  cardText: string | null;
  imageSrc: string | null | undefined;
  stageRef: React.RefObject<Stage>;
  textRef: React.RefObject<Text>;
  trRef: React.RefObject<Transformer>;
  xPos: number;
  yPos: number;
  scale: number | undefined;
  dimensions: DimensionsProps;
  image: HTMLImageElement | undefined;
  dispatch: React.Dispatch<Action>;
  initialScale: number | undefined;
  isSelected: boolean;
  selectedId: string | null;
}

interface DimensionsProps {
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
interface RectangleProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (...props: any) => void;
  text?: string | null;
}

interface TextFieldProps{
  checkDeselect: (e:any) => void;
  dispatch: React.Dispatch<Action>;
  selectedId: string | null;
  text: string | null;
  textRef: React.RefObject<Text>;
  trRef: React.RefObject<Transformer>;
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface FrameProps {
  type: string;
  isPicked: boolean;
  handleClick: () => void;
}
interface HeaderProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleDelete: () => void;
  handlePrint: () => void;
  handleResetPos: () => void;
  handleResetScale: () => void;
}
interface PictureProps {
  imageSrc: string | null;
  card: string | null;
  dispatch: React.Dispatch<Action>;
  position: PositionProps
  isDragging: boolean;
}

interface PositionProps{
  xPos: number,
  yPos: number
}

export { DownloadProps, PickedProps, CanvasProps, DimensionsProps, ElectronProps, MenuProps, RectangleProps, TextFieldProps, ButtonProps, FrameProps, HeaderProps, PictureProps, PositionProps };
