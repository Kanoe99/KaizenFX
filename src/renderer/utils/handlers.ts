import { PickedItemProps } from "../interfaces/ui";

const handleIsPickedItem = ({isPickedItem, item}: PickedItemProps) => {
  return item === isPickedItem ? null : item;
};

export{
    handleIsPickedItem
}