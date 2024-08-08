"use client";
import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { firestore } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ItemModal from "./components/ItemModal";
import InventoryButton from "./components/InventoryButton";
import InventoryTable from "./components/InventoryTable";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("Add");
  const [itemName, setItemName] = useState("");
  const [itemCount, setItemCount] = useState(1);
  const handleOpen = () => setOpen(true);

  const updateInventory = async () => {
    const inventoryList = [];
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Container>
      <Typography variant="h1" textAlign="center" sx={{ mt: 10 }}>
        Welcome to Inventory Management
      </Typography>
      <Box
        width="100%"
        display="flex"
        justifyContent={"space-around"}
        flexDirection={"row"}
        flexWrap={"wrap"}
      >
        <InventoryButton
          buttonFunction={handleOpen}
          buttonWords={"Add Item"}
          setModalType={setModalType}
          modalType={"Add"}
        />
        <Autocomplete
          disablePortal
          id="search-bar"
          onChange={(event, newSearchValue) => {
            const selectedItem = inventory.find(
              (item) => item.name === newSearchValue
            );

            if (selectedItem) {
              setItemName(selectedItem.name);
              setItemCount(selectedItem.count);
              setModalType("Update");
              setOpen(true);
            } else {
              console.error("Item not found in inventory");
              setItemName(newSearchValue || "");
              setOpen(false);
              setItemCount(1);
            }
          }}
          options={inventory.map((item) => item.name)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="search inventory" />
          )}
        />
      </Box>
      <ItemModal
        open={open}
        setOpen={setOpen}
        updateInventory={updateInventory}
        modalType={modalType}
        itemName={itemName}
        setItemName={setItemName}
        itemCount={itemCount}
        setItemCount={setItemCount}
      />

      <Box>
        <InventoryTable
          inventory={inventory}
          updateInventory={updateInventory}
          handleOpen={handleOpen}
          setModalType={setModalType}
          setItemName={setItemName}
          itemName={itemName}
          setItemCount={setItemCount}
        />
      </Box>
    </Container>
  );
}
