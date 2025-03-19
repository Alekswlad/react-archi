import { Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contacts from "./Pages/Contacts";
import Blog from "./Pages/Blog";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [isAdded, setIsAdded] = React.useState(false);

  return (
    <AppContext.Provider value={{ items, cartItems, isAdded }}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
