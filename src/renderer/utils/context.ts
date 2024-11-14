import { createContext } from "react";

interface cardContextProps{
    cards: object,
    cardText: string,
}

const CanvasContext = createContext({cards, cardText} : cardContextProps)

export {CanvasContext};