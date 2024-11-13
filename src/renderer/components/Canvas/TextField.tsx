import { Rectangle } from './Rectangle';
import { useState } from 'react';

import { TextFieldProps } from '../../interfaces/ui';

const TextField = ({checkDeselect, dispatch, selectedId, text}: TextFieldProps) => {
  const [rectangles, setRectangles] = useState([{
    id:crypto.randomUUID(),
    x:50,
    y:50,
    width:450,
    height:400,
    fill:"red",
}]);
  const id = rectangles[0].id;

  return (
          <Rectangle
          text={text}
          shapeProps={rectangles[0]}
          onChange={(newAttrs) => {
            const rects = rectangles.slice();
            rects[0] = newAttrs;
            setRectangles(rects);
          }}
          key={id}
          isSelected={id === selectedId}
          onSelect={() => dispatch({type: 'set_selectedId', selectedId: id})}
          />
  );
};

export {TextField};
