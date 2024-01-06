import React, { useState, useEffect } from "react";
import "./Slider.css";

const API_URL = "https://658bd778859b3491d3f4e033.mockapi.io/api/v1/Cadastro";

interface CarouselItem {
  ID: number;
  Titulo: string;
  Descricao: string;
  Imagem: string;
  Link: string;
  Ordem: number;
  [key: string]: any;
}

const Slider: React.FC = () => {
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = (await response.json()) as CarouselItem[];

        setCarouselData(data.sort((a, b) => a.Ordem - b.Ordem));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length
    );
  };

  return (
    <div className="slider-outer-container">
      <div className="slider-container">
        <div className="custom-slider">
          {carouselData.map((item, index) => (
            <div
              key={item.ID}
              className={`custom-slider-item ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <div className="text-container">
                <h3>{item.Titulo}</h3>
                <p>{item.Descricao}</p>
              </div>
              <div className="image-container">
                <img
                  src={item.Imagem}
                  alt={item.Titulo}
                  className="carousel-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dots-container">
        {carouselData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
      <div className="external-buttons-container">
        <img
          src="/previous.png"
          alt="Previous"
          className="prev-button"
          onClick={prevSlide}
        />
        <img
          src="/next.png"
          alt="Next"
          className="next-button"
          onClick={nextSlide}
        />
      </div>
    </div>
  );
};

export default Slider;
