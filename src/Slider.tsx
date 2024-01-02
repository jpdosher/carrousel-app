import React, { useState, useEffect } from "react";
import SimpleSlider from "react-slick";
import "./slick-theme.css";
import "./slick.css";

const API_URL = "https://658bd778859b3491d3f4e033.mockapi.io/api/v1/Cadastro";

// Definindo a interface para os itens do carrossel
interface CarouselItem {
  ID: number;
  Titulo: string;
  Descricao: string;
  Imagem: string;
  Link: string;
  Ordem: number;
  [key: string]: any;
}

const SliderPage: React.FC = () => {
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = (await response.json()) as CarouselItem[];
        setCarouselData(data.sort((a, b) => a.ordem - b.ordem));
        console.log("Dados obtidos:", data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Configurações do Slider
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
    <div>
      <SimpleSlider {...settings}>
        {carouselData.map((item) => (
          <div key={item.ID} className="custom-slider-item">
            {/* Left side with Titulo and Descrição */}
            <div className="text-container">
              <h3>{item.Titulo}</h3>
              <p>{item.Descricao}</p>
            </div>

            {/* Right side with the image */}
            <div className="image-container">
              <img src={item.Imagem} alt={item.Titulo} />
            </div>
          </div>
        ))}
      </SimpleSlider>
      </div>
    </div>
  );
};

export default SliderPage;
