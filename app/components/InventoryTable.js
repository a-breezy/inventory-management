"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

import InventoryButton from "./InventoryButton";

export default function InventoryTable({
  inventory,
  updateInventory,
  handleOpen,
  setModalType,
  setItemName,
  setItemCount,
}) {
  const handleIncrease = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
      await updateInventory();
    }
  };

  const handleDecrease = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    const { count } = docSnap.data();
    if (count > 1) {
      await setDoc(docRef, { count: count - 1 });
      await updateInventory();
    } else {
      handleDelete(item);
    }
  };

  const handleDelete = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    await deleteDoc(docRef);
    await updateInventory();
  };

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ width: "100%" }}>
            <TableCell>Item</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map(({ name, count }) => (
            <TableRow
              key={name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <InventoryButton
                  buttonFunction={handleOpen}
                  buttonWords={name.charAt(0).toUpperCase() + name.slice(1)}
                  setModalType={setModalType}
                  modalType={"Update"}
                  itemName={name}
                  setItemName={setItemName}
                  itemCount={count}
                  setItemCount={setItemCount}
                />
              </TableCell>

              <TableCell align="right">
                <InventoryButton
                  buttonFunction={handleDecrease}
                  buttonWords={"-"}
                  itemName={name}
                />
                <Button>{count}</Button>
                <InventoryButton
                  buttonFunction={handleIncrease}
                  buttonWords={"+"}
                  itemName={name}
                />
              </TableCell>
              <TableCell align="right">
                <InventoryButton
                  buttonFunction={handleDelete}
                  buttonWords={"Delete"}
                  itemName={name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
