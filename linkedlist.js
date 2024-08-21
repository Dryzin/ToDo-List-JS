class No {
  constructor(novoDado) {
    this.dado = novoDado;
    this.ant = null;
    this.prox = null;
  }
}
//-----------------------
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addElemento(tarefa) {
    const novoNo = new No(tarefa);

    if (this.head === null) {
      this.head = this.tail = novoNo;
    } else {
      let atual = this.head;

      // Encontrar a posição correta para inserir o novo nó
      while (atual && atual.dado.prioridade <= tarefa.prioridade) {
        atual = atual.prox;
      }

      // Inserir no início
      if (atual === this.head) {
        novoNo.prox = this.head;
        this.head.ant = novoNo;
        this.head = novoNo;
      }
      // Inserir no final
      else {
        if (atual === null) {
          // Se não houver nó seguinte
          this.tail.prox = novoNo;
          novoNo.ant = this.tail;
          this.tail = novoNo;
        } else {
          // Inserir no meio
          novoNo.prox = atual;
          novoNo.ant = atual.ant;
          atual.ant.prox = novoNo;
          atual.ant = novoNo;
        }
      }
    }

    this.length++;
  }

  removeElemento() {
    if (this.head === null) return null;
    const tarefaRemovida = this.head.dado;
    // Atualiza o head para o próximo nó
    this.head = this.head.prox;
    // Se houver um novo head, ajusta o ponteiro ant
    if (this.head) {
      this.head.ant = null;
    } else {
      // Se não houver novo head, a lista está vazia
      this.tail = null;
    }
    this.length--;
    return tarefaRemovida;
  }

  removeElementoById(id) {
    let atual = this.head;
    while (atual) {
      if (atual.dado.id === id) {  // Comparando pelo ID
        if (atual.ant) {
          atual.ant.prox = atual.prox;
        } else {
          this.head = atual.prox;
        }

        if (atual.prox) {
          atual.prox.ant = atual.ant;
        } else {
          this.tail = atual.ant;
        }

        this.length--;
        return true;
      }
      atual = atual.prox;
    }
    return false;
  }

  atualizarLista() {
    const listaTarefas = document.getElementById("lista-tarefas"); // Certifique-se de que o ID está correto
    listaTarefas.innerHTML = ""; // Limpar a lista antes de atualizar

    if (!minhaLista.isEmpty()) {
      for (const tarefa of minhaLista) {
        const novaLinha = document.createElement("li");
        novaLinha.className = "list-group-item";

        // Criar o checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-2";
        checkbox.value = tarefa.id; // Associar o ID da tarefa ao checkbox

        // Adicionar descrição da tarefa
        const label = document.createElement("label");
        label.textContent = tarefa.toString();
        label.className = "form-check-label";

        // Adicionar checkbox e label ao item da lista
        novaLinha.appendChild(checkbox);
        novaLinha.appendChild(label);

        // Adicionar item à lista
        listaTarefas.appendChild(novaLinha);
      }
    } else {
      listaTarefas.innerHTML = "<li>Lista de Tarefas Vazia</li>";
    }
  }



  isEmpty() {
    return this.head === null;
  }

  //-------------------------------------
  //Quando um objeto tem uma propriedade [Symbol.iterator], ele pode ser iterado com construções como [ for(const item of minhaLista)*/

  [Symbol.iterator]() {
    let currentNode = this.head;
    return {
      next: function () {
        if (currentNode !== null) {
          let value = currentNode.dado;
          currentNode = currentNode.prox;
          return { value: value, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
  //—----------------
  toString() {
    let result = "";
    let currentNode = this.head;
    while (currentNode !== null) {
      result += currentNode.dado + (currentNode.prox ? " -> " : "");
      currentNode = currentNode.prox;
    }
    return result;
  }
  //----------------
  addAtIndex(index, data) {
    console.log("Index:" + index);
    if (index < 0) {
      console.log(
        "Indice invalido. O indice deve ser um valor inteiro maior ou igual a zero."
      );
      return false;
    }

    if (index === 0) {
      // Se o índice for zero, chama o método addFirst() para adicionar no início da lista
      console.log("Adicionando no inicio");
      return this.addFirst(data);
    }

    if (index >= this.length) return this.addLast(data);

    const novoNo = new No(data);
    console.log("Novo no" + novoNo);
    if (novoNo === null) return false;

    let noAtual = this.head;
    let indiceAtual = 0;
    while (indiceAtual < index - 1) {
      // Percorre a lista até encontrar o nó anterior ao índice especificado
      noAtual = noAtual.prox;
      indiceAtual++;
    }
    // reorganiza os ponteiros
    novoNo.ant = noAtual;
    novoNo.prox = noAtual.prox;
    noAtual.prox.ant = novoNo;
    noAtual.prox = novoNo;
    this.length++;
    return true;
  }
} // fim classe LinkedList
