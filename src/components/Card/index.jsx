import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import styles from "./Card.module.scss";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  loading = false,
}) {
  const { isItemAdded, isItemFavorited } = React.useContext(AppContext);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={220}
          viewBox="0 0 150 220"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect
            x="408"
            y="112"
            rx="0"
            ry="0"
            width="138"
            height="120"
          />
          <rect
            x="0"
            y="0"
            rx="10"
            ry="10"
            width="150"
            height="119"
          />
          <rect
            x="0"
            y="125"
            rx="5"
            ry="5"
            width="150"
            height="15"
          />
          <rect
            x="0"
            y="145"
            rx="5"
            ry="5"
            width="123"
            height="15"
          />
          <rect
            x="0"
            y="190"
            rx="5"
            ry="5"
            width="80"
            height="25"
          />
          <rect
            x="118"
            y="184"
            rx="5"
            ry="5"
            width="32"
            height="32"
          />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                src={
                  isItemFavorited(id) ? "/img/liked.svg" : "/img/unliked.svg"
                }
                alt="Favorite"
                onClick={onClickFavorite}
              />
            </div>
          )}

          <img
            width={133}
            height={112}
            src={imageUrl}
            alt=""
          />
          <h5 className="flex">{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
