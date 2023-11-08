import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import ItemEdit from "../ItemEdit/ItemEdit";
import ItemDetail from "../ItemDetail/ItemDetail";

export default function ItemDetailPage() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [itemData, setItemData] = useState({});

  const docRef = doc(db, "items", id);

  useEffect(() => {
    const getItemData = async () => {
        try {
            const data = await getDoc(docRef);
            const filteredData = data.data();
            setItemData(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    getItemData()
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <h1>{id}</h1>
      {isEditing ? (
        <ItemEdit item={itemData} changeEdit={handleEdit} />
      ) : (
        <ItemDetail item={itemData} changeEdit={handleEdit} />
      )}
    </div>
  );
}
