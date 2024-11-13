import { ElectronStore } from "./electron-store";
import { DimensionsProps, PositionProps } from "../interfaces/ui";
const {cards, formats} = ElectronStore;

interface Font{
    size: string;
    family: string;
}


interface State{
    age: number;
    image: HTMLImageElement | undefined;
    font: Font;
    imageSrc: string | undefined;
    fileName: string | undefined;
    isPickedFormat: string | null;
    isPickedCard: string | null;
    dimensions: DimensionsProps;
    scale: number | undefined;
    position: PositionProps;
}

export type Action =
{
    type: "add"   
} 
| {
    type: "changed_image";
    image: HTMLImageElement | undefined
} 
| {
    type: "set_fontSize";
    font: Font;
}
| {
    type: 'set_imageSrc';
    imageSrc: string | undefined
}
| {
    type: "set_isPickedFormat";
    isPickedFormat: string | null;
}
| {
    type: "set_isPickedCard";
    isPickedCard: string | null;
}
| {
    type: 'set_dimensions';
    dimensions: DimensionsProps;
}
| {
    type: 'set_fileName';
    fileName: string | undefined;
}
| {
    type: "set_scale";
    scale: number | undefined;
}
| {
    type: 'set_position';
    position: PositionProps
};


const initialState: State = {
    age: 42,
    image: undefined,
    font: {
        size: '30px',
        family: 'Arial'
    },
    imageSrc: undefined,
    isPickedFormat: formats.length > 0 ? formats[0].key : null,
    isPickedCard: cards.length > 0 ? cards[0].key : null,
    dimensions: {
        width: 550,
        height: 550 * 1.414
    },
    fileName: undefined,
    scale: undefined,
    position: {
        xPos: 0,
        yPos: 0
    }
};

function reducer(state: State, action: Action){
    switch (action.type){
        case 'add':
            return {
                ...state,
                age: state.age + 1,
            };
        case 'changed_image':
            return {
                ...state,
                image: action.image,
            }
        case 'set_fontSize':
            return {
                ...state,
                font: {
                    size: action.font.size,
                    family: action.font.family,
                }
            }
        case 'set_imageSrc':
            return {
                ...state,
                imageSrc: action.imageSrc
            }
        case 'set_isPickedFormat':
            return {
                ...state,
                isPickedFormat: action.isPickedFormat
            }
        case 'set_isPickedCard':
            return {
                ...state,
                isPickedCard: action.isPickedCard
            }
        case 'set_dimensions':
            return {
                ...state,
                dimensions: {
                    width: action.dimensions.width,
                    height: action.dimensions.height
                }
            }
        case 'set_fileName':
            return{
                ...state,
                fileName: action.fileName
            }
        case 'set_scale':
            return {
                ...state,
                scale: action.scale
            }
        case 'set_position':
            return{
                ...state,
                position: {
                    xPos: action.position.xPos,
                    yPos: action.position.yPos,
                }
            }
        default:
            return state;
    }
}

export{ initialState, reducer}