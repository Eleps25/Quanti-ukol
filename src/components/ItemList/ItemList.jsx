import { useEffect, useState } from "react";

import Item from "../Item/Item";
import AddItemForm from "../AddItemForm/AddItemForm";

import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

import sortItems from "../../helperFunctions/sortFn";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./style.css";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemBody, setNewItemBody] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      setTimeout(() => setIsLoad(true), 1000);
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
      setShowDeleteModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(itemsCollectionRef, {
        title: newItemTitle,
        body: newItemBody,
        isImportant: false,
      });

      getItemList();
      setShowAddModal(true);
      setIsAddingItem(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Item List</h1>
      <Container>
        <Row xs="auto" sm="auto" md="auto" lg="auto" className="justify-content-center">
          {isLoad ? (
            items.map((item) => (
              <Col key={item.id}>
                <Item
                  item={item}
                  key={item.id}
                  updateItemImportant={() => updateImportant(item)}
                  deleteItem={() => deleteItem(item.id)}
                />
              </Col>
            ))
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Row>
      </Container>
      <section>
        <Button
          onClick={() =>
            sortItems(
              items,
              setItems,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted
            )
          }
        >
          Sort Items
        </Button>
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
      </section>
      <section>
        <Modal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="modal-add">
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Item added.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setShowAddModal(false)}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="modal-delete">
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Item Deleted.</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={() => setShowDeleteModal(false)}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
}
