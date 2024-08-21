class Tarefa {
  constructor(descricao, prioridade, data, hora) {
    this.id = Date.now();
    this._descricao = descricao;
    this._prioridade = prioridade;
    this._data = data;
    this._hora = hora;
  }

  toString() {
    return `${this._descricao} [${this._prioridade}] - ${this._data} ${this._hora}`;
  }

  get descricao() {
    return this._descricao;
  }

  set descricao(novaDescricao) {
    this._descricao = novaDescricao;
  }

  get prioridade() {
    return this._prioridade;
  }

  set prioridade(novaPrioridade) {
    this._prioridade = novaPrioridade;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }

  get hora() {
    return this._hora;
  }

  set hora(hora) {
    this._hora = hora;
  }

  equals(outroAtendimento) {
    if (!(outroAtendimento instanceof Tarefa)) {
      return false;
    }
    return this._prioridade === outroAtendimento.prioridade;
  }

  toString() {
    return `Descrição: ${this._descricao} - Prioridade: ${this._prioridade} - Data: ${this._data} - Hora: ${this._hora}`;
  }
}
