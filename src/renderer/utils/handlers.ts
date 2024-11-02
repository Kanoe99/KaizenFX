import { DownloadProps, PickedProps } from '../interfaces/ui';

const handleIsPickedItem = ({ isPickedItem, item }: PickedProps) => {
  return item === isPickedItem ? null : item;
};
const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImageSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
  setFileName: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileName_edited =
        file.name.slice(0, file.name.indexOf('.')) +
        '_edited' +
        file.name.slice(file.name.indexOf('.'));

      setImageSrc(e.target?.result as string), setFileName(fileName_edited);
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
  setImageSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  setImageSrc(undefined);
};

const handlePrint = () => {
  window.print();
};

export {
  handleDelete,
  handleFileChange,
  handleIsPickedItem,
  handlePrint,
  handleSave,
};