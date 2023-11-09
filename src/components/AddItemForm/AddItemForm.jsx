import Button from "react-bootstrap/Button";

export default function AddItemForm(props) {
  return (
    <div>
      <form onSubmit={props.addItem}>
        <h1>Add new item form</h1>
        <input
          placeholder="Add title"
          onChange={(e) => props.setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Add body"
          onChange={(e) => props.setBody(e.target.value)}
          required
        />
        <Button variant="primary" type="submit">Add item</Button>
      </form>
      <Button onClick={props.stopAddingItem} variant="danger">
        Cancel
      </Button>
    </div>
  );
}
