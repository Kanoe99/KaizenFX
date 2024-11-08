import React from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import { useEffect, useState } from 'react';

import { CanvasProps, ImageProps } from '../../interfaces/ui';

const Canvas: React.FC<CanvasProps> = ({ cardText, imageSrc, stageRef, xPos, yPos, setPosition, scale, image, aspectRatio, setScale }) => {

  const imageId = crypto.randomUUID();

  const stageKey = `${imageSrc}-${xPos}-${yPos}`;

  return (
    <Stage
      key={stageKey}
      width={aspectRatio.width}
      height={aspectRatio.height}
      className="bg-green-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-8"
      ref={stageRef}
    >
      <Layer>
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
            e.evt.preventDefault();
            
            if (e.evt.ctrlKey ) {
              const scaleAmount = e.evt.deltaY > 0 ? 0.95 : 1.05;
              setScale((prevScale: number) => prevScale && Math.max(0.1, prevScale * scaleAmount));             
            }
          }}
        />
        
        <Text text={cardText !== null ? cardText : undefined} fill={'white'} draggable={true}/>
      </Layer>
    </Stage>
  );
};

export { Canvas };