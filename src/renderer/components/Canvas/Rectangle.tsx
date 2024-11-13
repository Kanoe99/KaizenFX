import Konva from 'konva';
import { useRef, useEffect } from 'react';
import { Text, Stage, Layer, Rect, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';

import { RectangleProps } from '../../interfaces/ui';
  
  const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, text }: RectangleProps) => {
    const shapeRef = useRef<Konva.Rect>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const textRef = useRef<Konva.Text>(null);
  
    // Calculate the textarea position and dimensions
    const textareaPosition = {
      x: shapeProps.x + 10, // Positioning it inside with padding
      y: shapeProps.y + 10, // Positioning it inside with padding
      width: shapeProps.width - 20, // Adjust width with padding (10px on each side)
      height: shapeProps.height - 20, // Adjust height with padding (10px on each side)
    };
  
    useEffect(() => {
      if (isSelected && trRef.current && shapeRef.current && textRef.current) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer()?.batchDraw();
      }
    }, [isSelected]);
  
  
    return (
      <>
        <Html>
          <textarea
            onClick={onSelect}
            style={{
              position: 'absolute',
              left: textareaPosition.x,
              top: textareaPosition.y,
              width: textareaPosition.width,
              height: textareaPosition.height,
              background: 'transparent',
              resize: 'none',
              zIndex: 1, // Ensure textarea is above canvas elements
              transformOrigin: 'top left', // Ensure rotation happens around the top left corner
            }}
            onFocus={(e) => {
              // Optional: You can add custom focus styles here if you need a different behavior
              e.target.style.border = 'none'; // Disable border on focus
              e.target.style.outline = 'none'; // Disable outline on focus
            }}
            onBlur={(e) => {
              // Optional: You can restore styles on blur if needed
              e.target.style.border = 'none'; // Ensure border stays removed
              e.target.style.outline = 'none'; // Ensure outline stays removed
            }}
          >{text}</textarea>
        </Html>
        <Rect
          draggable={true}
          className="p-10 border-2 border-black"
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            if (!node) return;
  
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
  
            // Reset scale to prevent shape scaling
            node.scaleX(1);
            node.scaleY(1);
  
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            });
  
            // Update text width to match rectangle width without scaling the font size
            if (textRef.current) {
              textRef.current.width(Math.max(5, node.width() - 10)); // Adjust width with padding
              textRef.current.getLayer()?.batchDraw();
            }
          }}
        />
        {/*TODO: set visible prop dynamically, depending on whether it's render time */}
        {/*TODO: make Text's text and textarea's text same position */}
        <Text ref={textRef} text={text ?? ''} width={textareaPosition.width} height={textareaPosition.height} fill={"green"} x={textareaPosition.x} y={textareaPosition.y} fontSize={16} lineHeight={1.5} visible={true}/>
        {isSelected && (
          <Transformer
            ref={trRef}
            flipEnabled={false}
            rotateEnabled={false}
            boundBoxFunc={(oldBox, newBox) => {
              if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  };

  export {Rectangle};