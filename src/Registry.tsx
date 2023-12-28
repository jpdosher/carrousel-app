import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  DetailsRow,
  IDetailsRowStyles,
  IDetailsRowProps,
  IconButton,
} from "@fluentui/react";

import "./Registry.css";

const API_URL = "https://658bd778859b3491d3f4e033.mockapi.io/api/v1/Cadastro";





interface CadastroProps {
  // Define your props here if needed
}

const Cadastro: React.FC<CadastroProps> = (props) => {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState<IColumn[]>([
    {
      key: "Id",
      name: "ID",
      fieldName: "Id",
      minWidth: 20,
      maxWidth: 40,
      isMultiline: false,
      
    },
    {
      key: "Titulo",
      name: "Título",
      fieldName: "Titulo",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "Descricao",
      name: "Descrição",
      fieldName: "Descricao",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "Imagem",
      name: "Image",
      fieldName: "Imagem",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "Link",
      name: "Link",
      fieldName: "Link",
      minWidth: 150,
      maxWidth: 180,
    },
    {
      key: "Ordem",
      name: "Ordem",
      fieldName: "Ordem",
      
      minWidth: 50,
      maxWidth: 60,
    },
    {
      key: "edit",
      name: "Edit",
      fieldName: "edit",
      minWidth: 30,
      maxWidth: 50,
      onRender: (item) => (
        <IconButton
          iconProps={{ iconName: "Edit" }}
          onClick={() => handleEdit(item)}
        />
      ),
    },
    {
      key: "delete",
      name: "Delete",
      fieldName: "delete",
      minWidth: 30,
      maxWidth: 50,
      onRender: (item) => (
        <IconButton
          iconProps={{ iconName: "Delete" }}
          onClick={() => handleDelete(item)}
        />
      ),
    },
  ]);

  useEffect(() => {
    // Fetch data from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []); // Add dependencies if needed

  const handleEdit = (item: any) => {
    // Falta lógica
    console.log("Edit clicked for item:", item);
  };

  const handleDelete = (item: any) => {
    // Falta lógica
    console.log("Delete clicked for item:", item);
  };

  useEffect(() => {
    // Fetch data from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="BoxListaDetalhes">
      <div className="BoxListaDetalhes__Cabecalho">
        <h2>Cadastro de imagens</h2>
        <h2>TEste</h2>
      </div>

      <div className="BoxListaDetalhes__Lista">
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
        />
      </div>
    </div>
  );
};

export default Cadastro;
