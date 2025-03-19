import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import logo from "./Foto/Logo1.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import { HomeContext } from "./Pages/Home";
import Drawer from "./Components/Drawer";

import { FaShoppingCart } from "react-icons/fa";
import EmptyCart from "./Foto/empty-cart.png";
import Order from "./Foto/order.png";

export const MenuContext = React.createContext({});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Menu({ items = [], onRemove }) {
  const [cartOpened, setCartOpened] = React.useState(false);
  const { cartItems, setCartItems } = React.useContext(HomeContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const toggle = () => {
    setCartOpened((prevCartOpened) => !prevCartOpened);
  };

  const onClickOrder = async () => {
    setIsLoading(true);
    localStorage.setItem("cartItems", cartItems);
    setIsOrderComplete(true);
    setCartItems([]);
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      await axios.delete(
        "https://62dd9e31ccdf9f7ec2cadb07.mockapi.io/cart/" + item.id
      );
      await delay(1000);
    }
    setIsLoading(false);
  };

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <MenuContext.Provider value={{ cartOpened, setCartOpened }}>
      <>
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="md"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Brand to="/">
              <img
                src={logo}
                height="33"
                width="108"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto menu-link">
                <Link className="mr-auto menu-link" to="/">
                  Головна
                </Link>
                <Link className=" menu-link" to="/about">
                  Про нас
                </Link>
                <Link className=" menu-link" to="/contacts">
                  Контакти
                </Link>
                <Link className=" menu-link" to="/blog">
                  Блог
                </Link>
              </Nav>
              <div onClick={toggle} className="shopping-cart">
                <FaShoppingCart />
                <span className="heartBeat"> {totalPrice} грн</span>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {items.length > 0 ? (
          <div>
            <div className={`overlay ${cartOpened ? "active" : ""}`}>
              <div className="drawer">
                <h2 className="">
                  Козина{" "}
                  <svg
                    onClick={() => setCartOpened(false)}
                    className="removeBta"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="31"
                      height="31"
                      rx="7.5"
                      fill="white"
                      stroke="#DBDBDB"
                    />
                    <path
                      d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                      fill="#B5B5B5"
                    />
                  </svg>
                </h2>

                <div className="cartItem ">
                  {items.map((obj) => (
                    <div key={obj.id}>
                      <img
                        width={60}
                        height={40}
                        src={obj.imageUrl}
                        alt="foto"
                      />
                      <div>
                        <p>{obj.title}</p>
                        <b>{obj.price} грн </b>
                        <Button className="button" variant="outline-info">
                          Додати
                        </Button>
                        <svg
                          onClick={() => onRemove(obj.id)}
                          className="removeBta"
                          width="25"
                          height="25"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="31"
                            height="31"
                            rx="7.5"
                            fill="white"
                            stroke="#DBDBDB"
                          />
                          <path
                            d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                            fill="#B5B5B5"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}

                  <div className="totalBlock">
                    <div className="cartTotal ">
                      <span>Загальна вартість</span>
                      <div className="cartTotalBlock"></div>
                      <b>{totalPrice}грн</b>
                    </div>
                    <div className="cartTotal ">
                      <span>В т.ч. ПДВ 20%</span>
                      <div className="cartTotalBlock"></div>
                      <b>{totalPrice * 0.2}грн</b>
                    </div>
                  </div>
                  <Button
                    disabled={isLoading}
                    onClick={onClickOrder}
                    className="button btn"
                    variant="outline-info "
                  >
                    Оформити заказ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Drawer
            title={isOrderComplete ? "Замовлення оформлено!" : "Я ще пустенька"}
            image={isOrderComplete ? Order : EmptyCart}
            description={
              isOrderComplete
                ? "Ваше замовлення передано менеджуру, ми скоро зв'яжемося з вами"
                : "Добавте хочь щось я заплачу"
            }
          />
        )}
      </>
    </MenuContext.Provider>
  );
}
