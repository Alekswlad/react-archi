import React from "react";
import axios from "axios";

import CarouselBox from "../Components/CarouselBox";
import Plas from "../Foto/x.png";
import Card from "../Components/Card";

import Menu from "../menu";
// масив товарів для прикладу
// const arr = [
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros1.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros2.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros3.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros4.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros5.png",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros6.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros7.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros8.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros9.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros10.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros10.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros10.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros10.jpg",
//   },
//   {
//     title: "Дитячі кросівки",
//     price: 300,
//     imageUrl: "./Tovar/cros10.jpg",
//   },
// ];

export const HomeContext = React.createContext({});

function Home() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    // Запрос на сервер через фетч для прикладу залишив
    // fetch("https://62dd9e31ccdf9f7ec2cadb07.mockapi.io/Items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          "https://62dd9e31ccdf9f7ec2cadb07.mockapi.io/cart"
        );
        const itemResponse = await axios.get(
          "https://62dd9e31ccdf9f7ec2cadb07.mockapi.io/Items"
        );
        setIsLoading(false);

        setCartItems(cartResponse.data);
        setItems(itemResponse.data);
      } catch (error) {
        alert("Виникла помилка");
        console.error(error);
      }
    }
    fetchData();
  }, []);
  // додаем в корзину товар
  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id)
    );
    if (findItem) {
      await axios.delete(
        `https://62dd9e31ccdf9f7ec2cadb07.mockapi.io/cart/${findItem.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.parentId) !== Number(obj.id))
      );
    } else {
      const { data } = await axios.post(
        "https://62dd9e31ccdf9f7ec2cadb07.mockapi.io/cart",
        obj
      );
      setCartItems((prev) => [...prev, data]);
    }
  };
  // видаляэм з корзини товар
  const deleteItem = (id) => {
    try {
      axios.delete(`https://62dd9e31ccdf9f7ec2cadb07.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Помилака при видалені з корзини");
      console.error(error);
    }
  };

  // фильтрация по назве товару
  const searchInput = (event) => {
    setSearchValue(event.target.value);
  };
  // Відслідкувати чи додано ітем
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };
  //
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(20)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <HomeContext.Provider
      value={{ items, cartItems, isItemAdded, setCartItems }}
    >
      <div>
        <Menu items={cartItems} onRemove={deleteItem} />

        <div className="d-flex">
          <CarouselBox />
        </div>
        <div className="wrapper bg-$gray-200 ">
          <div className="content">
            <div className="d-flex justify-content-between p-4">
              <h3>
                {searchValue
                  ? `Пошук по запиту: "${searchValue}"`
                  : "Наші новинки"}{" "}
              </h3>
              <div className="search-block align-items-center ">
                <img width={35} height={35} src="/lupa1.jpg" alt="Search" />
                <input
                  onChange={searchInput}
                  value={searchValue}
                  size="17"
                  placeholder="Пошук..."
                />
                {searchValue && (
                  <img
                    onClick={() => setSearchValue("")}
                    className="clear"
                    width={17}
                    height={17}
                    src={Plas}
                    alt="clear"
                  />
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap gap-4 justify-content-center">
              {renderItems()}
            </div>
          </div>
        </div>
      </div>
    </HomeContext.Provider>
  );
}

export default Home;
