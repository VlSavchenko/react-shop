import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const { items, favorites } = React.useContext(AppContext);

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={item === undefined ? index : item.id}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        favorited={favorites.some((obj) => obj.id === item.id)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img
            src="/img/search.svg"
            alt="Search"
          />
          {searchValue && (
            <img
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
              onClick={() => setSearchValue("")}
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск... "
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
