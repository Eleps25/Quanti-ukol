import { useEffect, useState } from "react";
import Item from "../Item/Item";

import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import AddItemForm from "../AddItemForm/AddItemForm";

import Button from "react-bootstrap/Button";

export default function ItemList() {
  const [items, setItems] = useState([]);

  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemBody, setNewItemBody] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const [isSorted, setIsSorted] = useState(false);
  const [isAscSorted, setIsAscSorted] = useState(false);

  const itemsCollectionRef = collection(db, "items");

  const getItemList = async () => {
    try {
      const data = await getDocs(itemsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  const updateImportant = async (item) => {
    const itemDoc = doc(db, "items", item.id);
    try {
      await updateDoc(itemDoc, { isImportant: !item.isImportant });

      getItemList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "items", id);
    try {
      await deleteDoc(itemDoc);

      getItemList();
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItemBody || !newItemTitle) {
      return alert("Title or body is empty.");
    }
    try {
      await addDoc(itemsCollectionRef, {
        title: newItemTitle,
        body: newItemBody,
        isImportant: false,
      });

      getItemList();
      setIsAddingItem(false);
    } catch (err) {
      console.log(err);
    }
  };

  const sortAsc = (columnToSort, items) => {
    const sortedItems = items.toSorted((firstItem, secondItem) => {
        const columnOne = firstItem[columnToSort].toUpperCase();
        const columnTwo = secondItem[columnToSort].toUpperCase();
        if (columnOne < columnTwo) {
          return -1;
        }
        if (columnOne > columnTwo) {
          return 1;
        }
        return 0;
      });
    return sortedItems;
  }

  const sortDesc = (columnToSort, items) => {
    const sortedItems = items.toSorted((firstItem, secondItem) => {
        const columnOne = firstItem[columnToSort].toUpperCase();
        const columnTwo = secondItem[columnToSort].toUpperCase();
        if (columnOne < columnTwo) {
          return 1;
        }
        if (columnOne > columnTwo) {
          return -1;
        }
        return 0;
      });
    return sortedItems;
  }


  const sortItems = () => {
    if (!isSorted) {
      setItems(sortAsc("title", items));
      setIsSorted(true);
      setIsAscSorted(true);
    } else if (isSorted && isAscSorted) {
      setItems(sortDesc("title", items));
      setIsAscSorted(false);
    } else {
      setItems(sortAsc("id", items));
      setIsSorted(false);
    }
  };

  return (
    <div>
      <h1>Item List</h1>
      <Button onClick={sortItems}>Sort Items</Button>
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          updateItemImportant={() => updateImportant(item)}
          deleteItem={() => deleteItem(item.id)}
        />
      ))}
      <Button variant="primary" onClick={() => setIsAddingItem(true)}>
        Add new Item
      </Button>
      {isAddingItem && (
        <AddItemForm
          addItem={addItem}
          setTitle={setNewItemTitle}
          setBody={setNewItemBody}
          stopAddingItem={() => setIsAddingItem(false)}
        />
      )}
    </div>
  );
}
