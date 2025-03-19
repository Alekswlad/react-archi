import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import sl1 from "../Foto/sl1.jpg";
import sl2 from "../Foto/sl2.jpg";
import sl3 from "../Foto/sl3.jpg";
export default class CarouselBox extends Component {
  render() {
    return (
      <Carousel className="slider">
        <Carousel.Item>
          <img
            className="d-block m-auto w-60"
            src={sl1}
            alt="sl1"
            width={600}
            height={350}
          />
          <Carousel.Caption>
            <h1 className="text-secondary">Одяг та взуття</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block m-auto w-60"
            src={sl2}
            alt="sl2"
            width={600}
            height={350}
          />
          <Carousel.Caption>
            <h1 className="text-secondary">Одяг та взуття</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block m-auto w-60"
            src={sl3}
            alt="sl3"
            width={600}
            height={350}
          />
          <Carousel.Caption>
            <h1 className="text-secondary">Одяг та взуття</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}
