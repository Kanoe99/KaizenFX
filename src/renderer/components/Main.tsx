import { useRef, useEffect, useReducer } from 'react';
import { Menu } from './ui/Menu';
import { Header } from './ui/Header';
import {
  handleIsPickedItem,
  handleFileChange,
  handleSave,
  handleDelete,
  handlePrint,
  handleResetPos,
  handleResetScale,
} from '../utils/handlers';
import { Canvas } from '../components/Canvas/Canvas';
import { initialState, reducer } from '../utils/reducer';
import { ElectronStore } from '../utils/electron-store';
import { TitleBar } from './ui/TitleBar/TitleBar';

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cards, formats } = ElectronStore;
  const { dimensions, image, isPickedCard, isPickedFormat, imageSrc, fileName, scale, position, isSelected, selectedId } = state;

  const initialScale = image ? dimensions.width / image.naturalWidth : undefined;

  const stageRef = useRef(null);
  const textRef = useRef(null);
  const trRef = useRef(null);

  const cardText =
    isPickedCard &&
    cards.filter(
      (card: { key: string; value: string }) => card.key === isPickedCard,
    )[0].value;

  useEffect(() => {
    handleResetPos(dispatch);

    if (imageSrc === undefined) {
      dispatch({ type: 'changed_image', image: undefined });
      return;
    }

    const img = new window.Image();

    img.src = imageSrc;
    img.onload = () => {
      const calculatedScale = dimensions.width / img.naturalWidth;

      dispatch({ type: 'changed_image', image: img });
      dispatch({ type: 'set_initialScale', initialScale: calculatedScale }); // Set initial scale
      dispatch({ type: 'set_scale', scale: calculatedScale });
    };
  }, [imageSrc, dimensions.width]);

  return (
    <main className="h-screen overflow-auto">
      <TitleBar
        handleFileChange={(event) =>
          handleFileChange(event, dispatch)
        }
        handleSave={() => {
          handleSave({ uri: imageSrc, fileName, stageRef, textRef, trRef }, dispatch);
        }}
        handleResetPos={() => handleResetPos(dispatch)}
        handleResetScale={() => handleResetScale(dispatch, initialScale)}
        handleDelete={() => handleDelete(dispatch)}
        handlePrint={handlePrint}
        formats={formats}
        cards={cards}
        isPickedCard={isPickedCard}
        isPickedFormat={isPickedFormat}
        handleIsPickedFormat={(item) => {
          dispatch({
            type: 'set_isPickedFormat',
            isPickedFormat: handleIsPickedItem({ isPickedItem: isPickedFormat, item }),
          });
        }}
        handleIsPickedCard={(item) => {
          dispatch({
            type: 'set_isPickedCard',
            isPickedCard: handleIsPickedItem({ isPickedItem: isPickedCard, item }),
          });
        }}
      />
      <Header
        handleFileChange={(event) =>
          handleFileChange(event, dispatch)
        }
        handleSave={() => {
          handleSave({ uri: imageSrc, fileName, stageRef, textRef, trRef }, dispatch);
        }}
        handleResetPos={() => handleResetPos(dispatch)}
        handleResetScale={() => handleResetScale(dispatch, initialScale)}
        handleDelete={() => handleDelete(dispatch)}
        handlePrint={handlePrint}
      />
      <section className="flex px-14 justify-between py-12 h-fit gap-20">
        <Menu
          formats={formats}
          cards={cards}
          isPickedCard={isPickedCard}
          isPickedFormat={isPickedFormat}
          handleIsPickedFormat={(item) => {
            dispatch({
              type: 'set_isPickedFormat',
              isPickedFormat: handleIsPickedItem({ isPickedItem: isPickedFormat, item }),
            });
          }}
          handleIsPickedCard={(item) => {
            dispatch({
              type: 'set_isPickedCard',
              isPickedCard: handleIsPickedItem({ isPickedItem: isPickedCard, item }),
            });
          }}
        />
        <Canvas
          cardText={cardText}
          imageSrc={imageSrc}
          stageRef={stageRef}
          textRef={textRef}
          trRef={trRef}
          xPos={position.xPos}
          yPos={position.yPos}
          scale={scale}
          image={image}
          dimensions={dimensions}
          dispatch={dispatch}
          initialScale={initialScale}
          isSelected={isSelected}
          selectedId={selectedId}
        />
      </section>
    </main>
  );
};

export { Main };
