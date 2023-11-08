import { Link } from "react-router-dom"

export default function Item(props) {
    const {id, title, body, isImportant} = props.item
    return (
        <div>
            <h2><Link to={`/itemlist/${id}`}>Item</Link> {id}: {isImportant? "is important": "not important"}</h2>
            <h3>{title}</h3>
            <p>{body}</p>
            <input onChange={props.updateItemImportant} type="checkbox" checked={isImportant} />
        </div>
    )
}