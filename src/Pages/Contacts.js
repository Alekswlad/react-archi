import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../Foto/Logo1.jpg";

export default function Contacts() {
  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">
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
              <Link className=" menu-link" to="/">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2>Привіт наші контакти!</h2>
    </>
  );
}
