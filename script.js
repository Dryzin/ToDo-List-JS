const minhaLista = new LinkedList();

function adicionarTarefa() {
  const descricao = document.getElementById("txtnovaTarefa").value.trim();
  const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

  const novaTarefa = new Tarefa(descricao,prioridade,obterDataAtual(),obterHoraAtual());
  minhaLista.addElemento(novaTarefa);
  console.log(minhaLista.toString());
  // limpa input
  document.getElementById("txtnovaTarefa").value = "";
  document.getElementById("txtnovaPrioridade").value = "";
  document.getElementById("txtnovaTarefa").focus();
  atualizarLista();
}

//--------------------------------------------------------------------------------------------
function resolverTarefa() {
  const tarefa = minhaLista.removeElemento();
  if (tarefa != null) {
    mostrarMensagemRemocao(tarefa);
    atualizarLista();
  } else {
    const mensagem = document.getElementById("mensagem-remocao");
    mensagem.innerHTML = "Nenhuma tarefa para concluir.";
  }
}

//--------------------------------------------------------------------------------------------

function removerTarefasSelecionadas() {
  const checkboxes = document.querySelectorAll("#list_listadeTarefas input[type='checkbox']:checked");

  if (checkboxes.length === 0) {
    alert("Nenhuma tarefa selecionada.");
    return;
  }

  checkboxes.forEach(checkbox => {
    const id = parseInt(checkbox.value);
    minhaLista.removeElementoById(id); // Implementar função para remover por ID na LinkedList
  });

  atualizarLista(); // Chama para atualizar a interface
}


//--------------------------------------------------------------------------------------------
function mostrarTarefaInicio() {
  const mensagem = document.getElementById("mensagem-remocao");

  if (!minhaLista.isEmpty()) {
    let tarefaInicio = minhaLista.head.dado;

    mensagem.innerHTML = `Tarefa do início: ${tarefaInicio._descricao}, ${tarefaInicio._prioridade}, ${tarefaInicio._data}, ${tarefaInicio._hora}.`;
  } else {
    mensagem.innerHTML = "Lista Vazia.";
  }
  mensagem.style.display = "block";
}
//--------------------------------------------------------------------------------------------
function mostrarTarefaMaisAntiga() {
  const mensagem = document.getElementById("mensagem-remocao");

  if (!minhaLista.isEmpty()) {
    let tarefaMaisAntiga = minhaLista.head.dado;

    for (const tarefa of minhaLista) {
      tarefaMaisAntiga = comparaTarefasDataHora(tarefaMaisAntiga, tarefa);
    }

    mensagem.innerHTML = `Tarefa mais antiga: ${tarefaMaisAntiga._descricao}, ${tarefaMaisAntiga._data}, ${tarefaMaisAntiga._hora}.`;
  } else {
    mensagem.innerHTML = "Lista Vazia.";
  }
  mensagem.style.display = "block";
}


//---------------------const mensagem = document.getElementById("mensagem-remocao");-----------------------------------------------------------------------
function mostrarMensagemRemocao(tarefaRealizada) {
  const mensagem = document.getElementById("mensagem-remocao");

  const dataAtual = new Date();
  const dataAtualFormatada = `${String(dataAtual.getDate()).padStart(
    2,
    "0"
  )}/${String(dataAtual.getMonth() + 1).padStart(
    2,
    "0"
  )}/${dataAtual.getFullYear()}`;
  const horaAtual = `${dataAtual
    .getHours()
    .toString()
    .padStart(2, "0")}:${dataAtual
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dataAtual.getSeconds().toString().padStart(2, "0")}`;

  mensagem.innerHTML = `Tarefa: ${tarefaRealizada.descricao
    } realizada em ${calcularDiferencaDias(
      tarefaRealizada._data,
      dataAtualFormatada
    )} e ${calcularDiferencaHoras(tarefaRealizada._hora, horaAtual)}.`;
  mensagem.style.display = "block";

}

//--------------------------------------------------------------------------------------------
// Função para atualizar a exibição da fila
function atualizarLista() {
  const listaElement = document.getElementById("list_listadeTarefas");
  listaElement.innerHTML = "";

  const lblTarefas =
    document.getElementById("lblmostraTarefas");

  const mensagem = document.getElementById("mensagem-remocao");

  setTimeout(function () {
    mensagem.style.display = "none";
  }, 15000);


  if (!minhaLista.isEmpty()) {
    for (const tarefa of minhaLista) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex align-items-center";
      lblTarefas.innerHTML = "";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input me-2";
      checkbox.value = tarefa.id;

      const label = document.createElement("label");
      label.textContent = tarefa.toString();
      label.className = "form-check-label flex-grow-1";

      li.appendChild(checkbox);
      li.appendChild(label);

      listaElement.appendChild(li);
    }
  } else {
    lblTarefas.innerHTML = "Lista de Tarefas Vazia";
  }

}


//--------------------------------------------------------------------------------------------
//FUNÇÕES COMPLEMENTARES PARA A APLICAÇÃO
//-----------------------------------------

// funcao data
function obterDataAtual() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
  let ano = dataAtual.getFullYear();
  // Formata a data como "dd/mm/aaaa"
  let dataFormatada = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${ano}`;
  return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, "0");
  const minuto = data.getMinutes().toString().padStart(2, "0");
  const segundo = data.getSeconds().toString().padStart(2, "0");
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(":").map(Number);
  const [h2, m2, s2] = hora2.split(":").map(Number);

  const diferencaSegundos =
    h2 * 3600 + m2 * 60 + s2 - (h1 * 3600 + m1 * 60 + s1);

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos
      .toString()
      .padStart(2, "0")} [horas:minutos:segundos]`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaDias(dataInicial, dataFinal) {
  // Converte as datas em milissegundos
  const msPorDia = 24 * 60 * 60 * 1000; // Quantidade de milissegundos em um dia
  const [diaIni, mesIni, anoIni] = dataInicial.split("/").map(Number);
  const [diaFim, mesFim, anoFim] = dataFinal.split("/").map(Number);
  // Cria objetos Date com as datas fornecidas
  const dataIni = new Date(anoIni, mesIni - 1, diaIni); // Subtrai 1 do mês porque o mês inicia do zero
  const dataFim = new Date(anoFim, mesFim - 1, diaFim);
  // Calcula a diferença em milissegundos entre as duas datas
  const diferencaMs = dataFim - dataIni;
  // Converte a diferença de milissegundos para dias e arredonda para baixo
  const diferencaDias = Math.floor(diferencaMs / msPorDia);
  return diferencaDias + " dias";
}
//--------------------------------------------------------------------------------------------
function converterDataFormatoISO8601(data) {
  const partes = data.split("/");
  const dia = partes[0].padStart(2, "0");
  const mes = partes[1].padStart(2, "0");
  const ano = partes[2];
  return `${ano}-${mes}-${dia}`;
}
//--------------------------------------------------------------------------------------------
function comparaTarefasDataHora(tarefa1, tarefa2) {
  const dataHoraTarefa1 = new Date(
    `${converterDataFormatoISO8601(tarefa1._data)}T${tarefa1._hora}`
  );
  const dataHoraTarefa2 = new Date(
    `${converterDataFormatoISO8601(tarefa2._data)}T${tarefa2._hora}`
  );
  if (dataHoraTarefa1.getTime() < dataHoraTarefa2.getTime()) {
    return tarefa1;
  } else {
    return tarefa2;
  }
}
//--------------------------------------------------------------------------------------------
function saveLinkedListToLocalStorage() {
  console.log("saveLinkedListToLocalStorage");
  let listaParaSalvar = [];
  for (const item of minhaLista) {
    listaParaSalvar.push({
      _descricao: item.descricao,
      _prioridade: item.prioridade,
      _data: item.data,
      _hora: item.hora,
    });
    console.log(item.toString());
  }
  let jsonStr = JSON.stringify(listaParaSalvar);
  console.log(jsonStr);
  localStorage.setItem("myLinkedList", jsonStr);
  alert("Lista salva com sucesso!");
}
//-----------------------------
function loadLinkedListFromLocalStorage() {
  console.log("loadLinkedListFromLocalStorage");
  let jsonStr = localStorage.getItem("myLinkedList");
  if (jsonStr) {
    let listaCarregada = JSON.parse(jsonStr);
    for (let i = 0; i < listaCarregada.length; i++) {
      let obj = listaCarregada[i];
      let novaTarefa = new Tarefa(
        obj._descricao,
        obj._prioridade,
        obj._data,
        obj._hora
      );
      console.log(novaTarefa.toString());
      minhaLista.addLast(novaTarefa);
    }
    atualizarLista();
    alert("Lista carregada com sucesso!");
  }
}

function saveLinkedListToURL() {
  let listaParaSalvar = [];
  for (const item of minhaLista) {
    listaParaSalvar.push({
      _descricao: item.descricao,
      _prioridade: item.prioridade,
      _data: item.data,
      _hora: item.hora,
    });
  }
  let jsonStr = JSON.stringify(listaParaSalvar);
  let encodedStr = encodeURIComponent(jsonStr);
  let url = `${window.location.origin}${window.location.pathname}?data=${encodedStr}`;
  console.log("Generated URL:", url);
  return url;
}

function loadLinkedListFromURL() {
  let params = new URLSearchParams(window.location.search);
  let encodedStr = params.get("data");
  if (encodedStr) {
    let jsonStr = decodeURIComponent(encodedStr);
    let listaCarregada = JSON.parse(jsonStr);
    for (let i = 0; i < listaCarregada.length; i++) {
      let obj = listaCarregada[i];
      let novaTarefa = new Tarefa(
        obj._descricao,
        obj._prioridade,
        obj._data,
        obj._hora
      );
      minhaLista.addLast(novaTarefa);
    }
    atualizarLista();
    alert("Lista carregada a partir da URL com sucesso!");
  }
}


let url = saveLinkedListToURL();
console.log("Use this link to share your list:", url);



window.onload = function() {
  loadLinkedListFromURL();
};


//----------  ----------------------------------------------------------------------------------
