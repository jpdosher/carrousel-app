import React, { useState, useEffect } from "react";
import SimpleSlider from "react-slick";
import "./slick-theme.css";
import "./slick.css";

const API_URL = "https://658bd778859b3491d3f4e033.mockapi.io/api/v1/Cadastro";

// Interface para definir a estrutura dos itens do carrossel
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
  // Estado para armazenar os dados do carrossel
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);

  useEffect(() => {
    // Função para buscar dados da API
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = (await response.json()) as CarouselItem[];

        // Ordena os itens pelo campo "Ordem"
        setCarouselData(data.sort((a, b) => a.Ordem - b.Ordem));

        console.log("Dados obtidos:", data);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };

    fetchData(); // Executa a busca de dados
  }, []);

  // Configurações do Slider (dots, arrows, etc.)
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
              <div className="text-container">
                <h3>{item.Titulo}</h3>
                <p>{item.Descricao}</p>
              </div>
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

export default Slider;
