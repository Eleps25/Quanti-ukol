import { useEffect, useState } from "react";
import Item from "../Item/Item";

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function ItemList() {
  const [items, setItems] = useState([]);

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

  return (
    <div>
      <h1>Item List</h1>
      {items.map((item) => (
        <Item item={item} key={item.id} updateItemImportant={() => updateImportant(item)} />
      ))}
    </div>
  );
}
