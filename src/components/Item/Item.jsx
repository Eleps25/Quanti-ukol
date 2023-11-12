import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.css";

export default function Item(props) {
  const { id, title, body, isImportant } = props.item;
  return (
    <Card>
      <Card.Body>
        <Card.Title className="myCard-title">
          <Link to={`/itemlist/${id}`}>{title}</Link>
          <input
          onChange={props.updateItemImportant}
          type="checkbox"
          checked={isImportant}
        />
        </Card.Title>
        <Card.Text>{body}</Card.Text>
        <Button onClick={props.deleteItem} variant="danger">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
