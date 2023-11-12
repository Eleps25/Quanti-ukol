import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./style.css";

export default function ItemEdit(props) {
  const { title, body, isImportant } = props.item;
  const id = props.id;

  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  const validateData = () => {
    if (!newBody || !newTitle) {
      return false;
    }
    return true;
  };

  const handleUpdate = () => {
    setShowUpdateModal(false);
    navigate("/itemlist");
  };

  const updateItem = async () => {
    const itemDoc = doc(db, "items", id);
    if (!validateData()) {
      setShowErrorModal(true);
      return;
    }
    try {
      await updateDoc(itemDoc, { title: newTitle, body: newBody });
      setShowUpdateModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Test</h1>
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        placeholder="Title..."
      />
      <input type="checkbox" checked={isImportant} readOnly />
      <input
        onChange={(e) => setNewBody(e.target.value)}
        value={newBody}
        placeholder="Body..."
      />
      <div>
        <Button onClick={props.changeEdit}>Stop Editing</Button>
        <Button onClick={updateItem}>Update</Button>
      </div>
      <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-error">
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Title or body is missing.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowErrorModal(false)}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-update">
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Item updated.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleUpdate()}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
