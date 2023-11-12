import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.css";

export default function Item(props) {
  const { id, title, body, isImportant } = props.item;
  return (
    <Card className="myCard-container text-center" bg={isImportant? "warning": null}>
      <Card.Body>
        <Card.Title className="myCard-title">
          {title}
          <div>
            <input
              id={id}
              onChange={props.updateItemImportant}
              type="checkbox"
              checked={isImportant}
              className="myCard-favourite"
            />
            <label htmlFor={id}>
              {isImportant ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/14/Font_Awesome_5_solid_star.svg"
                  width="20"
                  height="20"
                />
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Star_empty_font_awesome.svg"
                  width="20"
                  height="20"
                />
              )}
            </label>
          </div>
        </Card.Title>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
      <Card.Footer className="myCard-footer">
        <Button onClick={props.deleteItem} variant="danger">
          Delete
        </Button>
        <Link to={`/itemlist/${id}`}>
          <Button variant="primary">Detail</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
