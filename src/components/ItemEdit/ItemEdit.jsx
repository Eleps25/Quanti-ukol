import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./style.css";

export default function ItemEdit(props) {
  const { title, body } = props.item;
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
      <Form className="itemEdit-form">
        <section className="itemEdit-inputs">
          <Form.Group>
            <Form.Label htmlFor="editTitle">Title</Form.Label>
            <Form.Control
              id="editTitle"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              placeholder="Title..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="editBody">Body</Form.Label>
            <Form.Control
              id="editBody"
              onChange={(e) => setNewBody(e.target.value)}
              value={newBody}
              placeholder="Body..."
            />
          </Form.Group>
        </section>
        <section className="itemEdit-buttons">
          <Button onClick={props.changeEdit} variant="danger">Stop Editing</Button>
          <Button onClick={updateItem} variant="success">Update</Button>
        </section>
      </Form>
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
        <Modal.Header className="modal-update">
          <Modal.Title>Item updated!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Item successfully updated.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleUpdate()}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
