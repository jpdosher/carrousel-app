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
  DefaultButton,
  Modal
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
  [key: string]: any;
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

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<"pending" | "success">("pending");
  const [itemToDelete, setItemToDelete] = useState<ItemCadastro | null>(null);

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
      maxWidth: 220,
    },
    {
      key: "Descricao",
      name: "Descrição",
      fieldName: "Descricao",
      minWidth: 150,
      maxWidth: 220,
    },
    {
      key: "Imagem",
      name: "URL do Arquivo",
      fieldName: "Imagem",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "Link",
      name: "URL direcionamento",
      fieldName: "Link",
      minWidth: 150,
      maxWidth: 180,
    },
    {
      key: "delete",
      name: "",
      minWidth: 40,
      maxWidth: 40,
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
      name: "",
      minWidth: 40,
      maxWidth: 40,
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
      .then((data: ItemCadastro[]) => {
        // Sort the data by the specified column
        const sortedData = data.slice().sort((a, b) => {
          const aValue = a.Ordem.toString(); // Ensure the value is treated as a string
          const bValue = b.Ordem.toString(); // Ensure the value is treated as a string

          // Convert values to numbers for proper sorting
          const aValueNumber = parseFloat(aValue);
          const bValueNumber = parseFloat(bValue);

          return isSortedDescending ? bValueNumber - aValueNumber : aValueNumber - bValueNumber;
        });

        setItems(sortedData);
      });
  }, [isSortedDescending]);
  


  const handleEdit = (item: any) => {
    // Falta lógica
    console.log("Edit clicked for item:", item);
  };

  const handleDelete = (item: ItemCadastro) => {
    setItemToDelete(item);
    setDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setItemToDelete(null);
    setDeleteStatus("pending");
  };

  const handleConfirmDelete = () => {
    // Perform the DELETE request to mockAPI
    if (itemToDelete) {
      const itemId = itemToDelete.ID;
      const deleteUrl = `${API_URL}/${itemId}`;

      fetch(deleteUrl, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Remove the deleted item from the local state
            const updatedItems = items.filter((item) => item.ID !== itemId);
            setItems(updatedItems);
            setDeleteStatus("success");
          } else {
            // Handle error if needed
            console.error("Failed to delete item");
          }
        })
        .catch((error) => {
          // Handle error if needed
          console.error("Error deleting item", error);
        });
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
{/* Delete Modal */}
{isDeleteModalVisible && (
        <Modal
          isOpen={isDeleteModalVisible}
          onDismiss={handleCancelDelete}
          isBlocking={false}
          containerClassName="customModal"
        >
          <div style={{ padding: 20, width: 400 }}>
            <h2 style={{ fontSize: 18 }}>
              {deleteStatus === "success" ? "Sucesso" : "Excluir Imagem?"}
            </h2>
            <p style={{ fontSize: 14 }}>
              {deleteStatus === "success"
                ? "Item excluído"
                : "Esta ação não pode ser desfeita"}
            </p>

            {deleteStatus === "success" ? (
              <PrimaryButton text="Fechar" onClick={handleCancelDelete} styles={{ root: { backgroundColor: "#FAB416",borderColor: "#FAB416",} }} />
            ) : (
              <div style={{ textAlign: "right" }}>
                <DefaultButton text="Cancelar" onClick={handleCancelDelete} style={{ marginRight: 10 }} />
                <PrimaryButton text="Excluir" onClick={handleConfirmDelete} styles={{ root: { backgroundColor: "#FAB416",borderColor: "#FAB416", } }} />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Cadastro;