import type { Stage } from 'konva/lib/Stage';
import React, {ButtonHTMLAttributes} from 'react';

interface DownloadProps {
  uri?: string;
  fileName?: string;
  stageRef?: React.RefObject<Stage>;
}

interface PickedProps {
  isPickedItem: string | null;
  item: string;
}

interface CanvasProps {
  cardText?: string | null;
  imageSrc?: string | null;
  stageRef?: React.RefObject<Stage>;
  xPos: number;
  yPos: number;
  scale: number | undefined;
  aspectRatio: ImageProps;
  image?: HTMLImageElement;
  setPosition: (position: { xPos: number; yPos: number }) => void;
  setScale: (scale: any) => void;
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
interface RectangleProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (...props: any) => void;
  text?: string | null;
}

interface TextFieldProps{
  checkDeselect: (e:any) => void;
  selectShape: (id:string) => void;
  selectedId: string | null;
  text?: string | null;
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
  card?: string | null;
}

export { DownloadProps, PickedProps, CanvasProps, ImageProps, ElectronProps, MenuProps, RectangleProps, TextFieldProps, ButtonProps, FrameProps, HeaderProps, PictureProps };
