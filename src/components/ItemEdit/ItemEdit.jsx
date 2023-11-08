import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

import Button from "react-bootstrap/Button";

export default function ItemEdit(props) {
  const { title, body, isImportant } = props.item;
  const id = props.id;

  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);
  const navigate = useNavigate();

  const validateData = () => {
    if (!newBody || !newTitle) {
      return false;
    }
    return true;
  };

  const updateItem = async () => {
    const itemDoc = doc(db, "items", id);
    if (!validateData()) {
      return alert("Title or body is empty");
    }
    try {
      await updateDoc(itemDoc, { title: newTitle, body: newBody })
        .then(alert("Updated"))
        .then(navigate("/itemlist"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        placeholder="Title..."
      />
      <input type="checkbox" value={isImportant} />
      <input
        onChange={(e) => setNewBody(e.target.value)}
        value={newBody}
        placeholder="Body..."
      />
      <div>
        <Button onClick={props.changeEdit}>Stop Editing</Button>
        <Button onClick={updateItem}>Update</Button>
      </div>
    </div>
  );
}
