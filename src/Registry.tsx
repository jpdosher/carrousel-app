import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  IconButton,
  PrimaryButton,
  DefaultButton,
  Modal,
  initializeIcons,
  TextField,
  PanelType,
} from "@fluentui/react";
import "./Registry.css";
import { Panel } from "@fluentui/react/lib/Panel";

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
  // State for sorting
  const [sortedColumn, setSortedColumn] = useState<string | undefined>(
    undefined
  );
  const [isSortedDescending, setIsSortedDescending] = useState<boolean>(false);

  // Initial state and state for items
  const initialState: ItemCadastro[] = [];
  const [items, setItems] = useState<ItemCadastro[]>(initialState);

  // States related to delete modal
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<"pending" | "success">(
    "pending"
  );
  const [itemToDelete, setItemToDelete] = useState<ItemCadastro | null>(null);

  // States related to edit panel
  const [isEditPanelOpen, setEditPanelOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemCadastro | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);

  // States for edited item properties
  const [editedTitulo, setEditedTitulo] = useState<string>(
    editedItem?.Titulo || ""
  );
  const [editedDescricao, setEditedDescricao] = useState<string>(
    editedItem?.Titulo || ""
  );
  const [editedImagem, setEditedImagem] = useState<string>(
    editedItem?.Titulo || ""
  );
  const [editedLink, setEditedLink] = useState<string>(
    editedItem?.Titulo || ""
  );

  // New state variables for field validation
  const [tituloError, setTituloError] = useState<string | undefined>(undefined);
  const [descricaoError, setDescricaoError] = useState<string | undefined>(
    undefined
  );
  const [imagemError, setImagemError] = useState<string | undefined>(undefined);
  const [linkError, setLinkError] = useState<string | undefined>(undefined);

  // State for success modal visibility
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  // State for new item
  const [isNewItem, setIsNewItem] = useState(false);

  // State for edited item's ordem
  const [editedOrdem, setEditedOrdem] = useState<number>(0);
  const [forceRerender, setForceRerender] = useState(0);

  useEffect(() => {
    if (editedItem) {
      setEditedTitulo(editedItem.Titulo || "");
      setEditedDescricao(editedItem.Descricao || "");
      setEditedImagem(editedItem.Imagem || "");
      setEditedLink(editedItem.Link || "");
      setEditedOrdem(editedItem.Ordem || 0); // Make sure this is correct
    } else {
      // Reset fields for new item
      setEditedTitulo("");
      setEditedDescricao("");
      setEditedImagem("");
      setEditedLink("");
      const highestOrdem = items.reduce(
        (max, item) => Math.max(max, item.Ordem),
        0
      );
      setEditedOrdem(highestOrdem + 1);
    }
  }, [editedItem, items]);

  //colunas
  const [columns, setColumns] = useState<IColumn[]>([
    {
      key: "ID",
      name: "ID", //nome coluna
      fieldName: "ID", //Ref dados
      minWidth: 20,
      maxWidth: 40,
    },
    {
      key: "Ordem",
      name: "Ordem", //nome coluna
      fieldName: "Ordem", //Ref dados
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
    // Fetch data from the API (update)
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

          return isSortedDescending
            ? bValueNumber - aValueNumber
            : aValueNumber - bValueNumber;
        });

        setItems(sortedData);
      });
  }, [isSortedDescending]);

  // Function to validate form fields
  const validateForm = () => {
    let isValid = true;

    // Validation for Titulo
    if (!editedTitulo.trim()) {
      setTituloError("Título é obrigatório");
      isValid = false;
    } else {
      setTituloError(undefined);
    }

    // Validation for Descricao
    if (!editedDescricao.trim()) {
      setDescricaoError("Descrição é obrigatória");
      isValid = false;
    } else {
      setDescricaoError(undefined);
    }

    // Validation for Imagem
    if (!editedImagem.trim()) {
      setImagemError("URL do Arquivo é obrigatório");
      isValid = false;
    } else {
      setImagemError(undefined);
    }

    // Validation for Link
    if (!editedLink.trim()) {
      setLinkError("URL direcionamento é obrigatório");
      isValid = false;
    } else {
      setLinkError(undefined);
    }

    return isValid;
  };

  const handleEdit = (item: ItemCadastro) => {
    setIsNewItem(false);
    setEditedItem(item);
    setEditPanelOpen(true);
  };

  const handleCancelEdit = () => {
    setEditPanelOpen(false);
    setEditedItem(null);
    setIsSaving(false);
  };

  const handleSaveEdit = () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true); // Start saving process

    const itemData = {
      Titulo: editedTitulo,
      Descricao: editedDescricao,
      Imagem: editedImagem,
      Link: editedLink,
      Ordem: editedOrdem,
    };

    if (isNewItem) {
      updateOrdemAfterAdd(editedOrdem); // Atualiza a ordem antes de adicionar o novo item

      // Handle creating a new item
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      })
        .then((response) => response.json())
        .then((newItem) => {
          // Add the new item to the list of items
          setItems((prevItems) => [...prevItems, newItem]);
          setEditPanelOpen(false);
          setIsNewItem(false);
        })

        .catch((error) => {
          console.error("Error adding new item:", error);
        })
        .finally(() => {
          setIsSaving(false); // End saving process
        });
    } else if (editedItem) {
      const oldOrdem = editedItem.Ordem;

      // Ensure 'Ordem' is unique
      const isOrdemAlreadyUsed = items.some(
        (item) => item.Ordem === editedOrdem && item.ID !== editedItem.ID
      );
      if (isOrdemAlreadyUsed) {
        // Handle error or provide user feedback
        console.error("Error: Duplicate 'Ordem' value");
        // Find the existing item with the same order
        const existingItem = items.find(
          (item) => item.Ordem === editedOrdem && item.ID !== editedItem.ID
        );

        if (existingItem) {
          const newOrdem = oldOrdem; // Move the existing item up by one step
          updateOrdemAfterEdit(existingItem.Ordem, newOrdem);
          setEditedOrdem(existingItem.Ordem); // Set the edited item's order to the existing item's order
        } else {
          
          console.error("Error: Duplicate 'Ordem' value");
          return;
        }
      }
        

      if (oldOrdem !== editedOrdem) {
        updateOrdemAfterEdit(oldOrdem, editedOrdem);
      }

      // Validate mandatory fields
      if (!validateForm()) {
        return;
      }

      const updatedData = {
        Titulo: editedTitulo,
        Descricao: editedDescricao,
        Imagem: editedImagem,
        Link: editedLink,
        Ordem: editedOrdem,
      };

      const putUrl = `${API_URL}/${editedItem.ID}`;

      setIsSaving(true);

      fetch(putUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.ok) {
            const updatedItems = items.map((item) =>
              item.ID === editedItem.ID ? { ...item, ...updatedData } : item
            );

            setEditPanelOpen(false);
            // setSuccessModalVisible(true);
            setEditedItem(null);
            setItems(updatedItems);
          } else {
            console.error("Failed to update item");
          }
        })
        .catch((error) => {
          console.error("Error updating item", error);
        })
        .finally(() => {
          setIsSaving(false);
        });
    }

    // Trigger rerender after changes
    setForceRerender((prev) => prev + 1);
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
      updateOrdemAfterDelete(itemToDelete.Ordem); // Atualiza a ordem antes de excluir o item

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

  const handleAddNew = () => {
    setIsNewItem(true);
    setEditedItem(null);
    setEditPanelOpen(true);
    setEditedTitulo("");
    setEditedDescricao("");
    setEditedImagem("");
    setEditedLink("");
    setEditedOrdem(items.length + 1);
    // Reset validation errors
    setTituloError(undefined);
    setDescricaoError(undefined);
    setImagemError(undefined);
    setLinkError(undefined);
    // Find the highest 'Ordem' number
    const highestOrdem = items.reduce(
      (max, item) => Math.max(max, item.Ordem),
      0
    );
    setEditedOrdem(highestOrdem + 1); // Set to highest 'Ordem' + 1
  };

  const updateOrdemAfterAdd = (newOrdem: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.Ordem >= newOrdem ? { ...item, Ordem: item.Ordem + 1 } : item
      )
    );
  };

  const updateOrdemAfterEdit = (oldOrdem: number, newOrdem: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (oldOrdem < newOrdem) {
          return item.Ordem > oldOrdem && item.Ordem <= newOrdem
            ? { ...item, Ordem: item.Ordem - 1 }
            : item;
        } else {
          return item.Ordem < oldOrdem && item.Ordem >= newOrdem
            ? { ...item, Ordem: item.Ordem + 1 }
            : item;
        }
      })
    );
  };

  const updateOrdemAfterDelete = (deletedOrdem: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.Ordem > deletedOrdem ? { ...item, Ordem: item.Ordem - 1 } : item
      )
    );
  };

  const textFieldStyles = {
    fieldGroup: {
      fontSize: "30px",
    },
  };

  /*
  //****************   JSX  ******************************************************
  */

  return (
    <div className="BoxListaDetalhes">
      <div className="BoxListaDetalhes__Cabecalho">
        <h2>Cadastro de imagens</h2>
        <PrimaryButton
          text="+ Nova Imagem"
          onClick={handleAddNew}
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
          key={forceRerender} // Add key prop to trigger rerender
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
              <PrimaryButton
                text="Fechar"
                onClick={handleCancelDelete}
                styles={{
                  root: { backgroundColor: "#FAB416", borderColor: "#FAB416" },
                }}
              />
            ) : (
              <div style={{ textAlign: "right" }}>
                <DefaultButton
                  text="Cancelar"
                  onClick={handleCancelDelete}
                  style={{ marginRight: 10 }}
                />
                <PrimaryButton
                  text="Excluir"
                  onClick={handleConfirmDelete}
                  styles={{
                    root: {
                      backgroundColor: "#FAB416",
                      borderColor: "#FAB416",
                    },
                  }}
                />
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Edit Side Panel */}

      {isEditPanelOpen && (editedItem || isNewItem) && (
        <Panel
          isOpen={isEditPanelOpen}
          onDismiss={handleCancelEdit}
          headerText={isNewItem ? "Adicionar Nova Imagem" : "Editar Imagem"}
          type={PanelType.medium}
          isLightDismiss={true}
          styles={{
            main: { padding: "10px", paddingTop: "40px" },
            headerText: { fontSize: "22px", lineHeight: "22px" },
          }}
        >
          <form>
            {/* Edit form fields with error messages */}
            <TextField
              label="Título"
              value={editedTitulo}
              required
              disabled={false}
              errorMessage={tituloError}
              onChange={(event, newValue) => {
                setEditedTitulo(newValue || "");
                setTituloError(undefined); // Clear error on change
              }}
              styles={textFieldStyles}
            />
            <TextField
              label="Descrição"
              value={editedDescricao}
              required
              disabled={false}
              errorMessage={descricaoError}
              onChange={(event, newValue) => {
                setEditedDescricao(newValue || "");
                setDescricaoError(undefined);
              }}
              styles={textFieldStyles}
            />
            <TextField
              label="URL do Arquivo"
              value={editedImagem}
              required
              disabled={false}
              errorMessage={imagemError}
              onChange={(event, newValue) => {
                setEditedImagem(newValue || "");
                setImagemError(undefined);
              }}
              styles={textFieldStyles}
            />
            <TextField
              label="URL direcionamento"
              value={editedLink}
              required
              disabled={false}
              errorMessage={linkError}
              onChange={(event, newValue) => {
                setEditedLink(newValue || "");
                setLinkError(undefined);
              }}
              styles={textFieldStyles}
            />
            <TextField
              label="Ordem"
              type="number"
              value={editedOrdem.toString()}
              onChange={(event, newValue) => {
                const newOrdem = newValue
                  ? Math.min(
                      Math.max(1, parseInt(newValue)),
                      isNewItem ? items.length + 1 : items.length
                    )
                  : 0;
                setEditedOrdem(newOrdem);
              }}
              min={1}
              max={isNewItem ? items.length + 1 : items.length}
            />
          </form>
          {/* Edit form buttons */}

          <div
            style={{
              padding: "30px",
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              margin: 0,
            }}
          >
            <DefaultButton
              text="Cancelar"
              onClick={handleCancelEdit}
              disabled={isSaving}
            />
            <PrimaryButton
              text={isNewItem ? "Cadastrar Imagem" : "Salvar alterações"}
              onClick={handleSaveEdit}
              disabled={isSaving}
              styles={{
                root: { backgroundColor: "#FAB416", border: "0px" },
              }}
            />
          </div>

          {isSuccessModalVisible && (
            <Modal
              isOpen={isSuccessModalVisible}
              onDismiss={() => setSuccessModalVisible(false)}
              isBlocking={false}
              containerClassName="customModal"
            >
              <div style={{ padding: 20, width: 400 }}>
                <h2 style={{ fontSize: 18 }}>Sucesso</h2>
                <p style={{ fontSize: 14 }}>Item editado com sucesso!</p>
                <PrimaryButton
                  text="Fechar"
                  onClick={() => setSuccessModalVisible(false)}
                  styles={{
                    root: {
                      backgroundColor: "#FAB416",
                      borderColor: "#FAB416",
                    },
                  }}
                />
              </div>
            </Modal>
          )}
        </Panel>
      )}
    </div>
  );
};

export default Cadastro;
