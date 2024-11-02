import React, { useState, useEffect } from 'react';
import { Menu } from './ui/Menu';
import { Header } from './ui/Header';
import { Picture } from './ui/Picture';
import { handleIsPickedItem } from "../utils/handlers";
import { Canvas } from './Canvas/Canvas';

const Main = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isPickedFormat, setIsPickedFormat] = useState<string | null>(null);
  const [isPickedCard, setIsPickedCard] = useState<string | null>(null);

  const formats = ['A3', 'A4', 'A5'];
  const cards = ['Новый Год', '8 Марта', '23 Февраля'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  const handleSave = () => {
    if (imageSrc) {
      console.log('Saving image:', imageSrc);
    }
  };

  const handleDelete = () => {
    setImageSrc(null);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const foo = window.electron.store.get('foo');

  return (
    <main className="h-screen overflow-auto">
      <button className='bg-red-500 px-4 py-2 rounded-md' onClick={()=>{window.electron.store.set('foo', 'bar'); console.log(window.electron.store.get('foo'))}}>click me</button>
      <div>{foo}</div>
      <Header
        handleFileChange={handleFileChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handlePrint={handlePrint}
      />
      <section className="flex px-14 justify-between py-12 h-fit gap-20">
        <Menu
          formats={formats}
          cards={cards}
          isPickedCard={isPickedCard}
          isPickedFormat={isPickedFormat}
          handleIsPickedFormat={(item) =>
            setIsPickedFormat(
              handleIsPickedItem({ isPickedItem: isPickedFormat, item: item }),
            )
          }
          handleIsPickedCard={(item) =>
            setIsPickedCard(
              handleIsPickedItem({ isPickedItem: isPickedCard, item: item }),
            )
          }
          
        />
        <Canvas />
        <Picture imageSrc={imageSrc} card={isPickedCard}/>
      </section>
    </main>
  );
};

export { Main };