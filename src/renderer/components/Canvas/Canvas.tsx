import React from 'react';
import { Stage, Layer, Star, Circle, Text } from 'react-konva';
// bg-green-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * 550,
    y: Math.random() * 550 * 1.414,
    rotation: Math.random() * 200,
    isDragging: false,
  }));
}
const INITIAL_STATE = generateShapes();
function generateShapes2() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString() + 's',
    x: Math.random() * 550,
    y: Math.random() * 550 * 1.414,
    rotation: Math.random() * 200,
    isDragging: false,
  }));
}
const INITIAL_STATE2 = generateShapes2();
const Canvas = () => {
  const [stars, setStars] = React.useState(INITIAL_STATE);
  const [circles, setCircles] = React.useState(INITIAL_STATE2);
  const handleDragStart = (e: any) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      }),
    );
  };
  const handleDragEnd = () => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      }),
    );
  };
  const handleDragStartS = (e: any) => {
    const id = e.target.id();
    setCircles(
      circles.map((circle) => {
        return {
          ...circle,
          isDragging: circle.id === id,
        };
      }),
    );
  };
  const handleDragEndS = () => {
    setCircles(
      circles.map((circle) => {
        return {
          ...circle,
          isDragging: false,
        };
      }),
    );
  };
  return (
    <Stage width={550} height={550 * 1.414} className="bg-red-500">
      <Layer>
        <Text text="Try to drag a star" />
        {stars.map((star) => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            scaleX={star.isDragging ? 1.2 : 1}
            scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            dragBoundFunc={(pos) => {
              const stageWidth = 620;
              const stageHeight = 600 * 1.414;
              const starWidth = 80;
              const starHeight = 80;
              const newX = Math.max(0, Math.min(pos.x, stageWidth - starWidth));
              const newY = Math.max(
                0,
                Math.min(pos.y, stageHeight - starHeight),
              );
              return {
                x: newX,
                y: newY,
              };
            }}
          />
        ))}
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            id={circle.id}
            x={circle.x}
            y={circle.y}
            numPoints={5}
            radius={60}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={circle.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={circle.isDragging ? 10 : 5}
            shadowOffsetY={circle.isDragging ? 10 : 5}
            scaleX={circle.isDragging ? 1.2 : 1}
            scaleY={circle.isDragging ? 1.2 : 1}
            onDragStart={handleDragStartS}
            onDragEnd={handleDragEndS}
            dragBoundFunc={(pos) => {
              const stageWidth = 620;
              const stageHeight = 600 * 1.414;
              const starWidth = 80;
              const starHeight = 80;
              const newX = Math.max(0, Math.min(pos.x, stageWidth - starWidth));
              const newY = Math.max(
                0,
                Math.min(pos.y, stageHeight - starHeight),
              );
              return {
                x: newX,
                y: newY,
              };
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};
export { Canvas };