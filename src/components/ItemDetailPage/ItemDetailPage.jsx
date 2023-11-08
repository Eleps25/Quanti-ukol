import { useState } from "react";
import ItemEdit from "../ItemEdit/ItemEdit";
import ItemDetail from "../ItemDetail/ItemDetail";

export default function ItemDetailpage() {
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
      {isEditing ? (
        <ItemEdit item={itemData} changeEdit={handleEdit} />
      ) : (
        <ItemDetail item={itemData} changeEdit={handleEdit} />
      )}
    </div>
  );
}
