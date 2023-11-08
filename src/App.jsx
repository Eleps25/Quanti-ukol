import './App.css'
import ItemList from './components/ItemList/ItemList'
import Item from './components/Item/Item'
import ItemDetail from './components/ItemDetail/ItemDetail'
import ItemEdit from './components/ItemEdit/ItemEdit'

function App() {

  return (
    <>
      <ItemList />
      <hr />
      <Item />
      <hr />
      <ItemDetail />
      <hr />
      <ItemEdit />
    </>
  )
}

export default App
