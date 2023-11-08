export default function Item(props) {
    const {id, title, body, isImportant} = props.item
    return (
        <div>
            <h2>Item {id}: {isImportant? "is important": "not important"}</h2>
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    )
}