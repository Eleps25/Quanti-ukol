import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import "./style.css";

export default function ItemDetail(props) {
  const { body } = props.item;

  return (
    <div className="ItemDetail-container">
      <p>{body}</p>
      <section className="ItemDetail-buttons">
        <Button onClick={props.changeEdit}>Edit</Button>
        <Link to={"/itemlist"}>
          <Button type="button">Back</Button>
        </Link>
      </section>
    </div>
  );
}
