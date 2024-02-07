 # Aplicativo ˜Carrossel de Imagens˜

> Este aplicativo é uma implementação de um carrossel de imagens dinâmico alimentado por uma lista de cadastros de imagens✨

<br>🐞

> https://carrousel-app.vercel.app/ <- Página do App

**Funcionalidades:**

* **Página Carrossel:** Exibe um carrossel de imagens, ordenadas de acordo com sua importância. 
* **Página Cadastro:** Permite cadastrar, editar e excluir imagens, mantendo o carrossel sempre atualizado. ️

**Tecnologias utilizadas:**

* **TypeScript:** Para um código mais organizado e com tipagem forte. 
* **React Hooks:** Para um gerenciamento de estado e efeitos colaterais mais eficiente. ♻️
* **Fluent UI:** Para uma interface de usuário moderna e responsiva, seguindo as diretrizes de design da Microsoft. 
* **Mock API:** Para simular uma API de back-end, permitindo o desenvolvimento sem a necessidade de um servidor real. 

**Estrutura de Dados:**

Cada imagem é representada por uma interface simples:

```typescript
export interface Imagem {
  titulo: string;
  descricao: string;
  imagem: string;
  link: string;
  ordem: number;
}
```

**Seções principais:**

* **Página Carrossel:** 
    * Navegação por "bullets" para acesso rápido a cada imagem. 
    * Navegação por setas para uma experiência fluida. ⬅️➡️
    

* **Página Cadastro:** ️
    * Listagem de todas as imagens cadastradas, ordenadas pela sua ordem.
    * Cadastro de novas imagens, com campos obrigatórios para garantir a completude das informações.
    * Edição de imagens existentes, permitindo atualizar seus dados.
    * Exclusão de imagens, com um modal de confirmação para evitar remoções acidentais.

**Requisitos adicionais atendidos:**

* Uso de TypeScript para tipagem forte e melhor organização do código.  ✅
* Emprego de React Hooks para um gerenciamento de estado mais eficiente. ✅
* Construção da interface com Fluent UI, seguindo as diretrizes de design da Microsoft. ✅
* Estrutura de REST API mockada com Mock API. ✅

**Materiais auxiliares:**

* Fluent UI: [https://developer.microsoft.com/en-us/fluentui#/get-started](https://developer.microsoft.com/en-us/fluentui#/get-started)  
* Mock API: [https://mockapi.io/](https://mockapi.io/)  


### Conclusão

> Este aplicativo atende aos requisitos especificados e fornece uma implementação funcional de um carrossel de imagens, pronto para ser utilizado e aprimorado!

<br>
<br>

# Anotações do Projeto

Acompanhe o progresso e as próximas etapas:

* [Página do Notion com anotações e diário de bordo](https://jpdosher.notion.site/SharePrime-teste-Carrossel-86d26fa071914db795a51f44ad0de406?pvs=4)  

**Tarefas em andamento:**

- [x] Pesquisa sobre Fluent UI  ✅
- [ ] Verificar responsividade 
- [x] Compor ReadMe para o repositório 
- [ ] Bolar testes [ver em Pesquisa](https://www.notion.so/Pesquisa-50f0f5b1897348408d4bf8d602a51161?pvs=21) 

## Bugs identificados:

* **Slider:**
    - [x] Arrows e Dots não estão aparecendo 
    - [x] Criar box para reduzir DIV 
* **Cadastro:**
    - [ ] Esclarecer sobre "URL direcionamento" 
    - [x] MODAL de confirmação de edição
     - [ ]  Função para forçar renderização não funciona -não está atualizando/renderizando lista qua, itens têm sua ordem alterada, porém não renderiza a lista (para EDIT e NEW ITEM)
     - [x]  Adicionar um item em uma posição não está reescrevendo a Ordem dos demais itens
     - [x]  Excluir item não está reescrevendo a Ordem dos demais itens
     - [ ]  Atualizar ordem de item de 1º para última posição não atualiza demais itens

## Melhorias no projeto (sugestões)

- Dark Theme
- Workspaces no VS Code +
- ToolTips
- Lista com scrooling (surface fixada)
- https://codesandbox.io/ para demonstração do projeto


<br>

---

### Palavras-chave:

#REACT |
#FLUENT UI |
#TYPESCRIPT | 