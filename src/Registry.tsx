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
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { initializeIcons } from "@fluentui/react/lib/Icons";
initializeIcons();

const API_URL = "https://658bd778859b3491d3f4e033.mockapi.io/api/v1/Cadastro";

interface ItemCadastro {
  ID: number;
  Titulo: string;
  Descricao: string;
  Imagem: string;
  Link: string;
  Ordem: number;
}

interface CadastroProps {
  // Define your props here if needed
}

const Cadastro: React.FC<CadastroProps> = (props) => {
  const [sortedColumn, setSortedColumn] = useState<string | undefined>(
    undefined
  );
  const [isSortedDescending, setIsSortedDescending] = useState<boolean>(false);
  const initialState: ItemCadastro[] = [];
  const [items, setItems] = useState<ItemCadastro[]>(initialState);

  const [columns, setColumns] = useState<IColumn[]>([
    {
      key: "ID",
      name: "ID", //nome coluna
      fieldName: "ID", //Ref dados
      minWidth: 20,
      maxWidth: 40,
    },
    {
      key: "Titulo",
      name: "Título",
      fieldName: "Titulo",
      minWidth: 100,
      maxWidth: 180,
    },
    {
      key: "Descricao",
      name: "Descrição",
      fieldName: "Descricao",
      minWidth: 150,
      maxWidth: 180,
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
      isSorted: sortedColumn === "Ordem",
      isSortedDescending: isSortedDescending,
      onColumnClick: (ev, column) => onColumnClick(ev, column),
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
          styles={{
            root: { color: "#FAB416" },
          }}
        />
      ),
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
          styles={{
            root: { color: "#FAB416" },
          }}
        />
      ),
    },
  ]);

  useEffect(() => {
    // Fetch data from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Sort the data by the specified column
        if (sortedColumn) {
          const sortedData = [...data].sort((a, b) => {
            const aValue = a[sortedColumn];
            const bValue = b[sortedColumn];

            if (isSortedDescending) {
              return bValue - aValue;
            } else {
              return aValue - bValue;
            }
          });

          setItems(sortedData);
        } else {
          setItems(data);
        }
      });
  }, [sortedColumn, isSortedDescending]);

  const handleEdit = (item: any) => {
    // Falta lógica
    console.log("Edit clicked for item:", item);
  };

  const handleDelete = (item: any) => {
    // Falta lógica
    console.log("Delete clicked for item:", item);
  };

  //sorting by "Ordem" column with a onClick
  const onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    const { key, isSorted, isSortedDescending } = column;

    if (isSorted) {
      // Toggle sorting direction if the column is already sorted
      setIsSortedDescending(!isSortedDescending);
    } else {
      // Set the column to be sorted and set the direction to ascending
      setSortedColumn(key);
      setIsSortedDescending(false);
    }
  };

  return (
    <div className="BoxListaDetalhes">
      <div className="BoxListaDetalhes__Cabecalho">
        <h2>Cadastro de imagens</h2>
        <PrimaryButton
          text="+ Nova Imagem"
          onClick={() => console.log("Button clicked")}
          styles={{
            root: {
              backgroundColor: "#FAB416",
              color: "white",
              borderColor: "#FAB416",
            },
          }}
        />
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
