import { useState, useRef, useEffect } from 'react';
import { TextFieldProps, RectangleProps } from '../../interfaces/ui';
import Konva from 'konva';
import { Text, Rect, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';

const TextField = ({checkDeselect, dispatch, selectedId, text, textRef, trRef}: TextFieldProps) => {
  const [rectangles, setRectangles] = useState([{
    id:crypto.randomUUID(),
    x:50,
    y:50,
    width:450,
    height:400,
}]);

  //TODO: store this into an object or array or something so that it would not be destroyed on text card change
  const [textValue, setTextValue] = useState<string>('');


  const id = rectangles[0].id;
  const shapeProps = rectangles[0];

  const onSelect = () => dispatch({type: 'set_selectedId', selectedId: id});


  const handleChange = (newAttrs: any) => {
    const rects = rectangles.slice();
    rects[0] = newAttrs;
    setRectangles(rects);
  }


  const shapeRef = useRef<Konva.Rect>(null);
    // const trRef = useRef<Konva.Transformer>(null);
  
    // Calculate the textarea position and dimensions
    const textareaPosition = {
      x: shapeProps.x + 10, // Positioning it inside with padding
      y: shapeProps.y + 10, // Positioning it inside with padding
      width: shapeProps.width - 20, // Adjust width with padding (10px on each side)
      height: shapeProps.height - 20, // Adjust height with padding (10px on each side)
    };

    const isSelected = id === selectedId;

  
    useEffect(() => {
      //TODO: DONE??  attach transformer even if image is not set

      if (isSelected && trRef && trRef.current && shapeRef.current && textRef?.current) {
        //attaching transformer
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer()?.batchDraw();
      }
    }, [isSelected]);
  
  
    return (
      <div key={id}>
        <Html>
          <textarea
            onClick={onSelect}
            onChange={(e)=>{
              setTextValue(e.target.value)
            }}
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
            handleChange({
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
  
            handleChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            });
  
            // Update text width to match rectangle width without scaling the font size
            if (textRef?.current) {
              textRef.current.width(Math.max(5, node.width() - 10)); // Adjust width with padding
              textRef.current.getLayer()?.batchDraw();
            }
          }}
        />
        {/*TODO: set visible prop dynamically, depending on whether it's render time */}
        {/*TODO: make Text's text and textarea's text same position */}
        <Text ref={textRef} text={textValue !== '' ? textValue : text ?? ''} width={textareaPosition.width} height={textareaPosition.height} fill={"white"} x={textareaPosition.x} y={textareaPosition.y} fontSize={16} lineHeight={1.5} visible={false}/>
          <Transformer
            visible={true}
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
        
      </div>
    );
};

export {TextField};
