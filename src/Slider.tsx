import React, { useState, useEffect } from "react";
import "./Slider.css"; // Add your custom styles for the slider

const API_URL = "https://658bd778859b3491d3f4e033.mockapi.io/api/v1/Cadastro";

// Interface to define the structure of carousel items
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


  if (carouselData.length === 0) {
    // Render loading or empty state while data is being fetched
    return <div>Carregando...</div>;
  }

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
      <div className="external-buttons-container">
        <img
          src="src/assets/previous.png"
          alt="Previous"
          className="prev-button"
          onClick={prevSlide}
        />
        <img
          src="src/assets/next.png"
          alt="Next"
          className="next-button"
          onClick={nextSlide}
        />
      </div>
    </div>
  );
};

export default Slider;