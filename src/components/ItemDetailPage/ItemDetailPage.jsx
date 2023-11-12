import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import ItemEdit from "../ItemEdit/ItemEdit";
import ItemDetail from "../ItemDetail/ItemDetail";

import Spinner from "react-bootstrap/Spinner";

export default function ItemDetailPage() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [itemData, setItemData] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  const docRef = doc(db, "items", id);

  useEffect(() => {
    const getItemData = async () => {
      try {
        const data = await getDoc(docRef);
        const filteredData = data.data();
        setItemData(filteredData);
        setTimeout(() => setIsLoad(true), 1000);
      } catch (err) {
        console.log(err);
      }
    };

    getItemData();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const showItems = () => {
    if (!isLoad) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    } else if (isLoad && isEditing) {
      return <ItemEdit item={itemData} changeEdit={handleEdit} id={id} />
    } else {
      return <ItemDetail item={itemData} changeEdit={handleEdit} id={id} />;
    }
  };
  return (
    <div>
      <h1>{id}</h1>
      {showItems()}
    </div>
  );
}
