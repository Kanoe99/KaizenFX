interface TileProps {
    type: string;
    isPicked: boolean;
    handleClick: () => void;
    styles?: string;
}

interface PickedItemProps{
    isPickedItem: string | null;
    item: string;
}

export{
    TileProps,
    PickedItemProps
}