import { Button } from "@mui/material";

export default function InventoryButton({
  buttonFunction,
  buttonWords,
  setModalType,
  modalType,
  itemName,
  setItemName,
  itemCount,
  setItemCount,
}) {
  return (
    <Button
      onClick={() => {
        buttonFunction(itemName);
        if (setModalType) setModalType(modalType);
        if (setItemName) setItemName(itemName);
        if (setItemCount) setItemCount(itemCount);
      }}
    >
      {buttonWords}
    </Button>
  );
}
