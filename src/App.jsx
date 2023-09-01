import axios from "axios";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get("http://localhost:3001/items");
        const cartResponse = await axios.get("http://localhost:3001/cart");
        const favoritesResponse = await axios.get(
          "http://localhost:3001/favorites"
        );

        setIsLoading(false);

        setItems(itemsResponse.data);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
      } catch (error) {
        alert("Fetch data Error");
      }
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => item.id === obj.id)) {
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
      } else {
        axios.post("http://localhost:3001/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`http://localhost:3001/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка при удалении из корзины");
    }
  };

  const onAddToFavorite = (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
      } else {
        axios.post("http://localhost:3001/favorites", obj);
        setFavorites((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Add to favorites error!!!");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.id === id);
  };

  const isItemFavorited = (id) => {
    return favorites.some((obj) => obj.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorited,
        setCartOpened,
        setCartItems,
        onAddToCart,
        onAddToFavorite,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <Favorites
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
              />
            }
          ></Route>
          <Route
            path="/orders"
            element={<Orders />}
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
