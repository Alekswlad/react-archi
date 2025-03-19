import React from "react";
import { Button } from "react-bootstrap";
import ContentLoader from "react-content-loader";

import { HomeContext } from "../Pages/Home";

function Card({ id, imageUrl, title, price, onPlus, loading = false }) {
  const { isItemAdded } = React.useContext(HomeContext);

  const onClickPlus = () => {
    onPlus({ id, parentId: id, imageUrl, title, price });
  };

  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={180}
          height={200}
          viewBox="0 0 180 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="126" rx="5" ry="5" width="160" height="15" />
          <rect x="0" y="148" rx="5" ry="5" width="130" height="15" />
          <rect x="0" y="178" rx="5" ry="5" width="90" height="20" />
          <rect x="113" y="178" rx="5" ry="5" width="50" height="20" />
          <rect x="0" y="0" rx="5" ry="5" width="160" height="106" />
        </ContentLoader>
      ) : (
        <div>
          {isItemAdded(id) && (
            <svg
              className="cart-svg"
              onClick={onClickPlus}
              width="25"
              height="25"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6043_11153)">
                <path
                  d="M2.03125 3.85352H12.9687"
                  stroke="#EF3E33"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.753 3.85352V12.3605C11.753 12.9681 11.1454 13.5757 10.5378 13.5757H4.46137C3.85373 13.5757 3.24609 12.9681 3.24609 12.3605V3.85352"
                  stroke="#EF3E33"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.06934 3.85341V2.63813C5.06934 2.03049 5.67697 1.42285 6.28461 1.42285H8.71517C9.32281 1.42285 9.93045 2.03049 9.93045 2.63813V3.85341"
                  stroke="#EF3E33"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_6043_11153">
                  <rect
                    width="14.5833"
                    height="14.5833"
                    fill="white"
                    transform="translate(0.208008 0.208008)"
                  />
                </clipPath>
              </defs>
            </svg>
          )}
          <img width={133} height={112} src={imageUrl} alt="cros1" />
          <h5>{title}</h5>
          <div className="cardBotton">
            <div>
              <span>Ціна </span>
              <b>{price} грн.</b>
            </div>
            <Button
              className="button"
              onClick={onClickPlus}
              variant="outline-info"
            >
              Купити
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Card;
