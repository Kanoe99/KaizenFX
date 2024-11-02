import React, { useState, useEffect } from 'react';
import { Menu } from './ui/Menu';
import { Header } from './ui/Header';
import { Picture } from './ui/Picture';

const Main = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isPickedFormat, setIsPickedFormat] = useState<string | null>(null);
  const [isPickedCel, setIsPickedCel] = useState<string | null>(null);

  const formats = ['A3', 'A4', 'A5'];
  const cards = ['Новый Год', '8 Марта', '23 Февраля'];

  function handleIsPickedFormat(item: string) {
    setIsPickedFormat(item === isPickedFormat ? null : item);
  }

  function handleIsPickedCel(item: string) {
    setIsPickedCel(item === isPickedCel ? null : item);
  }

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

  // Hook to listen for Ctrl + P and trigger handlePrint
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault(); // Prevent browser's default print dialog
        handlePrint();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const foo = window.electron.store.get('foo');

  return (
    <main className="h-screen overflow-auto">
      <button className='bg-red-500 px-4 py-2 rounded-md' onClick={()=>{const test = window.electron.store.set('foo', 'bar'); console.log(window.electron.store.get('foo'))}}>click me</button>
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
          isPickedCel={isPickedCel}
          isPickedFormat={isPickedFormat}
          handleIsPickedFormat={handleIsPickedFormat}
          handleIsPickedCel={handleIsPickedCel}
        />
        <Picture imageSrc={imageSrc} cel={isPickedCel}/>
      </section>
    </main>
  );
};

export { Main };