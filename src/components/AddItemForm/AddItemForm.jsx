import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./style.css"

export default function AddItemForm(props) {
  return (
    <div>
      <Form onSubmit={props.addItem}>
        <Form.Group>
          <Form.Label htmlFor="newTitle">Title</Form.Label>
          <Form.Control
            id="newTitle"
            type="text"
            placeholder="Add title"
            onChange={(e) => props.setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="newBody">Body</Form.Label>
          <Form.Control
            id="newBody"
            placeholder="Add body"
            onChange={(e) => props.setBody(e.target.value)}
            required
          />
        </Form.Group>
        <section className="addItemForm-buttons">
          <Button variant="primary" type="submit">
            Add item
          </Button>
          <Button onClick={props.stopAddingItem} variant="danger">
            Cancel
          </Button>
        </section>
      </Form>
    </div>
  );
}
