import React from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import { useEffect, useState } from 'react';

import { CanvasProps, ImageProps } from '../../interfaces/ui';

const Canvas: React.FC<CanvasProps> = ({ cardText, imageSrc, stageRef }) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  const [aspectRatio, setAspectRatio] = useState<ImageProps>({
    width: 550,
    height: 550 * 1.414,
  });
  const scale = image && aspectRatio.width / image.naturalWidth;

  const imageId = crypto.randomUUID();

  useEffect(() => {
    const img = new window.Image();
    if (imageSrc) {
      img.src = imageSrc;
      img.onload = () => {
        setImage(img);
      };
    }
  }, [imageSrc]);

  return (
    <Stage
      width={aspectRatio.width}
      height={aspectRatio.height}
      className="bg-green-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-8"
      ref={stageRef}
    >
      <Layer>
        <Text text={cardText !== null ? cardText : undefined} />

        <Image
          scaleX={scale}
          scaleY={scale}
          id={imageId}
          image={image}
          draggable={true}
          onMouseEnter={(e) => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = 'grab');
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
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = 'default');
          }}
        />
      </Layer>
    </Stage>
  );
};

export { Canvas };