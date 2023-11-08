import { useState } from "react";
import { useParams } from "react-router-dom";

import ItemEdit from "../ItemEdit/ItemEdit";
import ItemDetail from "../ItemDetail/ItemDetail";

export default function ItemDetailPage() {
    const {id} = useParams();
  const item = {
    id: 1,
    title: "Antique table",
    body: "A really nice old wooden table with four legs. Probably from 16th century",
    isImportant: true,
  };
  const [isEditing, setIsEditing] = useState(false);
  const [itemData, setItemData] = useState(item);

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
