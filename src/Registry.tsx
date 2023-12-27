import React, { useState, useEffect } from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from "@fluentui/react";

const API_URL = "https://658bd778859b3491d3f4e033.mockapi.io/api/v1/Cadastro";

interface CadastroProps {
  // Define your props here if needed
}

const Cadastro: React.FC<CadastroProps> = (props) => {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState<IColumn[]>([

    {
      key: "Id",
      name: "Id",
      fieldName: "Id",
      isResizable: true,
      minWidth: 20,
      maxWidth: 40,
    },
    {
      key: "Titulo",
      name: "Título",
      fieldName: "Titulo",
      isResizable: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "Descricao",
      name: "Description",
      fieldName: "Descricao",
      isResizable: true,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      key: "Imagem",
      name: "Image",
      fieldName: "Imagem",
      isResizable: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "Link",
      name: "Link",
      fieldName: "Link",
      isResizable: true,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      key: "Ordem",
      name: "Ordem",
      fieldName: "Ordem",
      isResizable: true,
      minWidth: 50,
      maxWidth: 100,
    }
  ]);

  useEffect(() => {
    // Fetch data from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []); // Add dependencies if needed

  return (
    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
      <DetailsList
        items={items}
        columns={columns}
        setKey="set"
        selectionPreservedOnEmptyClick={true}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionMode={SelectionMode.none}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        
        // Set a fixed width or percentage width for the table
        // For example, maxWidth: "800px" or width: "80%"
        // Adjust this based on your layout and design preferences style={{ width: "100%" }}
      />
    </div>
  );
};

export default Cadastro;
