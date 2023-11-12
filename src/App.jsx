import { Link, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import ItemDetailPage from "./components/ItemDetailPage/ItemDetailPage";
import ItemList from "./components/ItemList/ItemList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itemlist" element={<ItemList />} />
        <Route path="/itemlist/:id" element={<ItemDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
