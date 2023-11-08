import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

export default function ItemDetail(props) {
  const { id, isImportant, title, body } = props.item;

  return (
    <div>
      <h1>Item Detail - {id}</h1>
      <input type="checkbox" value={isImportant} />
      <h2>{title}</h2>
      <p>{body}</p>
      <div>
      <Button onClick={props.changeEdit}>Edit</Button>
      <Link to={"/itemlist"}><Button type="button">Back</Button></Link>
      </div>
    </div>
  );
}
