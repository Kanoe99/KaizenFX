import type { Stage } from 'konva/lib/Stage';
import React from 'react';

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

export { DownloadProps, PickedProps, CanvasProps, ImageProps, ElectronProps, MenuProps };
