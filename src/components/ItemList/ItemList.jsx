import { useState } from "react"
import Item from "../Item/Item"

export default function ItemList() {
    const [items, setItems] = useState([
        {id: 1, title: "Antique table", body: "A really nice old wooden table with four legs. Probably from 16th century", isImportant: true},
        {id: 2, title: "Oil painting", body: "Painting of a lighthouse in the storm. Origin unknown.", isImportant: false}
    ])
    return (
        <div>
            <h1>Item List</h1>
            {items.map((item) => <Item item={item} key={item.id} />)}
        </div>
    )
}
