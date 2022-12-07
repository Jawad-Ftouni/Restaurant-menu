import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Menu from "./pages/menu";
import Admin from "./pages/admin";
import CreateItem from "./components/createItem";
import UpdateItem from "./components/updateItem";
import CreateCategory from "./components/createCategory";
import UpdateCategory from "./components/updateCategory";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Menu />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/admin/createItem" exact element={<CreateItem />} />
          <Route path="/admin/updateItem/:id" exact element={<UpdateItem />} />
          <Route
            path="/admin/createCategory"
            exact
            element={<CreateCategory />}
          />
          <Route
            path="/admin/updateCategory/:id"
            exact
            element={<UpdateCategory />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
