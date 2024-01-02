# carrousel-app
 Image registry with Carousel Slider
**# Aplicativo Carrossel**

Este aplicativo é uma implementação de um carrossel de imagens, seguindo o protótipo navegável fornecido. O aplicativo é composto por duas páginas:

* **Carrossel:** Exibe uma lista de imagens, ordenadas pelo campo `Ordem`.
* **Cadastro:** Permite cadastrar, editar e excluir imagens.

**Requisitos**

* O aplicativo deve ser desenvolvido em TypeScript.
* O aplicativo deve utilizar React Hooks.
* O aplicativo deve utilizar Fluent UI para construir a página de administração.
* O aplicativo deve utilizar Mock API para estrutura de rest api.

**Estrutura de Dados**

O aplicativo utiliza a seguinte estrutura de dados para representar uma imagem:

```typescript
export interface Imagem {
  titulo: string;
  descricao: string;
  imagem: string;
  link: string;
  ordem: number;
}
```

**Página Carrossel**

A página Carrossel exibe uma lista de imagens, ordenadas pelo campo `Ordem`. A lista é controlada pelo componente `<Carousel>`, que fornece as seguintes funcionalidades:

* Navegação por "bullet"
* Navegação por setas
* Abertura de imagens em nova aba

**Página Cadastro**

A página Cadastro permite cadastrar, editar e excluir imagens. A página é composta pelos seguintes componentes:

* **Listagem:** Exibe uma lista de imagens cadastradas.
* **Cadastro de novo item:** Permite cadastrar uma nova imagem.
* **Edição de item:** Permite editar uma imagem existente.
* **Exclusão:** Permite excluir uma imagem.

**Cadastro de novo item**

O formulário de cadastro de novo item possui os seguintes campos:

* Título
* Descrição
* Imagem
* Link

Todos os campos são obrigatórios. Ao clicar no botão "Salvar", as informações são enviadas para a API de back-end. Se o cadastro for bem-sucedido, uma mensagem de sucesso é exibida.

**Edição de item**

O formulário de edição de item carrega os dados da imagem selecionada na listagem. Todos os campos são editáveis. Ao clicar no botão "Salvar alterações", as informações são enviadas para a API de back-end. Se a edição for bem-sucedida, uma mensagem de sucesso é exibida.

**Exclusão**

Ao clicar no botão "Excluir" de uma imagem na listagem, um modal de confirmação é exibido. Ao confirmar a exclusão, a imagem é excluída da API de back-end e uma mensagem de confirmação é exibida.

**API de back-end**

A API de back-end é responsável por armazenar e recuperar as informações das imagens. A API é mockada usando o Mock API: [https://mockapi.io/](https://mockapi.io/).

**Requisitos adicionais**

Os seguintes requisitos adicionais são atendidos pelo aplicativo:

* O aplicativo é desenvolvido em TypeScript, com os objetos definidos com `type` ou interfaces.
* O aplicativo utiliza React Hooks para gerenciar o estado e os efeitos colaterais.
* O aplicativo utiliza Fluent UI para construir a página de administração.
* O aplicativo utiliza Mock API para estrutura de rest api.
* O aplicativo é entregue via repositório de GIT.

**Materiais auxiliares**

Os seguintes materiais auxiliares foram fornecidos para a implementação do aplicativo:

* **Protótipo navegável:** fornece o layout e a funcionalidade do aplicativo.
* **Paleta de cores e fontes:** define as cores e as fontes utilizadas no aplicativo.
* **Fluent UI:** conjunto de componentes de UI para React.
* **Mock API:** serviço para criar APIs mockadas.
* **Pacote de ícones:** pacote de ícones para utilização no aplicativo.

**Conclusão**

Este aplicativo atende aos requisitos especificados e fornece uma implementação funcional de um carrossel de imagens.