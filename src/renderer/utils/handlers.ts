import { DownloadProps, PickedProps } from '../interfaces/ui';
import {Action} from '../utils/reducer';

const handleIsPickedItem = ({ isPickedItem, item }: PickedProps) => {
  return item === isPickedItem ? null : item;
};

const handleResetScale = (dispatch: React.Dispatch<Action>, initialScale: number | undefined) => {
  dispatch({type: 'set_scale', scale: initialScale})
}

const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  dispatch: React.Dispatch<Action>
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileName_edited =
        file.name.slice(0, file.name.indexOf('.')) +
        '_edited' +
        file.name.slice(file.name.indexOf('.'));

      dispatch({type: 'set_fileName', fileName: fileName_edited})
      dispatch({type: 'set_imageSrc', imageSrc: e.target?.result as string})
    };
    reader.readAsDataURL(file);
  }
  event.target.value = '';
};

const handleSave = ({ fileName, stageRef }: DownloadProps) => {
  if (stageRef?.current && fileName !== undefined) {
    let link = document.createElement('a');
    link.download = fileName;
    link.href = stageRef.current?.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const handleDelete = (
  dispatch: React.Dispatch<Action>
) => {
  dispatch({type: 'set_imageSrc', imageSrc: undefined})
};

const handlePrint = () => {
  window.print();
};

const handleResetPos = (
  dispatch: React.Dispatch<Action>
) => {
  dispatch({type: 'set_position', position: {xPos: 0, yPos: 0}})
}

export {
  handleDelete,
  handleFileChange,
  handleIsPickedItem,
  handlePrint,
  handleSave,
  handleResetPos,
  handleResetScale
};