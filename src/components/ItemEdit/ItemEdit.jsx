import { useState } from "react";

import Button from "react-bootstrap/Button";

export default function ItemEdit(props) {
  const { title, body} = props.item;

  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);

  return (
    <div>
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        placeholder="Title..."
      />
      <textarea
        onChange={(e) => setNewBody(e.target.value)}
        value={newBody}
        placeholder="Body..."
      />
      <div>
        <Button onClick={props.changeEdit}>Stop Editing</Button>
        <Button>Update</Button>
      </div>
    </div>
  );
}
