import { Box, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { firestore } from "@/firebase";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";
import InventoryButton from "./InventoryButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  m: 3,
  display: "flex",
  flexDirection: "column",
};

export default function ItemModal({
  open,
  setOpen,
  updateInventory,
  modalType,
  itemName,
  setItemName,
  itemCount,
  setItemCount,
}) {
  const handleClose = () => {
    setOpen(false);
    setItemName("");
    setItemCount(1);
  };

  const addItem = async (item, itemCount) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: parseInt(itemCount) });
      await updateInventory();
      return;
    } else {
      await setDoc(docRef, { count: parseInt(itemCount) });
      await updateInventory();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalType} Item
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <TextField
            id="outline-basic"
            label="item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            id="outline-basic"
            label="count"
            variant="outlined"
            fullWidth
            value={itemCount}
            onChange={(e) => setItemCount(e.target.value)}
          />
          <InventoryButton
            buttonFunction={() => {
              addItem(itemName, itemCount);
              handleClose();
            }}
            buttonWords={"Add"}
          />
        </Stack>
      </Box>
    </Modal>
  );
}
