"use client";
import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { firestore } from "@/firebase";
import { collection, query, getDocs, } from "firebase/firestore";
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
  const [searchValue, setSearchValue] = useState("");
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

  useEffect(() => {
    setItemName(searchValue);
    setItemCount();
  }, [searchValue, itemName, itemCount]);

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
            setSearchValue(newSearchValue);
            setModalType("Update");
            setOpen(true);
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
