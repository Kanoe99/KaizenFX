import React, { useState, useRef, useEffect } from 'react';
interface PictureProps {
  imageSrc: string | null;
  cel?: string | null;
}
const Picture: React.FC<PictureProps> = ({ imageSrc, cel }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pictureRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pictureRef.current && imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => setImgSize({ width: img.width, height: img.height });
    }
  }, [imageSrc]);
  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !pictureRef.current) return;
    const wrapper = pictureRef.current.getBoundingClientRect();
    const newX = event.clientX - dragStart.current.x;
    const newY = event.clientY - dragStart.current.y;
    // Ensure the image stays within the wrapper's boundaries
    setPosition({
      x: Math.min(0, Math.max(wrapper.width - imgSize.width, newX)),
      y: Math.min(0, Math.max(wrapper.height - imgSize.height, newY)),
    });
  };
  const handleMouseUp = () => setIsDragging(false);
  return (
    <div
      ref={pictureRef}
      className={`relative border-8 overflow-hidden ${
        imageSrc
          ? ''
          : 'bg-green-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
      }`}
      style={{
        width: '550px',
        height: `${550 * 1.414}px`, // A3 ratio
        maxWidth: '100%',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {imageSrc ? (
       <>
        <img
          src={imageSrc}
          alt="Uploaded"
          draggable={false}
          style={{
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
            width: imgSize.width > 550 ? '100%' : 'auto',
            height: imgSize.height > 550 * 1.414 ? '100%' : 'auto',
            objectFit: 'contain',
          }}
          onMouseDown={handleMouseDown}
        />
        <h2 className="bg-red-500 absolute z-[100] text-white">{cel}</h2>
      </>
      ) : (
        <div className="absolute inset-0 grid place-items-center text-center font-black text-4xl">
          Загрузите картинку
        </div>
      )}
    </div>
  );
};
export { Picture };