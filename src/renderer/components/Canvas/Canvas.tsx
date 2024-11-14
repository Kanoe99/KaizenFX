import React, { useRef } from 'react';
import { Stage, Layer, Image, } from 'react-konva';
import { useEffect } from 'react';

import { CanvasProps, DimensionsProps } from '../../interfaces/ui';
import {TextField} from './TextField';
import { Transformer } from 'react-konva';


const Canvas: React.FC<CanvasProps> = (props) => {
  const { cardText, imageSrc, stageRef, xPos, yPos, scale, image, dimensions, dispatch, initialScale, isSelected, selectedId, textRef, trRef } = props;

  const imageId = crypto.randomUUID(); 

  //TODO: useContext to avoid prop drilling

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch({type: 'set_selectedId', selectedId: null})
    }
  };

  useEffect(() => {
    if (isSelected && textRef?.current && trRef?.current) {
      // Cast trRef.current as Transformer to ensure TypeScript recognizes the nodes method
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  //TODO: make Text's text on change of textarea to be changed as well

  const stageKey = `${imageSrc}-${xPos}-${yPos}-${cardText}`;

  return (
    <Stage
      key={stageKey}
      width={dimensions.width}
      height={dimensions.height}
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
            dispatch({type: 'set_position', position: {xPos: newX, yPos: newY}});
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = 'default');
          }}
          onWheel={(e) => {
            e.evt.preventDefault();
            
            if (e.evt.ctrlKey ) {
              const scaleAmount = e.evt.deltaY > 0 ? 0.95 : 1.05;
              const value = Math.max(0.1, (scale ?? initialScale ?? 1) * scaleAmount);
              dispatch({type: 'set_scale', scale: value});           
            }
          }}
        />
      <TextField textRef={textRef} text={cardText} checkDeselect={checkDeselect} dispatch={dispatch} selectedId={selectedId}/>
      </Layer>
    </Stage>
  );
};

export { Canvas };