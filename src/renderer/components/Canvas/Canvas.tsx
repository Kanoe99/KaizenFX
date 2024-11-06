import React from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import { useEffect, useState } from 'react';

import { CanvasProps, ImageProps } from '../../interfaces/ui';

const Canvas: React.FC<CanvasProps> = ({ cardText, imageSrc, stageRef, xPos, yPos, setPosition }) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  const [aspectRatio, setAspectRatio] = useState<ImageProps>({
    width: 550,
    height: 550 * 1.414,
  });
  const initialScale = image && aspectRatio.width / image.naturalWidth;

  const [scale, setScale] = useState<number>();

  const imageId = crypto.randomUUID();

  useEffect(() => {
    const img = new window.Image();
    if (imageSrc) {
      img.src = imageSrc;
      img.onload = () => {
        setImage(img);
      };
    }

  }, [imageSrc, xPos, yPos, initialScale]);

  useEffect(()=>{
     setScale(initialScale)
  }, [initialScale])

  const stageKey = `${imageSrc}-${xPos}-${yPos}`;

  console.log('xPos: ' + xPos + ' yPos: ' + yPos);

  return (
    <Stage
      key={stageKey}
      width={aspectRatio.width}
      height={aspectRatio.height}
      className="bg-green-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-8"
      ref={stageRef}
    >
      <Layer>
        <Text text={cardText !== null ? cardText : undefined} fill={'white'} draggable={true}/>

        <Image
          x={xPos}
          y={yPos}
          scaleX={scale}
          scaleY={scale}
          id={imageId}
          image={image}
          draggable={true}
          onMouseEnter={(e) => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = 'grab');
            e.target.moveToBottom();
          }}
          onPointerDown={(e) => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = 'grabbing');
          }}
          onPointerUp={(e) => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = 'grab');
          }}
          onDragEnd={(e) => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = 'grab');

            const newX = e.target.x();
            const newY = e.target.y();
            setPosition({ xPos: newX, yPos: newY });
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = 'default');
          }}
          onWheel={(e) => {
            e.evt.preventDefault(); // Prevent default scrolling behavior

            if (e.evt.ctrlKey) {
              // Check if Ctrl key is pressed
              const scaleAmount = e.evt.deltaY > 0 ? 0.95 : 1.05;
              setScale((prevScale) => prevScale && Math.max(0.1, prevScale * scaleAmount));
            }
          }}
        />
      </Layer>
    </Stage>
  );
};

export { Canvas };