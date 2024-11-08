import { useState, useRef, useEffect } from 'react';
import { Menu } from './ui/Menu';
import { Header } from './ui/Header';
import {
  handleIsPickedItem,
  handleFileChange,
  handleSave,
  handleDelete,
  handlePrint,
  handleResetPos,
} from '../utils/handlers';
import { Canvas } from '../components/Canvas/Canvas';
import { ElectronProps, ImageProps } from '../interfaces/ui';

const Main = () => {
  const [fontSize, setFontSize] = useState<string>('30px');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [formats, setFormats] = useState<ElectronProps[] >(
    window.electron.store.get('settings.formats'),
  );
  const [cards, setCards] = useState<ElectronProps[]>(
    window.electron.store.get('settings.cards'),
  );
  const [isPickedFormat, setIsPickedFormat] = useState<string | null>(
    formats.length > 0 ? formats[0].key : null
  );
  const [isPickedCard, setIsPickedCard] = useState<string | null>(
    cards.length > 0 ? cards[0].key : null
  );
  const [position, setPosition] = useState<{xPos: number, yPos: number}>({xPos: 0, yPos: 0});

  const [aspectRatio, setAspectRatio] = useState<ImageProps>({
    width: 550,
    height: 550 * 1.414,
  });

  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

  
  const [scale, setScale] = useState<number | undefined>(undefined);
  
  useEffect(()=>{
    setPosition({xPos: 0, yPos: 0});
    
    const img = new window.Image();
    if (imageSrc) {
      img.src = imageSrc;
      img.onload = () => {
        setImage(img);
      };
    }
  },[imageSrc]);
  
  const initialScale = image ? aspectRatio.width / image.naturalWidth : undefined;
        
  useEffect(()=>{
    setScale(initialScale)
  }, [initialScale])
        
  const stageRef = useRef(null);


  const handleResetScale = () => {
  setScale(initialScale);
  }

  const cardText =
    isPickedCard &&
    cards.filter(
      (card: { key: string; value: string }) => card.key === isPickedCard,
    )[0].value;

  return (
    <main className="h-screen overflow-auto">
       <Header
        handleFileChange={(event) =>
          handleFileChange(event, setImageSrc, setFileName)
        }
        handleSave={() =>
          handleSave({ uri: imageSrc, fileName: fileName, stageRef: stageRef })
        }
        handleResetPos={()=>{handleResetPos(setPosition)}}
        handleResetScale={handleResetScale}
        handleDelete={() => handleDelete(setImageSrc)}
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
        <Canvas cardText={cardText} imageSrc={imageSrc} stageRef={stageRef} xPos={position.xPos} yPos={position.yPos} setPosition={setPosition} scale={scale} image={image} aspectRatio={aspectRatio} setScale={setScale}/>
      </section>
    </main>
  );
};

export { Main };