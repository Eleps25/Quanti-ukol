import { useEffect, useState } from "react";
import Item from "../Item/Item";

import { collection, getDocs } from "firebase/firestore";
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

  return (
    <div>
      <h1>Item List</h1>
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}
