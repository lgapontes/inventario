/******************************************************************************/
/******************************      APOIO     ********************************/
/******************************************************************************/

const URL_REMOTA = 'https://www.flechamagica.com.br/aded2';
const URL_LOCAL = 'http://localhost';
const LOCALHOST = true;
const VARIAVEL_MENSAGEM = 'registro-mensagem';
const BOTAO_VOLTAR = 'header-botao-voltar';

function createURL(path) {
  return `${(LOCALHOST ? URL_LOCAL : URL_REMOTA)}/api/${path}`;
}

document.getElementById('texto-formulario-versao').innerHTML = versao_texto;

function openLoading() {
  esconder_todos();
  mostrar_shimmer();
  document.getElementById('loading').style.display = 'block';
}

function openJustLoading() {
  document.getElementById('loading').style.display = 'block';
}

function closeLoading() {
  esconder_shimmer();
  renderBotaoVoltar();
  document.getElementById('loading').style.display = 'none';
}

function generateUUID() {
  // uuid char(36)
  return crypto.randomUUID();
}

function criarOption(select,value,texto) {
  let opt = document.createElement('option');
  opt.value = value;
  opt.innerHTML = texto;
  select.appendChild(opt);
}

function preecherSelect(id,lista,campoValue,functionTexto,selectedValue,callback) {
  let select = document.getElementById(id);
  select.innerHTML = '';
  let selectedIndex = -1;

  if (lista.length === 0) {
    criarOption(select,'','Não encontrado');
    callback();
  } else {
    lista.forEach((entry, index) => {
      if (entry[campoValue] === selectedValue) {
        selectedIndex = index;
      }
      criarOption(select,entry[campoValue],functionTexto(entry));

      if (index === (lista.length -1)) {
        if (selectedIndex > -1) {
          select.selectedIndex = selectedIndex;
        }
        callback();
      }
    });
  }
}

function isOdd(num) {
  return num % 2;
}

function itsTrue(valor) {
  return valor === 1;
}

function itsFalse(valor) {
  return valor === 0;
}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function disableInput(id) {
  document.getElementById(id).setAttribute('disabled','disabled');
  document.getElementById(id).setAttribute('readonly','readonly');
}

function enableInput(id) {
  document.getElementById(id).removeAttribute('disabled');
  document.getElementById(id).removeAttribute('readonly');
}

function uuidEhValido(uuid) {
  if ( (uuid !== undefined) && (uuid !== null) && (uuid !== '') ) {
    if (typeof uuid === 'string' || uuid instanceof String) {
      if (uuid.length === 36) {
        return true;
      }
    }
  }
  return false;
}

function stringEhValida(s) {
  if ( (s !== undefined) && (s !== null) && (s !== '') ) {
    if (typeof s === 'string' || s instanceof String) {
      return true;
    }
  }
  return false;
}

function removerValorBotaoSalvar() {
  let valor_botao_salvar = obterValorBotaoSalvar();
  if (valor_botao_salvar.lista.length > 0) {
    valor_botao_salvar.lista.pop();
  }
  let lista_string = JSON.stringify(valor_botao_salvar.lista);
  localStorage.setItem(BOTAO_VOLTAR,lista_string);
}

function adicionarValorBotaoSalvar(href) {
  let valor_botao_salvar = obterValorBotaoSalvar();
  valor_botao_salvar.lista.push(href);
  let lista_string = JSON.stringify(valor_botao_salvar.lista);
  localStorage.setItem(BOTAO_VOLTAR,lista_string);
}

function adicionarValorAtualBotaoSalvar() {
  adicionarValorBotaoSalvar(window.location.href);
}

function obterValorBotaoSalvar() {
  let retorno = {
    possui_href: false,
    href: `${window.location.origin}${window.location.pathname}`,
    lista: []
  };

  let lista_string = localStorage.getItem(BOTAO_VOLTAR);
  if (lista_string !== null) {
    retorno.lista = JSON.parse(lista_string);
    if (retorno.lista.length > 0) {
      retorno.possui_href = true;
      retorno.href = retorno.lista[(retorno.lista.length - 1)];
    }
  }

  return retorno;
}

function renderBotaoVoltar() {
  let valor_botao_salvar = obterValorBotaoSalvar();
  if (valor_botao_salvar.possui_href) {
    mostrar_elemento('header-botao-voltar');
  } else {
    esconder_elemento('header-botao-voltar');
  }
}

function adicionarValorNoJSON(json,id,valor) {
  let field = id;
  field = field.replace("campanhas_nova_", "");
  field = field.replace("campanhas_editar_", "");
  field = field.replace("personagens_novo_", "");
  field = field.replace("personagens_editar_", "");
  field = field.replace("form_enviar_moedas_", "");
  field = field.replace("form_alterar_campanhas_", "");
  json[field] = valor;
}

function obterValorCheckbox(json,id) {
  let valor = document.getElementById(id).checked;
  adicionarValorNoJSON(json,id,valor);
}

function obterValorInputText(json,id) {
  let valor = document.getElementById(id).value;
  adicionarValorNoJSON(json,id,valor);
}

function obterValorSelect(json,id) {
  let select = document.getElementById(id);
  let valor = select.options[select.selectedIndex].value;
  adicionarValorNoJSON(json,id,valor);
}

function obterValorListaCheckbox(json,id) {
  let lista = [...document.querySelectorAll(`#${id} input[type=checkbox]`)];
  let valores = lista.filter(checkbox => {if (checkbox.checked) return checkbox; }).map(checkbox => checkbox.id);
  adicionarValorNoJSON(json,id,valores);
}

function obterValorListaMoedas(json,id,callback) {
  let lista = [...document.querySelectorAll(`#${id} input[type=number]`)];
  let moedas = [];

  lista.forEach((moeda, index) => {
    moedas.push({
      uuid_moeda: moeda.id,
      uuid_personagem: json.uuid,
      quantidade: moeda.value
    });

    if (index == (lista.length - 1)) {
      adicionarValorNoJSON(json,id,moedas);
      callback();
    }
  });
}

function obterValorLink(json,id) {
  let link = document.getElementById(id);
  let valor = link.getAttribute('url');
  adicionarValorNoJSON(json,id,valor);
}

function copiarParaClipboard(value) {
  navigator.clipboard.writeText(value);
}

const TEMPO_DURACAO_TOAST = 3000;

function renderErrorToast(msg) {
  vanillaToast.error(msg,{
    duration: TEMPO_DURACAO_TOAST,
    closeButton: false,
  });
}

function renderWarningToast(msg) {
  vanillaToast.warning(msg,{
    duration: TEMPO_DURACAO_TOAST,
    closeButton: false,
  });
}

function renderToast(msg) {
  vanillaToast.default(msg,{
    duration: TEMPO_DURACAO_TOAST,
    closeButton: false,
  });
}

/******************************************************************************/
/*****************************    CONVERSORES   *******************************/
/******************************************************************************/

function conversorUniversalParaGramas(medida,valor) {
  let validado = validarNumeroComVirgula(valor);
  if (validado.valido) {
    if (medida === 'Litros') {
      return (validado.valor * 1000);
    } else if (medida === 'Quilos') {
      return (validado.valor * 1000);
    } else if (medida === 'Libras') {
      return (validado.valor * 453.592);
    } else if (medida === 'Mililitros') {
      return validado.valor;
    } else if (medida === 'Gramas') {
      return validado.valor;
    }
  } else {
    return 0;
  }
}

function conversorUniversalDeGramasPara(medida,valor) {
  if (medida === 'Litros') {
    return (valor/1000).toFixed(1);
  } else if (medida === 'Quilos') {
    return (valor/1000).toFixed(1);
  } else if (medida === 'Libras') {
    return (valor/453.592).toFixed(1);
  } else if (medida === 'Mililitros') {
    return valor.toFixed(1);
  } else if (medida === 'Gramas') {
    return valor.toFixed(1);
  }
}

/******************************************************************************/
/******************************    VALIDAÇÃO   ********************************/
/******************************************************************************/

function palavraEhProibida(text) {
  if (PALAVRAS_PROIBIDAS.some(word => text.includes(word))) {
    return true;
  }
  if (FRASES_PROIBIDAS.some(v => text.includes(v))) {
    return true;
  }
  return false;
}

function capitalize(str) {
  // Split string into an array of words
  const string = str.toLowerCase().split(" ");
  const cased = [];

  let avoid = ['da','de','do','para','a','à','o','e','del','por','até','que','cujo','cuja','cujos','cujas','onde','mas','este','esta','isto','esse','essa','isso','aquele','aquela','aquilo','não','sim'];

  // Convert every first letter to uppercase
  string.map((word) => {
    let changed = word;
    if ( (!avoid.includes(changed)) && (changed.length > 2) ) {
      changed = word[0].toUpperCase() + word.slice(1);
    }
    cased.push(changed);
  });

  // Convert my words array to a string with .join()
  return cased.join(" ");
}

function validarCampanha(json) {
  if (!stringEhValida(json.nome)) {
    renderWarningToast('O campo Nome está inválido!');
    return false;
  }
  if (palavraEhProibida(json.nome)) {
    renderWarningToast('Há palavras proibidas no campo Nome!');
    return false;
  }

  if (!stringEhValida(json.narrador)) {
    renderWarningToast('O campo Narrador está inválido!');
    return false;
  }
  if (palavraEhProibida(json.narrador)) {
    renderWarningToast('Há palavras proibidas no campo Narrador!');
    return false;
  }

  if (!uuidEhValido(json.sistema)) {
    renderWarningToast('Sistema não selecionado!');
    return false;
  }

  return true;
}

function isValidFloat(str) {
  try {
    if (typeof str != "string") return false;
    return !isNaN(str) &&
           !isNaN(parseFloat(str));
  } catch (error) {
    return false;
  }
}

function isValidInteger(str) {
  try {
    if (typeof str != "string") return false;
    return !isNaN(str) &&
           !isNaN(parseInt(str));
  } catch (error) {
    return false;
  }
}

function validarNumeroComVirgula(valor) {
  valor = valor.replace(/,/g, '.');

  if (isValidFloat(valor)) {
    return {
      valido: true,
      valor: parseFloat(valor)
    };
  } else {
    return {
      valido: false,
      valor: valor
    };
  }
}

function validarNumeroInteiro(valor) {
  if (isValidInteger(valor)) {
    return {
      valido: true,
      valor: parseInt(valor)
    };
  } else {
    return {
      valido: false,
      valor: valor
    };
  }
}

function validarPersonagem(json,novo,callback) {
  if (!stringEhValida(json.nome)) {
    renderWarningToast('O campo Nome está inválido!');
    callback(false);
    return;
  }
  if (palavraEhProibida(json.nome)) {
    renderWarningToast('Há palavras proibidas no campo Nome!');
    callback(false);
    return;
  }

  if (!stringEhValida(json.jogador)) {
    renderWarningToast('O campo Jogador está inválido!');
    callback(false);
    return;
  }
  if (palavraEhProibida(json.jogador)) {
    renderWarningToast('Há palavras proibidas no campo Jogador!');
    callback(false);
    return;
  }

  if (novo) {
    /* Novo personagem */
    callback(true);
    return;
    /* Novo personagem */
  } else {
    /* Editando personagem */
    let peso_maximo = validarNumeroComVirgula(json.peso_maximo);

    if (peso_maximo.valido) {
      /* Peso Máximo válido */

      json.peso_maximo = peso_maximo.valor;

      let moedas_validas = true;
      json.moedas.forEach((moeda, index) => {

        if (!uuidEhValido(moeda.uuid_moeda)) {
          moedas_validas = false;
        }
        if (!uuidEhValido(moeda.uuid_personagem)) {
          moedas_validas = false;
        }

        if (!stringEhValida(moeda.quantidade)) {
          moeda.quantidade = '0';
        }

        let quantidade = validarNumeroInteiro(moeda.quantidade);
        if (quantidade.valido) {
          if (quantidade.valor < 0) {
            quantidade.valor = 0;
          }
          json.moedas[index].quantidade = quantidade.valor;
        } else {
          moedas_validas = false;
        }

        if (index == (json.moedas.length - 1)) {
          if (moedas_validas) {
            callback(true);
            return;
          } else {
            renderWarningToast('As Moedas estão inválidas!');
            callback(false);
            return;
          }
        }
      });

      /* Peso Máximo válido */
    } else {
      renderWarningToast('O Peso Máximo está inválido!');
      callback(false);
      return;
    }
    /* Editando personagem */
  }
}

function validarEnviarMoedas(json,callback) {
  if (!uuidEhValido(json.moeda)) {
    renderWarningToast('Selecione a Moeda para enviar!');
    callback(false);
    return;
  }
  if (!uuidEhValido(json.personagem)) {
    renderWarningToast('Selecione o Personagem para enviar!');
    callback(false);
    return;
  }

  let quantidade = validarNumeroInteiro(json.quantidade);
  if (quantidade.valido) {
    if (quantidade.valor < 0) {
      quantidade.valor = 0;
    }
    json.quantidade = quantidade.valor;
  } else {
    renderWarningToast('Valor das Moedas inválido!');
    callback(false);
    return;
  }

  let tag = document.getElementById(json.moeda);
  if (tag) {
    let quantidadeAtual = validarNumeroInteiro(tag.value).valor;
    if (json.quantidade > quantidadeAtual) {
      renderWarningToast('O Personagem não possui essa quantidade de Moedas!');
      callback(false);
      return;
    }
    if (json.quantidade < 1) {
      renderWarningToast('Deve-se enviar ao menos 1 moeda!');
      callback(false);
      return;
    }
  } else {
    renderWarningToast('Erro ao obter a quantidade de Moedas!');
    callback(false);
    return;
  }

  callback(true);
  return;
}

function validarItem(json,callback) {
  if (!uuidEhValido(json.uuid_personagem)) {
    renderWarningToast('Ocorreu um erro ao identificar o Personagem!');
    callback(false);
    return;
  }

  if (!stringEhValida(json.descricao)) {
    renderWarningToast('O campo Item está inválido!');
    callback(false);
    return;
  }
  if (palavraEhProibida(json.descricao)) {
    renderWarningToast('Há palavras proibidas no campo Item!');
    callback(false);
    return;
  }

  if (palavraEhProibida(json.detalhes)) {
    renderWarningToast('Há palavras proibidas no campo Infos!');
    callback(false);
    return;
  }

  let quantidade = validarNumeroInteiro(json.quantidade);
  if (quantidade.valido) {
    if (quantidade.valor < 0) {
      quantidade.valor = 0;
    }
    json.quantidade = quantidade.valor;
  } else {
    renderWarningToast('A quantidade de itens é inválida!');
    callback(false);
    return;
  }

  let peso_unitario = validarNumeroComVirgula(json.peso_unitario);
  if (peso_unitario.valido) {
    json.peso_unitario = peso_unitario.valor;
  } else {
    renderWarningToast('O Peso está inválido!');
    callback(false);
    return;
  }

  if (!uuidEhValido(json.uuid_medida_peso_unitario)) {
    renderWarningToast('A unidade do peso está inválida!');
    callback(false);
    return;
  }

  callback(true);
  return;
}

/******************************************************************************/
/******************************      API       ********************************/
/******************************************************************************/

function consumirAPI(metodo,url,sucesso,falha,json) {
    var xhr = new XMLHttpRequest();
    xhr.open(metodo,url);
    xhr.timeout = 10000;

    xhr.addEventListener('load',function(){
        if (xhr.status == 200) {
            if ( (metodo != 'POST') && (metodo != 'DELETE') ) {
              var json = JSON.parse(xhr.responseText);
              sucesso(json);
            } else {
              sucesso();
            }
        } else {
            falha(xhr.status + ': ' + xhr.statusText);
        }
    });
    xhr.addEventListener('timeout',function(){
        falha('Não foi possível obter o conteúdo!');
    });
    xhr.addEventListener('error',function(evento){
        falha('Ocorreu um erro ao obter o conteúdo!');
    });

    if (json != undefined) {
        xhr.send(json);
    } else {
        xhr.send();
    }
}

function listar(url,sucesso,falha) {
    consumirAPI(
        'GET',
        url,
        sucesso,
        falha
    );
}

function obter_com_parametro(url,parametro,valor,sucesso,falha) {
    consumirAPI(
        'GET',
        `${url}?${parametro}=${valor}`,
        sucesso,
        falha
    );
}

function obter(url,uuid,sucesso,falha) {
    obter_com_parametro(
        url,
        'uuid',
        uuid,
        sucesso,
        falha
    );
}

/*
function obterCampanha(url,url,sucesso,falha) {
    consumirAPI(
        'GET',
        `${url}?url=${url}`,
        sucesso,
        falha
    );
}
*/

function obterItensPorPersonagem(url,personagem,sucesso,falha) {
    consumirAPI(
        'GET',
        `${url}?personagem=${personagem}`,
        sucesso,
        falha
    );
}

function inserir(url,json,sucesso,falha) {
    consumirAPI(
        'POST',
        url,
        sucesso,
        falha,
        JSON.stringify(json)
    );
}

function alterar(url,json,sucesso,falha) {
    consumirAPI(
        'PUT',
        url,
        sucesso,
        falha,
        JSON.stringify(json)
    );
}

function excluir(url,uuid,sucesso,falha) {
    consumirAPI(
        'DELETE',
        `${url}?uuid=${uuid}`,
        sucesso,
        falha
    );
}

function excluirItem(url,uuid,quem_esta_acessando,sucesso,falha) {
    consumirAPI(
        'DELETE',
        `${url}?uuid=${uuid}&quem-esta-acessando=${quem_esta_acessando}`,
        sucesso,
        falha
    );
}


/******************************************************************************/
/******************************     MOEDAS     ********************************/
/******************************************************************************/

/*
insert into moedas (uuid,moeda,sigla,ordenacao) values ('60b339ec-e9ab-477e-838c-baccf2805e02','Peça de Cobre','pc',2);
60b339ec-e9ab-477e-838c-baccf2805e02
Peça de Cobre
pc
100pc = 1gp

insert into moedas (uuid,moeda,sigla,ordenacao) values ('a19f19a8-64e0-459e-8ec4-4b56f62af80c','Peça de Prata','pp',3);
a19f19a8-64e0-459e-8ec4-4b56f62af80c
Peça de Prata
pp
10pp = 1gp

insert into moedas (uuid,moeda,sigla,ordenacao) values ('996904ad-51ad-42ae-b831-6c08346e7bed','Peça de Electrum','pe',4);
996904ad-51ad-42ae-b831-6c08346e7bed
Peça de Electrum
pe
2pe = 1gp

insert into moedas (uuid,moeda,sigla,ordenacao) values ('982e8a4e-386c-4f4f-b394-c6a78fc636b0','Peça de Ouro','po',5);
982e8a4e-386c-4f4f-b394-c6a78fc636b0
Peça de Ouro
po

insert into moedas (uuid,moeda,sigla,ordenacao) values ('b8d1653f-1cc3-436a-ad22-f87ab6b59e86','Peça de Platina','pl',6);
b8d1653f-1cc3-436a-ad22-f87ab6b59e86
Peça de Platina
pl
1pl = 5po

insert into moedas (uuid,moeda,sigla,ordenacao) values ('f2f2ac1d-f8dc-4dd2-a243-778155d8f98b','Peça de Cerâmica','pc',1);
f2f2ac1d-f8dc-4dd2-a243-778155d8f98b
Peça de Cerâmica
pc
100pc = 1gp

insert into moedas (uuid,moeda,sigla,ordenacao) values ('0f88bf2c-a224-4990-b0cf-ea04dc22f0f1','Bits (1/10 Peça de Cerâmica)','bits',0);
0f88bf2c-a224-4990-b0cf-ea04dc22f0f1
Bits (1/10 Peça de Cerâmica)
bits
(1/10 Peça de Cerâmica)

insert into moedas (uuid,moeda,sigla,ordenacao) values ('9382c783-7888-4e15-9eb8-4777a22afee3','Trade Bar de Prata','trade bar (prata)',7);
9382c783-7888-4e15-9eb8-4777a22afee3
Trade Bar de Prata
trade bar (prata)
25po

insert into moedas (uuid,moeda,sigla,ordenacao) values ('1657f8c3-578a-4a1e-b4b0-8554e7b5479d','Trade Bar de Ouro','trade bar (ouro)',8);
1657f8c3-578a-4a1e-b4b0-8554e7b5479d
Trade Bar de Ouro
trade bar (ouro)
250po
*/

/******************************************************************************/
/******************************     RENDER     ********************************/
/******************************************************************************/

function mostrar_elemento(id) {
  document.getElementById(id).style.display = 'block';
}

function esconder_elemento(id) {
  document.getElementById(id).style.display = 'none';
}

function renderBloco(textLabel,inputType,inputDisabled,inputValue,blocoMenor,blocoDireita) {
  let bloco = document.createElement('div');
  bloco.classList.add('bloco');

  if (blocoMenor) {
    bloco.classList.add('menor');
  }
  if (blocoDireita) {
    bloco.classList.add('menor-direita');
  }

  let label = document.createElement('label');
  label.innerHTML = textLabel;

  let input = document.createElement('div');
  input.classList.add('input-like');
  input.innerHTML = inputValue;

  /*
  input.setAttribute('type',inputType);
  if (inputDisabled) {
    input.setAttribute('readonly','readonly');
    input.setAttribute('disabled','disabled');
  }
  input.value = inputValue;
  */

  bloco.appendChild(label);
  bloco.appendChild(input);

  return bloco;
}

function renderLinhaCampanha(nome,narrador,criacao,url,sistema) {
  let linha = document.createElement('div');
  linha.classList.add('linha');
  linha.classList.add('linha-link');
  linha.appendChild(renderBloco('Nome','text',true,nome,true,false));
  linha.appendChild(renderBloco('Sistema','text',true,sistema,true,true));
  linha.appendChild(renderBloco('Narrador','text',true,narrador,true,false));
  linha.appendChild(renderBloco('Criação','text',true,criacao,true,true));
  linha.addEventListener('click',(event)=>{
    exibir_registro_via_url(event,url);
  });
  return linha;
}

function renderCampanhas(lista,sistemas,callback) {
  let linhas = document.getElementById('campanhas_listar');
  linhas.innerHTML = '';

  preecherSelect(
    'campanhas_nova_sistema',
    sistemas,
    'uuid',
    (entry)=>`${entry.nome}`,
    '',
    ()=>{
      // Sistemas preenchidos
      if (lista.length == 0) {
        callback();
      } else {
        lista.forEach((entry, index) => {
          let linha = renderLinhaCampanha(
            entry.nome,
            entry.narrador,
            entry.cadastro,
            entry.url,
            entry.sistema
          );
          linhas.appendChild(linha);

          if (index == (lista.length - 1)) {
            callback();
          }
        });
      }
      // Sistemas preenchidos
    }
  );
}

function render_alterar_link_gerar_url(valor) {
  return `${window.location.pathname}?url=${valor}`;
}

function render_alterar_link(tag,valor) {
  let url = render_alterar_link_gerar_url(valor);
  tag.href = url;
  tag.innerHTML = url;
  tag.setAttribute('url',valor);
  tag.setAttribute('target', '_blank');
}

function render_campanhas_editar_campo(propriedade,valor,callback) {
  let ignorar_propriedades = ['medida','sigla','eh_narrador','eh_jogador','eh_visualizador','sistema'];
  if (ignorar_propriedades.includes(propriedade)) {
    callback();
  } else {
    let nome_tag = `campanhas_editar_${propriedade}`;
    let tag = document.getElementById(nome_tag);

    if ( (propriedade === 'url_narrador') || (propriedade === 'url_jogador') || (propriedade === 'url_visualizador') ) {
      render_alterar_link(tag,valor);
      callback();
    } else if (propriedade === 'uuid_medida_padrao') {
      callback();
    } else if (propriedade === 'uuid_sistema') {
      callback();
    } else {
      if (tag.type === 'checkbox') {
        tag.checked = (valor === 1);
        callback();
      } else {
        tag.value = valor;
        callback();
      }
    }
  }
}

function createItemLista(index,id,texto,selecionado) {
  let div = document.createElement('div');
  div.classList.add('bloco');
  div.classList.add('menor');
  if (isOdd(index)) {
    div.classList.add('menor-direita');
  }
  div.classList.add('bloco-checkbox');

  let checkbox = document.createElement('input');
  checkbox.id = id;
  checkbox.setAttribute('name', id);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = selecionado;

  let label = document.createElement('label');
  label.htmlFor = id;
  label.innerHTML = texto;

  div.appendChild(checkbox);
  div.appendChild(label);
  return div;
}

function renderLista(id,lista,campoChaveLista,campoTextoLista,selecionados,campoChaveSelecionados,callback) {
  let div = document.getElementById(id);
  div.innerHTML = '';
  lista.forEach((entry, index) => {
    let selecionado = false;
    if (selecionados.some(s => s[campoChaveSelecionados] === entry[campoChaveLista])) {
      selecionado = true;
    }

    let item = createItemLista(index,entry[campoChaveLista],entry[campoTextoLista],selecionado);
    div.appendChild(item);

    if (index === (lista.length - 1)) {
      callback();
    }
  });
}

function render_campanhas_editar_permissoes(json) {
  if (itsTrue(json.campanha.eh_narrador)) {
    mostrar_elemento('campanhas_editar_salvar');
    enableInput('campanhas_editar_nome');
    enableInput('campanhas_editar_narrador');
    mostrar_elemento('campanhas_editar_permissao');
    mostrar_elemento('personagens_listar_inserir');
    mostrar_elemento('campanhas_excluir');
    mostrar_elemento('campanhas_excluir_form');
  } else if (itsTrue(json.campanha.eh_jogador)) {
    esconder_elemento('campanhas_editar_salvar');
    disableInput('campanhas_editar_nome');
    disableInput('campanhas_editar_narrador');
    esconder_elemento('campanhas_editar_permissao');
    mostrar_elemento('personagens_listar_inserir');
    esconder_elemento('campanhas_excluir');
    esconder_elemento('campanhas_excluir_form');
  } else {
    esconder_elemento('campanhas_editar_salvar');
    disableInput('campanhas_editar_nome');
    disableInput('campanhas_editar_narrador');
    esconder_elemento('campanhas_editar_permissao');
    esconder_elemento('personagens_listar_inserir');
    esconder_elemento('campanhas_excluir');
    esconder_elemento('campanhas_excluir_form');
  }
}

function renderLinhaPersonagem(personagem) {
  let linha = document.createElement('div');
  linha.classList.add('linha');
  linha.classList.add('linha-link');
  linha.appendChild(renderBloco('Nome','text',true,personagem.nome,true,false));
  linha.appendChild(renderBloco('Jogador','text',true,personagem.jogador,true,true));
  linha.addEventListener('click',(event)=>{
    exibir_registro_via_url(event,personagem.url);
  });
  return linha;
}

function renderLinhaVazia(mensagem) {
  let linha = document.createElement('div');
  linha.classList.add('linha');

  let bloco = document.createElement('div');
  bloco.classList.add('bloco');

  let label = document.createElement('label');
  label.classList.add('sem-registros');
  label.innerHTML = mensagem;

  bloco.appendChild(label);
  linha.appendChild(bloco);
  return linha;
}

function renderLinhaVaziaItens(mensagem) {
  let bloco = document.createElement('div');
  bloco.classList.add('bloco');

  let label = document.createElement('label');
  label.classList.add('sem-registros');
  label.innerHTML = mensagem;

  bloco.appendChild(label);
  return bloco;
}

function listarPersonagens(callback) {
  let listas = document.getElementById('personagens_listar');
  listas.innerHTML = '';
  let url = document.getElementById('campanhas_editar_url').value;

  /* Personagens */
  obter_com_parametro(
    createURL('personagens.php'),
    'campanha',
    url,
    (json)=>{
      if (json.length == 0) {
        let div = renderLinhaVazia('Campanha sem personagens');
        listas.appendChild(div);
        callback();
      } else {
        json.forEach((entry, index) => {
          let div = renderLinhaPersonagem(entry);
          listas.appendChild(div);

          if (index === (json.length - 1)) {
            callback();
          }
        });
      }
    },
    (erro)=>{
      console.error(erro);
      renderErrorToast('Ocorreu um erro ao obter os dados!');
      callback();
    },
  );
  /* Personagens */
}

function render_campanhas_editar(json,callback) {
  render_campanhas_editar_permissoes(json);

  if (itsTrue(json.campanha.eh_narrador)) {
    preecherSelect(
      'campanhas_editar_uuid_medida_padrao',
      json.medidas,
      'uuid',
      (entry)=>`${entry.medida} (${entry.sigla})`,
      json.campanha.uuid_medida_padrao,
      ()=>{
        let propriedades = Object.keys(json.campanha);
        propriedades.forEach((propriedade, index) => {
          let valor = json.campanha[propriedade];
          render_campanhas_editar_campo(propriedade,valor,()=>{
            if (index === (propriedades.length - 1)) {
              renderLista(
                'campanhas_editar_moedas_utilizadas',
                json.moedas,
                'uuid','moeda',
                json.moedas_utilizadas,
                'uuid_moeda',
                ()=>{
                  preecherSelect(
                    'campanhas_editar_sistema',
                    json.sistemas,
                    'uuid',
                    (entry)=>`${entry.nome}`,
                    json.campanha.uuid_sistema,
                    ()=>{
                      listarPersonagens(()=>{
                        closeLoading();
                        callback();
                      });
                    }
                  );
                }
              );
            }
          });
        });
      }
    );
  } else {
    let propriedades = ['nome','narrador','data_cadastro'];
    propriedades.forEach((propriedade, index) => {
      let valor = json.campanha[propriedade];
      render_campanhas_editar_campo(propriedade,valor,()=>{
        if (index === (propriedades.length - 1)) {
          listarPersonagens(()=>{
            closeLoading();
            callback();
          });
        }
      });
    });
  }
}

function createItemMoeda(json,index,id,texto,valor) {
  let div = document.createElement('div');
  div.classList.add('bloco');
  div.classList.add('menor');
  if (isOdd(index)) {
    div.classList.add('menor-direita');
  }

  let label = document.createElement('label');
  label.classList.add('moeda');
  label.htmlFor = id;
  label.innerHTML = texto;

  let input = document.createElement('input');
  input.classList.add('moeda');
  input.id = id;
  input.setAttribute('name', id);
  input.setAttribute('type', 'number');
  input.setAttribute('min', '0');
  input.value = valor;

  if ( (json.eh_visualizador) || (!json.permissoes.permitir_alterar_moedas) ) {
    input.setAttribute('disabled','disabled');
    input.setAttribute('readonly','readonly');
  }

  div.appendChild(label);
  div.appendChild(input);

  return div;
}

function renderListaMoedas(json,callback) {
  let div = document.getElementById('personagens_editar_moedas');
  div.innerHTML = '';

  if (json.moedas.length == 0) {
    callback();
  } else {
    json.moedas.forEach((entry, index) => {
      let item = createItemMoeda(json,index,entry['uuid_moeda'],entry['moeda'],entry['quantidade']);
      div.appendChild(item);

      if (index === (json.moedas.length - 1)) {
        callback();
      }
    });
  }
}

function render_personagens_editar_campo(propriedade,valor,callback) {
  let ignorar_propriedades = ['eh_jogador','eh_narrador','eh_visualizador','sigla','uuid_medida_peso_maximo','url_campanha','permissoes','personagens_campanha','campanhas','uuid_sistema'];

  if (ignorar_propriedades.includes(propriedade)) {
    callback();
  } else {
    let nome_tag = `personagens_editar_${propriedade}`;
    let tag = document.getElementById(nome_tag);

    if ( (propriedade === 'url_narrador') || (propriedade === 'url_jogador') || (propriedade === 'url_visualizador') ) {
      render_alterar_link(tag,valor);
      callback();
    } else {
      tag.value = valor;
      callback();
    }
  }
}

function render_personagens_editar_permissoes_pode_enviar_moedas(json) {
  return (json.permissoes.permitir_entregar_moedas) &&
        (json.personagens_campanha) &&
        (json.personagens_campanha.length > 0);
}

function render_personagens_editar_permissoes(json) {
  if (json.permissoes.controlar_peso) {
    document.getElementById('personagens_editar_controlar_peso').style.display = 'block';
  } else {
    document.getElementById('personagens_editar_controlar_peso').style.display = 'none';
  }

  if (itsTrue(json.eh_narrador)) {
    mostrar_elemento('personagens_editar_salvar');
    enableInput('personagens_editar_nome');
    enableInput('personagens_editar_jogador');
    enableInput('personagens_editar_peso_maximo');
    mostrar_elemento('personagens_editar_permissao');
    if (render_personagens_editar_permissoes_pode_enviar_moedas(json)) {
      mostrar_elemento('personagens_editar_enviar_moedas');
      mostrar_elemento('personagens_editar_form_enviar_moedas');
    }
    mostrar_elemento('personagens_editar_alterar_campanhas');
    mostrar_elemento('personagens_editar_form_alterar_campanhas');
    mostrar_elemento('personagens_excluir');
    mostrar_elemento('personagens_excluir_form');
  } else if (itsTrue(json.eh_jogador)) {
    mostrar_elemento('personagens_editar_salvar');
    enableInput('personagens_editar_nome');
    enableInput('personagens_editar_jogador');
    enableInput('personagens_editar_peso_maximo');
    esconder_elemento('personagens_editar_permissao');
    if (render_personagens_editar_permissoes_pode_enviar_moedas(json)) {
      mostrar_elemento('personagens_editar_enviar_moedas');
      mostrar_elemento('personagens_editar_form_enviar_moedas');
    }
    mostrar_elemento('personagens_excluir');
    mostrar_elemento('personagens_excluir_form');
  } else {
    esconder_elemento('personagens_editar_salvar');
    disableInput('personagens_editar_nome');
    disableInput('personagens_editar_jogador');
    disableInput('personagens_editar_peso_maximo');
    esconder_elemento('personagens_editar_permissao');
    esconder_elemento('personagens_excluir');
    esconder_elemento('personagens_excluir_form');
  }
}

function renderLinhaItem_botao(id,bloco,classe,src,innerHTML,esconder,disabled,evento) {
  let button = document.createElement('button');
  button.id = id;
  button.setAttribute('type','button');
  if (esconder) {
    button.style.display = 'none';
  }
  if (disabled) {
    button.setAttribute('disabled','disabled');
  }

  if ( (classe) && (classe != '') ) {
    button.classList.add(classe);
  }

  let button_img = document.createElement('img');
  button_img.src = src;
  button.appendChild(button_img);

  let button_span = document.createElement('span');
  button_span.innerHTML = innerHTML;
  button.appendChild(button_span);

  button.addEventListener('click',evento);
  bloco.appendChild(button);
}

function renderLinhaItem_label(bloco,id,classe,innerHTML) {
  let label = document.createElement('label');
  label.setAttribute('for',id);

  if ( (classe) && (classe != '') ) {
    label.classList.add(classe);
  }
  label.innerHTML = innerHTML;

  bloco.appendChild(label);
}

function renderLinhaItem_textarea(bloco,value,id,disabled,classe) {
  let textarea = document.createElement('textarea');

  if (classe) {
    textarea.classList.add(classe);
  }

  textarea.value = value;
  textarea.id = id;
  textarea.setAttribute('name',id);

  if (disabled) {
    textarea.setAttribute('disabled','disabled');
    textarea.setAttribute('readonly','readonly');
  }

  bloco.appendChild(textarea);

  return textarea;
}

function renderLinhaItem_input(bloco,type,value,id,disabled,min,classe) {
  let input = document.createElement('input');
  input.setAttribute('type',type);

  if (classe) {
    input.classList.add(classe);
  }

  input.value = value;

  if ( (min) && isValidInteger(min) ) {
    input.setAttribute('min', min);
  }

  input.id = id;
  input.setAttribute('name',id);

  if (disabled) {
    input.setAttribute('disabled','disabled');
    input.setAttribute('readonly','readonly');
  }

  bloco.appendChild(input);

  return input;
}

function obterQuemEstaAcessando() {
  return document.getElementById('personagens_editar_quem_esta_acessando').value;
}

function obterItensLista(callback) {
  let tags = document.getElementById('itens_listar_lista');
  let lista_tags = [...tags.querySelectorAll('div.bloco-item')];

  if (lista_tags.length == 0) {
    callback([]);
  } else {
    let lista = [];

    lista_tags.forEach((tag, index) => {
      let uuid = tag.querySelector('input[type=hidden]').value;
      let tag_medida = document.getElementById(`medida_${uuid}`);
      let medida = tag_medida.options[tag_medida.selectedIndex].innerHTML;
      let peso_unitario = document.getElementById(`peso_${uuid}`).value;
      let quantidade = document.getElementById(`quantidade_${uuid}`).value

      lista.push({
        uuid: uuid,
        medida: medida,
        peso_unitario: peso_unitario,
        quantidade: quantidade,
      });

      if (index == (lista_tags.length - 1)) {
        callback(lista);
      }
    });
  }
}

function renderLinhaItem(permissoes,itens_base,medidas,select_medidas,item,editar,exibir_log) {
  /* IDs */
  let hidden_item_id = `id_${item.uuid}`;
  let input_item_id = `item_${item.uuid}`;
  let input_detalhes_id = `detalhes_${item.uuid}`;
  let input_quantidade_id = `quantidade_${item.uuid}`;
  let bloco_log_id = `log_${item.uuid}`;
  let bloco_mensagem_id = `mensagem_${item.uuid}`;
  let input_peso_id = `peso_${item.uuid}`;
  let select_medidas_clonado_id = `medida_${item.uuid}`;
  let button_usar_id = `button-usar_${item.uuid}`;
  let button_log_id = `button-log_${item.uuid}`;
  let button_editar_id = `button-editar_${item.uuid}`;
  let button_salvar_id = `button-salvar_${item.uuid}`;
  let button_excluir_id = `button-excluir_${item.uuid}`;
  let button_inserir_id = `button-inserir_${item.uuid}`;
  let button_cancelar_id = `button-cancelar_${item.uuid}`;

  let ehUsuarioComPermissao = (permissoes.eh_narrador || permissoes.eh_jogador);

  let linha = document.createElement('div');
  linha.id = item.uuid;
  linha.classList.add('bloco');
  linha.classList.add('bloco-item');

  /* UUID Item */
  renderLinhaItem_input(
    linha,
    'hidden',
    item.uuid,
    hidden_item_id,
    false,
    null,
    null
  );

  /* Descrição */
  let bloco_input_item = document.createElement('div');
  bloco_input_item.classList.add('bloco');
  bloco_input_item.classList.add('item');
  bloco_input_item.classList.add('borda');

  renderLinhaItem_label(
    bloco_input_item,
    input_item_id,
    null,
    'Item'
  );

  let bloco_input_item_autocomplete = document.createElement('div');
  bloco_input_item_autocomplete.classList.add('autocomplete');
  bloco_input_item_autocomplete.classList.add('autocomplete-size');

  let input_item_autocomplete = renderLinhaItem_input(
    bloco_input_item_autocomplete,
    'text',
    item.descricao,
    input_item_id,
    editar,
    null,
    'inserir'
  );

  bloco_input_item.appendChild(bloco_input_item_autocomplete);

  if (editar) {
    // EDITAR

    /* Botão Editar */
    let podeAlterarItem = (ehUsuarioComPermissao && permissoes.permitir_alterar_item);

    renderLinhaItem_botao(
      button_editar_id,
      bloco_input_item,
      'verde',
      'img/pen-to-square-solid.svg',
      'Editar',
      false,
      !podeAlterarItem,
      (event)=>{
        event.preventDefault();
        enableInput(input_item_id);
        enableInput(input_detalhes_id);
        enableInput(input_quantidade_id);
        enableInput(input_peso_id);
        enableInput(select_medidas_clonado_id);
        esconder_elemento(button_editar_id);
        mostrar_elemento(button_salvar_id);
      }
    );

    /* Botão Salvar */
    renderLinhaItem_botao(
      button_salvar_id,
      bloco_input_item,
      'verde',
      'img/floppy-disk-solid.svg',
      'Salvar',
      true,
      !podeAlterarItem,
      (event)=>{
        event.preventDefault();
        let uuid = document.getElementById(hidden_item_id).value;
        let url_personagem = document.getElementById('personagens_editar_url').value;
        let uuid_personagem = document.getElementById('personagens_editar_uuid').value;
        let descricao = document.getElementById(input_item_id).value;
        let detalhes = document.getElementById(input_detalhes_id).value;
        let quantidade = document.getElementById(input_quantidade_id).value;
        let peso_unitario = document.getElementById(input_peso_id).value;
        let select = document.getElementById(select_medidas_clonado_id);
        let uuid_medida_peso_unitario = select.options[select.selectedIndex].value;
        let uuid_medida_peso_unitario_texto = select.options[select.selectedIndex].innerHTML;

        /* Mensagem */
        let mensagem = `${obterQuemEstaAcessando()} alterou os dados do item de (Descrição: ${item.descricao}, Infos: ${item.detalhes}, Qtde: ${item.quantidade}, Peso: ${item.peso_unitario} ${item.medida}) para (Descrição: ${descricao}, Infos: ${detalhes}, Qtde: ${quantidade}, Peso: ${peso_unitario} ${uuid_medida_peso_unitario_texto})`;

        let json_alterar = {
          uuid: uuid,
          url_personagem: url_personagem,
          uuid_personagem: uuid_personagem,
          descricao: descricao,
          detalhes: detalhes,
          quantidade: quantidade,
          peso_unitario: peso_unitario,
          uuid_medida_peso_unitario: uuid_medida_peso_unitario,
          mensagem: mensagem,
        };

        validarItem(json_alterar,(valido)=>{
          if (valido) {
            // Item válido

            openJustLoading();

            json_alterar.descricao = capitalize(json_alterar.descricao);
            document.getElementById(input_item_id).value = json_alterar.descricao;
            json_alterar.detalhes = capitalize(json_alterar.detalhes);
            document.getElementById(input_detalhes_id).value = json_alterar.detalhes;

            alterar(
              createURL('itens.php'),
              json_alterar,
              (json_retorno)=>{
                document.getElementById(bloco_mensagem_id).innerHTML = json_retorno.mensagem;
                document.getElementById(bloco_log_id).style.display = 'block';
                disableInput(input_item_id);
                disableInput(input_detalhes_id);
                disableInput(input_quantidade_id);
                disableInput(input_peso_id);
                disableInput(select_medidas_clonado_id);
                esconder_elemento(button_salvar_id);
                mostrar_elemento(button_editar_id);

                obterItensLista((lista_itens_tags)=>{
                  renderTituloPesoMaximo(lista_itens_tags,()=>{
                    closeLoading();
                    renderToast('Item atualizado com sucesso!');
                  });
                });
              },
              (erro)=>{
                console.error(erro);
                closeLoading();
                renderErrorToast('Ocorreu um erro ao alterar o item!');
              },
            );

            // Item válido
          }
        });
      }
    );

  // EDITAR
  } else { // INSERIR
    let podeInserirItem = (ehUsuarioComPermissao && permissoes.permitir_incluir_item);

    /* Botão Inserir */
    renderLinhaItem_botao(
      button_inserir_id,
      bloco_input_item,
      'inserir',
      'img/floppy-disk-solid.svg',
      'Inserir',
      false,
      !podeInserirItem,
      (event)=>{
        event.preventDefault();

        let descricao = document.getElementById(input_item_id).value;
        let detalhes = document.getElementById(input_detalhes_id).value;
        let quantidade = document.getElementById(input_quantidade_id).value;
        let peso_unitario = document.getElementById(input_peso_id).value;
        let select = document.getElementById(select_medidas_clonado_id);
        let uuid_medida_peso_unitario = select.options[select.selectedIndex].value;
        let uuid_medida_peso_unitario_texto = select.options[select.selectedIndex].innerHTML;

        /* Mensagem */
        let mensagem = `${obterQuemEstaAcessando()} inseriu o item (Descrição: ${descricao}, Infos: ${detalhes}, Qtde: ${quantidade}, Peso: ${peso_unitario} ${uuid_medida_peso_unitario_texto})`;

        item.descricao = descricao;
        item.detalhes = detalhes;
        item.quantidade = quantidade;
        item.peso_unitario = peso_unitario;
        item.uuid_medida_peso_unitario = uuid_medida_peso_unitario;
        item.mensagem = mensagem;

        validarItem(item,(valido)=>{
          if (valido) {
            // Item válido

            openJustLoading();

            item.descricao = capitalize(item.descricao);
            document.getElementById(input_item_id).value = item.descricao;
            item.detalhes = capitalize(item.detalhes);
            document.getElementById(input_detalhes_id).value = item.detalhes;

            inserir(
              createURL('itens.php'),
              item,
              (json_retorno)=>{
                /* Itens */
                obter_com_parametro(
                  createURL('itens.php'),
                  'personagem',
                  item.url_personagem,
                  (json_lista_itens)=>{
                    let lista = document.getElementById('itens_listar_lista');
                    lista.innerHTML = '';

                    // Lista de itens
                    json_lista_itens.itens.forEach((entry, index) => {
                      let eh_para_exibir_log = false;
                      if (entry.uuid === item.uuid) {
                        eh_para_exibir_log = true;
                      }
                      let linha = renderLinhaItem(permissoes,itens_base,medidas,select_medidas,entry,true,eh_para_exibir_log);
                      lista.appendChild(linha);

                      if (index === (json_lista_itens.itens.length - 1)) {
                        renderTituloPesoMaximo(json_lista_itens.itens,()=>{
                          closeLoading();
                          renderToast('Item inserido com sucesso!');
                        });
                      }
                    });
                    // Lista de itens

                  },
                  (erro)=>{
                    console.error(erro);
                    renderErrorToast('Ocorreu um erro ao obter os dados!');
                    callback();
                  },
                );
                /* Itens */
              },
              (erro)=>{
                console.error(erro);
                closeLoading();
                renderErrorToast('Ocorreu um erro ao inserir o item!');
              },
            );

            // Item válido
          }
        });
      }
    );

  } // INSERIR

  linha.appendChild(bloco_input_item);
  /* Descrição */

  /* Detalhes */
  let bloco_input_detalhes = document.createElement('div');
  bloco_input_detalhes.classList.add('bloco');
  bloco_input_detalhes.classList.add('item');
  bloco_input_detalhes.classList.add('borda');

  renderLinhaItem_label(
    bloco_input_detalhes,
    input_detalhes_id,
    null,
    'Infos'
  );

  renderLinhaItem_input(
    bloco_input_detalhes,
    'text',
    item.detalhes,
    input_detalhes_id,
    editar,
    null,
    'inserir'
  );

  linha.appendChild(bloco_input_detalhes);

  if (editar) {
    // EDITAR

    /* Botão Log */
    renderLinhaItem_botao(
      button_log_id,
      bloco_input_detalhes,
      'azul',
      'img/file-lines-solid.svg',
      'Log',
      false,
      false,
      (event)=>{
        event.preventDefault();
        let div_log = document.getElementById(bloco_log_id);
        if (div_log.style.display === 'none') {
          div_log.style.display = 'block';
        } else {
          div_log.style.display = 'none';
        }
      }
    );

    // EDITAR
  }

  /* Detalhes */

  let bloco_outros = document.createElement('div');
  bloco_outros.classList.add('bloco');
  bloco_outros.classList.add('item');

  /* Quantidade */
  renderLinhaItem_label(
    bloco_outros,
    input_quantidade_id,
    'small-caps',
    'qtde'
  );

  renderLinhaItem_input(
    bloco_outros,
    'number',
    item.quantidade,
    input_quantidade_id,
    editar,
    0,
    null
  );

  if (editar) { // EDITAR

    /* Botão Quantidade */
    let podeAlterarQuantidade = (
      ehUsuarioComPermissao &&
      (permissoes.permitir_alterar_quantidade_item || permissoes.permitir_alterar_item)
    );

    renderLinhaItem_botao(
      button_usar_id,
      bloco_outros,
      'usar',
      'img/file-circle-minus-solid.svg',
      'Usar',
      false,
      !podeAlterarQuantidade,
      (event)=>{
        event.preventDefault();
        let url_personagem = document.getElementById('personagens_editar_url').value;
        let input_quantidade = document.getElementById(input_quantidade_id);
        let retorno = validarNumeroInteiro(input_quantidade.value);
        if (retorno.valido) {
          let quantidade = retorno.valor;
          if (quantidade > 0) {
            let quantidade_antiga = quantidade;
            quantidade = quantidade - 1;

            /* Mensagem */
            let mensagem = `${obterQuemEstaAcessando()} alterou a quantidade do item ${item.descricao} de ${quantidade_antiga} para ${quantidade}.`;
            let json_alterar = {
              url_personagem: url_personagem,
              uuid: item.uuid,
              quantidade: quantidade,
              mensagem: mensagem
            };

            openJustLoading();
            alterar(
              createURL('itens.php'),
              json_alterar,
              (json_retorno)=>{
                document.getElementById(bloco_mensagem_id).innerHTML = json_retorno.mensagem;
                document.getElementById(bloco_log_id).style.display = 'block';
                input_quantidade.value = quantidade;

                obterItensLista((lista_itens_tags)=>{
                  renderTituloPesoMaximo(lista_itens_tags,()=>{
                    closeLoading();
                    renderToast('Quantidade do item atualizada!');
                  });
                });
              },
              (erro)=>{
                console.error(erro);
                closeLoading();
                renderErrorToast('Ocorreu um erro ao alterar a quantidade!');
              },
            );

          } else {
            renderWarningToast('O personagem não possui unidades deste item!');
          }
        }
      }
    );
    /* Quantidade */

  } // EDITAR

  /* Peso */
  renderLinhaItem_label(
    bloco_outros,
    input_peso_id,
    'espaco',
    'Peso'
  );

  let input_peso_unitario = renderLinhaItem_input(
    bloco_outros,
    'text',
    item.peso_unitario,
    input_peso_id,
    editar,
    null,
    'like-number'
  );
  input_peso_unitario.addEventListener('keyup', template_com_virgula);

  let select_medidas_clonado = select_medidas.cloneNode(true);
  select_medidas_clonado.id = select_medidas_clonado_id;
  let index_medida = medidas.findIndex(entry => entry.uuid === item.uuid_medida_peso_unitario);
  select_medidas_clonado.selectedIndex = index_medida;
  if (editar) {
    select_medidas_clonado.setAttribute('disabled','disabled');
    select_medidas_clonado.setAttribute('readonly','readonly');
  }
  bloco_outros.appendChild(select_medidas_clonado);
  /* Peso */

  if (editar) {
    // EDITAR

    /* Botão Excluir */
    let podeExcluirItem = (ehUsuarioComPermissao && permissoes.permitir_excluir_item);

    renderLinhaItem_botao(
      button_excluir_id,
      bloco_outros,
      'excluir',
      'img/trash-solid.svg',
      'Excluir',
      false,
      !podeExcluirItem,
      (event)=>{
        event.preventDefault();
        let uuid = document.getElementById(hidden_item_id).value;
        document.getElementById('modal_item_uuid').value = uuid;
        let quem_esta_acessando = obterQuemEstaAcessando();
        document.getElementById('modal_item_quem_esta_acessando').value = quem_esta_acessando;
        mostrar_elemento('modal_item');
      }
    );

    // EDITAR
  }  else { // INSERIR
    /* Botão Cancelar */
    renderLinhaItem_botao(
      button_cancelar_id,
      bloco_outros,
      'cancelar',
      'img/xmark-solid.svg',
      'Cancelar',
      false,
      false,
      (event)=>{
        event.preventDefault();
        let elementToRemove = document.getElementById(item.uuid);
        if (elementToRemove) {
          elementToRemove.remove();
        }

        let lista = document.getElementById('itens_listar_lista');
        let registros = [...lista.querySelectorAll('div.bloco-item')];
        if (registros.length == 0) {
          let div_sem_itens = renderLinhaVaziaItens('Personagem sem itens');
          lista.appendChild(div_sem_itens);
        }
      }
    );
  } // INSERIR

  linha.appendChild(bloco_outros);

  if (editar) { // EDITAR

    /* Log */
    let bloco_log = document.createElement('div');
    bloco_log.id = bloco_log_id;
    bloco_log.classList.add('bloco');
    bloco_log.classList.add('item');
    if (!exibir_log) {
      bloco_log.style.display = 'none';
    }

    let label_log = document.createElement('label');
    label_log.id = bloco_mensagem_id;
    label_log.classList.add('log');
    label_log.innerHTML = item.alteracao;
    bloco_log.appendChild(label_log);
    /* Log */

    linha.appendChild(bloco_log);

  } // EDITAR

  if (!editar) { // INSERIR
    let campos_autocomplete = {
      descricao: input_item_id,
      detalhes: input_detalhes_id,
      quantidade: input_quantidade_id,
      peso_unitario: input_peso_id,
      uuid_medida_peso_unitario: select_medidas_clonado_id,
    };

    render_item_autocomplete(
      campos_autocomplete,
      input_item_autocomplete,
      itens_base,
      ()=>{}
    );
  } // INSERIR

  return linha;
}

function renderMedidasSelect(medidas,callback) {
  let select = document.createElement('select');

  medidas.forEach((medida, index) => {
    let option = document.createElement('option');
    option.value = medida.uuid;
    option.innerHTML = medida.medida;
    select.appendChild(option);

    if (index === (medidas.length - 1)) {
      callback(select);
    }
  });
}

function renderControlePesoAtual(medida,peso_maximo,peso_atual) {
  let peso_maximo_em_gramas = conversorUniversalParaGramas(medida,peso_maximo);
  if (peso_maximo_em_gramas > 0) {
    peso_maximo = peso_maximo_em_gramas;
  } else {
    peso_maximo = 0;
  }

  let tag_peso_atual = document.getElementById('itens_listar_peso_atual');
  if (peso_atual <= peso_maximo) {
    tag_peso_atual.style.backgroundColor = '#c8e6c9';
    tag_peso_atual.style.color = '#388e3c';
  } else {
    tag_peso_atual.style.backgroundColor = '#ffab91';
    tag_peso_atual.style.color = '#bf360c';
  }

  tag_peso_atual.value = conversorUniversalDeGramasPara(medida,peso_atual).replace('.', ',');
}

function renderControlePesoMaximo(medida,peso_maximo) {
  document.getElementById('itens_listar_peso_maximo').value = parseFloat(peso_maximo).toFixed(1).replace('.', ',');
  document.getElementById('itens_listar_medida').innerHTML = medida;
}

function renderTituloPesoMaximo(itens,callback) {
  let medida = document.getElementById('personagens_editar_medida_sem_alterar').value;
  let peso_maximo = document.getElementById('personagens_editar_peso_maximo_sem_alterar').value;

  renderControlePesoMaximo(medida,peso_maximo);
  let peso_atual_em_gramas = 0;

  if (itens.length == 0) {
    renderControlePesoAtual(medida,peso_maximo,peso_atual_em_gramas);
    callback();
  } else {
    itens.forEach((item, index) => {
      let peso_unitario = conversorUniversalParaGramas(item.medida,item.peso_unitario);
      peso_atual_em_gramas += (peso_unitario * item.quantidade);

      if (index == (itens.length - 1)) {
        renderControlePesoAtual(medida,peso_maximo,peso_atual_em_gramas);
        callback();
      }
    });
  }
}

function listarItensBase(uuid_sistema,callback) {
  obter_com_parametro(
    createURL('itens.php'),
    'sistema',
    uuid_sistema,
    (json)=>{
      callback(json);
    },
    (erro)=>{
      console.error(erro);
      renderErrorToast('Ocorreu um erro ao obter os dados!');
      callback([]);
    },
  );
}

function listarItens(personagem,callback) {
  let lista = document.getElementById('itens_listar_lista');
  lista.innerHTML = '';
  let url = document.getElementById('personagens_editar_url').value;

  /* Itens */
  obter_com_parametro(
    createURL('itens.php'),
    'personagem',
    url,
    (json)=>{
      renderMedidasSelect(json.medidas,(select_medidas)=>{
        let permissoes = {
          ...{
            eh_narrador: itsTrue(personagem.eh_narrador),
            eh_jogador: itsTrue(personagem.eh_jogador),
            eh_visualizador: itsTrue(personagem.eh_visualizador),
          },
          ...personagem.permissoes
        };

        renderTituloPesoMaximo(json.itens,()=>{
          // Título

          listarItensBase(personagem.uuid_sistema,(itens_base)=>{
            // Itens Base

            if (json.itens.length == 0) {
              render_botao_itens_listar_inserir(personagem,permissoes,itens_base,json.medidas,select_medidas);
              let div = renderLinhaVaziaItens('Personagem sem itens');
              lista.appendChild(div);
              callback();
            } else {
              json.itens.forEach((item, index) => {
                let linha = renderLinhaItem(permissoes,itens_base,json.medidas,select_medidas,item,true,false);
                lista.appendChild(linha);

                if (index === (json.itens.length - 1)) {
                  render_botao_itens_listar_inserir(personagem,permissoes,itens_base,json.medidas,select_medidas);
                  callback();
                }
              });
            }

            // Itens Base
          });

          // Título
        });
      });
    },
    (erro)=>{
      console.error(erro);
      renderErrorToast('Ocorreu um erro ao obter os dados!');
      callback();
    },
  );
  /* Itens */
}

function render_botao_itens_listar_inserir(json,permissoes,itens_base,medidas,select_medidas) {

  let podeIncluirItem = (
    (permissoes.eh_narrador || permissoes.eh_jogador) &&
    permissoes.permitir_incluir_item
  );

  if (podeIncluirItem) { // PODE INCLUIR

    let div_titulo = document.getElementById('itens_listar');
    let button = document.createElement('button');
    let img = document.createElement('img');
    img.src = 'img/plus-solid.svg';
    button.appendChild(img);
    let span = document.createElement('span');
    span.innerHTML = 'Inserir';
    button.appendChild(span);
    div_titulo.appendChild(button);

    button.addEventListener('click',(event)=>{
      event.preventDefault();

      let novo_item = {
        uuid: generateUUID(),
        descricao: '',
        detalhes: '',
        quantidade: 1,
        peso_unitario: '0',
        uuid_medida_peso_unitario: json.uuid_medida_padrao,
        uuid_personagem: json.uuid,
        url_personagem: document.getElementById('personagens_editar_url').value,
      };

      let lista = document.getElementById('itens_listar_lista');

      /* Se não houver registros, apaga a mensagem "sem itens" */
      let sem_registros = lista.querySelector('div.bloco > label.sem-registros');
      if (sem_registros) {
        lista.innerHTML = '';
      }

      let linha = renderLinhaItem(permissoes,itens_base,medidas,select_medidas,novo_item,false,false);
      lista.insertBefore(linha, lista.firstChild);
    });

  } // PODE INCLUIR
}

function render_personagens_editar(json,callback) {
  render_personagens_editar_permissoes(json);

  preecherSelect(
    'personagens_editar_form_enviar_moedas_moeda',
    json.moedas,
    'uuid_moeda',
    (entry)=>`${entry.moeda}`,
    '',
    ()=>{
        // Combo moedas preenchido
        preecherSelect(
          'personagens_editar_form_enviar_moedas_personagem',
          json.personagens_campanha,
          'uuid',
          (entry)=>`${entry.personagem}`,
          '',
          ()=>{
            // Combo personagens preenchido

            preecherSelect(
              'personagens_editar_form_alterar_campanhas_campanha',
              json.campanhas,
              'uuid',
              (entry)=>`${entry.campanha}`,
              '',
              ()=>{
                /* Para usar no cálculo do peso máximo e peso atual */
                document.getElementById('personagens_editar_medida_sem_alterar').value = json.medida;
                document.getElementById('personagens_editar_peso_maximo_sem_alterar').value = json.peso_maximo;

                // Combo campanhas preenchido
                let propriedades = Object.keys(json);
                propriedades.forEach((propriedade, index) => {
                  let valor = json[propriedade];

                  render_personagens_editar_campo(propriedade,valor,()=>{
                    if (index === (propriedades.length - 1)) {
                      renderListaMoedas(json,()=>{
                        listarItens(json,()=>{
                          closeLoading();
                          callback();
                        });
                      });
                    }
                  });
                });
                // Combo campanhas preenchido
              }
            );
            // Combo personagens preenchido
          }
        );
        // Combo moedas preenchido
      }
    );

}

/******************************************************************************/
/******************************     EVENTOS     *******************************/
/******************************************************************************/

function exibir_registro_via_url(event,url) {
  event.preventDefault();
  adicionarValorAtualBotaoSalvar();
  let href = render_alterar_link_gerar_url(url);
  window.location.href = href;
}

function atualizar_pagina_atual(event) {
  event.preventDefault();
  location.reload();
}

function executar_botoes_copiar(event,id) {
  event.preventDefault();
  let url = document.getElementById(id).href;
  copiarParaClipboard(url);
}

function campanhas_editar_botao_narrador(event) {
  executar_botoes_copiar(event,'campanhas_editar_url_narrador');
}

function campanhas_editar_botao_jogador(event) {
  executar_botoes_copiar(event,'campanhas_editar_url_jogador');
}

function campanhas_editar_botao_visualizador(event) {
  executar_botoes_copiar(event,'campanhas_editar_url_visualizador');
}

function campanhas_editar_salvar(event) {
  event.preventDefault();
  let url = document.getElementById('campanhas_editar_url').value;

  let json = {
    url: url
  };
  obterValorInputText(json,'campanhas_editar_uuid');

  obterValorInputText(json,'campanhas_editar_nome');
  obterValorSelect(json,'campanhas_editar_sistema');
  obterValorInputText(json,'campanhas_editar_narrador');
  obterValorInputText(json,'campanhas_editar_data_cadastro');

  obterValorCheckbox(json,'campanhas_editar_controlar_peso');
  obterValorCheckbox(json,'campanhas_editar_permitir_incluir_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_alterar_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_alterar_quantidade_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_excluir_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_entregar_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_alterar_moedas');
  obterValorCheckbox(json,'campanhas_editar_permitir_entregar_moedas');

  obterValorSelect(json,'campanhas_editar_uuid_medida_padrao');

  obterValorListaCheckbox(json,'campanhas_editar_moedas_utilizadas');

  obterValorLink(json,'campanhas_editar_url_narrador');
  obterValorLink(json,'campanhas_editar_url_jogador');
  obterValorLink(json,'campanhas_editar_url_visualizador');

  if (validarCampanha(json)) {
    openLoading();

    json.nome = capitalize(json.nome);
    json.narrador = capitalize(json.narrador);

    alterar(
      createURL('campanhas.php'),
      json,
      (json_retorno)=>{
        router('campanhas_editar');
        render_campanhas_editar(json_retorno,()=>{
          closeLoading();
          renderToast('Campanha atualizada com sucesso!');
        });
      },
      (erro)=>{
        router('campanhas_editar');
        console.error(erro);
        closeLoading();
        renderErrorToast('Ocorreu um erro ao salvar os dados!');
      },
    );
  }
}

function texto_botao_mostrar_listener(event) {
  event.preventDefault();
  document.getElementById('texto-botao-mostrar').style.display = 'none';
  document.getElementById('texto-botao-esconder').style.display = 'block';
  document.getElementById('texto-bloco').style.display = 'block';
}

function texto_botao_esconder_listener(event) {
  event.preventDefault();
  document.getElementById('texto-botao-esconder').style.display = 'none';
  document.getElementById('texto-botao-mostrar').style.display = 'block';
  document.getElementById('texto-bloco').style.display = 'none';
}

function header_botao_voltar() {
  let valor_botao_salvar = obterValorBotaoSalvar();
  removerValorBotaoSalvar();
  window.location.href = valor_botao_salvar.href;
}

function header_botao_voltar_listener(event) {
  event.preventDefault();
  header_botao_voltar();
}

function campanhas_nova_cancelar_listener(event) {
  event.preventDefault();
  document.getElementById('campanhas_nova_nome').value = '';
  document.getElementById('campanhas_nova_narrador').value = '';
  esconder_elemento('campanhas_nova');
}

function personagens_novo_cancelar_listener(event) {
  event.preventDefault();
  document.getElementById('personagens_novo_nome').value = '';
  document.getElementById('personagens_novo_jogador').value = '';
  esconder_elemento('personagens_novo');
}

function campanhas_nova_salvar_listener(event) {
  event.preventDefault();

  let url_narrador = generateUUID();
  let json = {
    url_narrador: url_narrador
  };
  obterValorInputText(json,'campanhas_nova_nome');
  obterValorInputText(json,'campanhas_nova_narrador');
  obterValorSelect(json,'campanhas_nova_sistema');

  if (validarCampanha(json)) {
    openLoading();

    json.nome = capitalize(json.nome);
    json.narrador = capitalize(json.narrador);

    inserir(
      createURL('campanhas.php'),
      json,
      ()=>{
        /* Campanha SALVA, obter dados */
        obter_com_parametro(
          createURL('campanhas.php'),
          'url',
          url_narrador,
          (json_retorno)=>{
            history.pushState({}, "narrador", `?url=${url_narrador}`);
            router('campanhas_editar');
            document.getElementById('campanhas_editar_url').value = url_narrador;
            document.getElementById('campanhas_nova_nome').value = '';
            document.getElementById('campanhas_nova_narrador').value = '';

            render_campanhas_editar(json_retorno,()=>{
              closeLoading();
            });
          },
          (erro)=>{
            router('campanhas_listar');
            console.error(erro);
            closeLoading();
            renderErrorToast('Ocorreu um erro ao obter os dados!');
          },
        );
        /* Campanha SALVA, obter dados */
      },
      (erro)=>{
        console.error(erro);
        closeLoading();
        renderErrorToast('Ocorreu um erro ao salvar os dados!');
      },
    );
  }
}

function campanhas_nova_abrir_listener(event) {
  event.preventDefault();
  mostrar_elemento('campanhas_nova');
}

function personagens_novo_abrir_listener(event) {
  event.preventDefault();
  mostrar_elemento('personagens_novo');
}

function personagens_novo_salvar_listener(event) {
  event.preventDefault();

  let url_verificar_permissao = generateUUID();
  let json = {
    url_verificar_permissao: url_verificar_permissao,
    url_campanha: document.getElementById('campanhas_editar_url').value,
    uuid_campanha: document.getElementById('campanhas_editar_uuid').value
  };

  obterValorInputText(json,'personagens_novo_nome');
  obterValorInputText(json,'personagens_novo_jogador');

  validarPersonagem(json,true,(valido)=>{
    if (valido) {
      openLoading();

      json.nome = capitalize(json.nome);
      json.jogador = capitalize(json.jogador);

      inserir(
        createURL('personagens.php'),
        json,
        ()=>{
          /* Personagem salvo com sucesso */
          obter_com_parametro(
            createURL('personagens.php'),
            'url',
            url_verificar_permissao,
            (personagem)=>{
              history.pushState({}, "narrador", `?url=${url_verificar_permissao}`);
              router('personagens_editar');
              document.getElementById('personagens_editar_url').value = url_verificar_permissao;
              document.getElementById('personagens_novo_nome').value = '';
              document.getElementById('personagens_novo_jogador').value = '';

              /* Permissões */
              personagensConverterPermissoes(personagem);

              render_personagens_editar(personagem,()=>{
                closeLoading();
              });
            },
            (erro)=>{
              router('erro','Sorry, mas seu personagem não foi encontrado :(');
              console.error(erro);
              closeLoading();
              renderErrorToast('Ocorreu um erro ao obter os dados!');
            },
          );
          /* Personagem salvo com sucesso */
        },
        (erro)=>{
          console.error(erro);
          closeLoading();
          renderErrorToast('Ocorreu um erro ao salvar os dados!');
        },
      );
    }
  });

}

function personagens_editar_salvar(event) {
  event.preventDefault();
  let url = document.getElementById('personagens_editar_url').value;

  let json = {
    url: url
  };
  obterValorInputText(json,'personagens_editar_uuid');
  obterValorInputText(json,'personagens_editar_uuid_campanha');

  obterValorInputText(json,'personagens_editar_nome');
  obterValorInputText(json,'personagens_editar_jogador');

  obterValorInputText(json,'personagens_editar_peso_maximo');

  obterValorListaMoedas(json,'personagens_editar_moedas',()=>{
    /* Alterações das moedas */

    obterValorLink(json,'personagens_editar_url_narrador');
    obterValorLink(json,'personagens_editar_url_jogador');
    obterValorLink(json,'personagens_editar_url_visualizador');

    validarPersonagem(json,false,(valido)=>{
      if (valido) {
        openLoading();

        json.nome = capitalize(json.nome);
        json.jogador = capitalize(json.jogador);

        json['eh_narrador'] = false;
        json['eh_jogador'] = false;
        json['eh_visualizador'] = true;

        if (stringEhValida(json['url_jogador'])) {
          json['eh_narrador'] = false;
          json['eh_jogador'] = true;
          json['eh_visualizador'] = false;
        }

        if (stringEhValida(json['url_narrador'])) {
          json['eh_narrador'] = true;
          json['eh_jogador'] = false;
          json['eh_visualizador'] = false;
        }

        alterar(
          createURL('personagens.php'),
          json,
          (json_retorno)=>{
            router('personagens_editar');

            /* Permissões */
            personagensConverterPermissoes(json_retorno);

            render_personagens_editar(json_retorno,()=>{
              closeLoading();
              renderToast('Personagem atualizado com sucesso!');
            });
          },
          (erro)=>{
            router('personagens_editar');
            console.error(erro);
            closeLoading();
            renderErrorToast('Ocorreu um erro ao salvar os dados!');
          },
        );

      }
    });

    /* Alterações das moedas */
  });
}

function template_com_virgula(event) {
  event.target.value = event.target.value.replace(/[^0-9,]/g, '');
}

function personagens_editar_url_narrador_botao(event) {
  executar_botoes_copiar(event,'personagens_editar_url_narrador');
}

function personagens_editar_url_jogador_botao(event) {
  executar_botoes_copiar(event,'personagens_editar_url_jogador');
}

function personagens_editar_url_visualizador_botao(event) {
  executar_botoes_copiar(event,'personagens_editar_url_visualizador');
}

function personagens_editar_enviar_moedas_button(event) {
  event.preventDefault();
  let url = document.getElementById('personagens_editar_url').value;

  let json = {
    url: url
  };
  obterValorInputText(json,'personagens_editar_form_enviar_moedas_quantidade');
  obterValorSelect(json,'personagens_editar_form_enviar_moedas_moeda');
  obterValorSelect(json,'personagens_editar_form_enviar_moedas_personagem');

  validarEnviarMoedas(json,(valido)=>{
    if (valido) {
      // Enviar moedas válido
      openLoading();
      alterar(
        createURL('moedas.php'),
        json,
        (json_retorno)=>{
          /* Moedas enviadas com sucesso */
          document.getElementById('personagens_editar_form_enviar_moedas_quantidade').value = 0;
          router('personagens_editar');

          /* Permissões */
          personagensConverterPermissoes(json_retorno);

          render_personagens_editar(json_retorno,()=>{
            closeLoading();
            renderToast('Moedas enviadas com sucesso!');
          });
          /* Moedas enviadas com sucesso */
        },
        (erro)=>{
          closeLoading();
          if (erro == '400: Bad Request') {
            console.warn(erro);
            renderWarningToast('Os dados para enviar Moedas estão incorretos!');
          } else {
            console.error(erro);
            renderErrorToast('Ocorreu um erro ao enviar as moedas!');
          }
        },
      );
      // Enviar moedas válido
    }
  });
}

function personagens_editar_alterar_campanhas_button(event) {
  event.preventDefault();
  let url = document.getElementById('personagens_editar_url').value;

  let json = {
    url: url
  };
  obterValorSelect(json,'personagens_editar_form_alterar_campanhas_campanha');

  openLoading();
  alterar(
    createURL('personagens.php'),
    json,
    (json_retorno)=>{
      /* Campanha alterada */

      localStorage.setItem(VARIAVEL_MENSAGEM, 'O Personagem foi alterado de Campanha com sucesso!');
      header_botao_voltar();

      /* Campanha alterada */
    },
    (erro)=>{
      closeLoading();
      if (erro == '400: Bad Request') {
        console.warn(erro);
        renderWarningToast('Os dados para enviar Moedas estão incorretos!');
      } else {
        console.error(erro);
        renderErrorToast('Ocorreu um erro ao enviar as moedas!');
      }
    },
  );
}

function modal_fechar(event) {
  event.preventDefault();
  document.getElementById('modal_pagina').value = '';
  document.getElementById('modal_uuid').value = '';
  document.getElementById('modal_mensagem').value = '';
  esconder_elemento('modal');
}

function modal_item_fechar(event) {
  event.preventDefault();
  document.getElementById('modal_item_uuid').value = '';
  document.getElementById('modal_item_quem_esta_acessando').value = '';
  esconder_elemento('modal_item');
}

function verificar_mensagem() {
  let existeMensagem = localStorage.getItem(VARIAVEL_MENSAGEM);
  if ( (existeMensagem) && (existeMensagem != '') ) {
    localStorage.removeItem(VARIAVEL_MENSAGEM);
    renderToast(existeMensagem);
  }
}

function modal_excluir(event) {
  event.preventDefault();
  let pagina = document.getElementById('modal_pagina').value;
  let uuid = document.getElementById('modal_uuid').value;
  let mensagem = document.getElementById('modal_mensagem').value;

  if ( (stringEhValida(pagina)) && (uuidEhValido(uuid)) ) {
    openLoading();
    excluir(
      createURL(pagina),
      uuid,
      ()=>{
        localStorage.setItem(VARIAVEL_MENSAGEM, mensagem);
        header_botao_voltar();
      },
      (erro)=>{
        console.error(erro);
        renderErrorToast('Ocorreu um erro ao excluir o registro!');
      },
    );
  } else {
    renderErrorToast('Ocorreu um erro ao excluir o registro!');
  }
}

function modal_item_excluir(event) {
  event.preventDefault();
  let uuid = document.getElementById('modal_item_uuid').value;
  let quem_esta_acessando = document.getElementById('modal_item_quem_esta_acessando').value;

  if ( (stringEhValida(quem_esta_acessando)) && (uuidEhValido(uuid)) ) {
    openJustLoading();
    excluirItem(
      createURL('itens.php'),
      uuid,
      quem_esta_acessando,
      ()=>{
        let elementToRemove = document.getElementById(uuid);
        if (elementToRemove) {
          elementToRemove.remove();
        }

        document.getElementById('modal_item_uuid').value = '';
        document.getElementById('modal_item_quem_esta_acessando').value = '';
        esconder_elemento('modal_item');

        obterItensLista((lista_itens_tags)=>{
          renderTituloPesoMaximo(lista_itens_tags,()=>{
            closeLoading();
            renderToast('Item excluído com sucesso!');
          });
        });
      },
      (erro)=>{
        closeLoading();
        console.error(erro);
        renderErrorToast('Ocorreu um erro ao excluir o item!');
      },
    );
  } else {
    renderErrorToast('Ocorreu um erro ao excluir o item!');
  }
}

function renderModalExcluir(pagina,uuid,mensagem) {
  document.getElementById('modal_pagina').value = pagina;
  document.getElementById('modal_uuid').value = uuid;
  document.getElementById('modal_mensagem').value = mensagem;
  mostrar_elemento('modal');
}

function campanhas_excluir_botao(event) {
  event.preventDefault();
  let uuid = document.getElementById('campanhas_editar_uuid').value;
  renderModalExcluir('campanhas.php',uuid,'Campanha excluída com sucesso!');
}

function personagens_excluir_botao(event) {
  event.preventDefault();
  let uuid = document.getElementById('personagens_editar_uuid').value;
  renderModalExcluir('personagens.php',uuid,'Personagem excluído com sucesso!');
}

function definirListeners() {
  /* Modal */
  document.getElementById('modal_fechar').addEventListener('click',modal_fechar);
  document.getElementById('modal_cancelar').addEventListener('click',modal_fechar);
  document.getElementById('modal_excluir').addEventListener('click',modal_excluir);

  /* Modal Item */
  document.getElementById('modal_item_fechar').addEventListener('click',modal_item_fechar);
  document.getElementById('modal_item_cancelar').addEventListener('click',modal_item_fechar);
  document.getElementById('modal_item_excluir').addEventListener('click',modal_item_excluir);

  /* Tela */
  document.getElementById('texto-botao-mostrar').addEventListener('click',texto_botao_mostrar_listener);
  document.getElementById('texto-botao-esconder').addEventListener('click',texto_botao_esconder_listener);
  document.getElementById('header-botao-voltar').addEventListener('click',header_botao_voltar_listener);
  document.getElementById('campanhas_nova_cancelar').addEventListener('click',campanhas_nova_cancelar_listener);
  document.getElementById('campanhas_nova_salvar').addEventListener('click',campanhas_nova_salvar_listener);
  document.getElementById('campanhas_nova_abrir').addEventListener('click',campanhas_nova_abrir_listener);

  /* Campanhas */
  document.getElementById('campanhas_editar_atualizar').addEventListener('click',atualizar_pagina_atual);
  document.getElementById('campanhas_editar_salvar').addEventListener('click',campanhas_editar_salvar);
  document.getElementById('campanhas_editar_url_narrador_botao').addEventListener('click',campanhas_editar_botao_narrador);
  document.getElementById('campanhas_editar_url_jogador_botao').addEventListener('click',campanhas_editar_botao_jogador);
  document.getElementById('campanhas_editar_url_visualizador_botao').addEventListener('click',campanhas_editar_botao_visualizador);
  document.getElementById('personagens_listar_inserir').addEventListener('click',personagens_novo_abrir_listener);
  document.getElementById('personagens_novo_cancelar').addEventListener('click',personagens_novo_cancelar_listener);
  document.getElementById('personagens_novo_salvar').addEventListener('click',personagens_novo_salvar_listener);
  document.getElementById('campanhas_excluir_botao').addEventListener('click',campanhas_excluir_botao);

  /* Personagens */
  document.getElementById('personagens_editar_atualizar').addEventListener('click',atualizar_pagina_atual);
  document.getElementById('personagens_editar_salvar').addEventListener('click',personagens_editar_salvar);
  document.getElementById('personagens_editar_peso_maximo').addEventListener('keyup', template_com_virgula);
  document.getElementById('personagens_editar_url_narrador_botao').addEventListener('click',personagens_editar_url_narrador_botao);
  document.getElementById('personagens_editar_url_jogador_botao').addEventListener('click',personagens_editar_url_jogador_botao);
  document.getElementById('personagens_editar_url_visualizador_botao').addEventListener('click',personagens_editar_url_visualizador_botao);
  document.getElementById('personagens_editar_enviar_moedas_button').addEventListener('click',personagens_editar_enviar_moedas_button);
  document.getElementById('personagens_editar_alterar_campanhas_button').addEventListener('click',personagens_editar_alterar_campanhas_button);
  document.getElementById('personagens_excluir_botao').addEventListener('click',personagens_excluir_botao);
}

/******************************************************************************/
/******************************     ROUTER      *******************************/
/******************************************************************************/

function obterUrl() {
  let href = window.location.href;
  let url_pagina = new URLSearchParams(window.location.search);

  let url = url_pagina.get('url');
  let possui_url = false;
  if (uuidEhValido(url)) {
    possui_url = true;
  }

  let admin = url_pagina.get('admin');
  let eh_admin = false;
  if (uuidEhValido(admin)) {
    eh_admin = true;
  } else {
    admin = '';
  }

  return {
    url: url,
    possui_url: possui_url,
    eh_narrador_campanha:false,
    eh_jogador_campanha:false,
    eh_visualizador_campanha:true,
    eh_narrador_personagem:false,
    eh_jogador_personagem:false,
    eh_visualizador_personagem:false,
    admin: admin,
    eh_admin: eh_admin,
  };
}

function mostrar_shimmer() {
  document.querySelector('div.shimmer-menor').style.display = 'block';
  document.querySelector('div.shimmer-maior').style.display = 'block';
}

function esconder_shimmer() {
  document.querySelector('div.shimmer-menor').style.display = 'none';
  document.querySelector('div.shimmer-maior').style.display = 'none';
}

function esconder_todos() {
  esconder_elemento('inventario-erro');
  esconder_elemento('header-botao-voltar');

  esconder_elemento('campanhas_editar');
  esconder_elemento('campanhas_editar_form');
  esconder_elemento('personagens_listar_titulo');
  esconder_elemento('personagens_listar');

  esconder_elemento('campanhas_titulo');
  esconder_elemento('campanhas_nova');
  esconder_elemento('campanhas_listar');

  esconder_elemento('campanhas_excluir');
  esconder_elemento('campanhas_excluir_form');

  esconder_elemento('personagens_editar');
  esconder_elemento('personagens_editar_salvar');
  esconder_elemento('personagens_editar_form');
  esconder_elemento('personagens_editar_permissao');
  esconder_elemento('personagens_novo');

  esconder_elemento('personagens_editar_enviar_moedas');
  esconder_elemento('personagens_editar_form_enviar_moedas');

  esconder_elemento('personagens_editar_alterar_campanhas');
  esconder_elemento('personagens_editar_form_alterar_campanhas');

  esconder_elemento('personagens_excluir');
  esconder_elemento('personagens_excluir_form');

  esconder_elemento('itens_listar');
  esconder_elemento('itens_listar_lista');

  esconder_elemento('modal');
  esconder_elemento('modal_item');
}

function router(rota,mensagem) {
  esconder_todos();

  if (rota === 'erro') {
    mostrar_elemento('inventario-erro');
    if (stringEhValida(mensagem)) {
      document.querySelector('#inventario-erro > label').innerHTML = mensagem;
    } else {
      document.querySelector('#inventario-erro > label').innerHTML = 'Sorry, o site rolou um erro crítico :(';
    }
  } else if (rota === 'campanhas_editar') {
    mostrar_elemento('campanhas_editar');
    mostrar_elemento('campanhas_editar_form');
    mostrar_elemento('personagens_listar_titulo');
    mostrar_elemento('personagens_listar');
  } else if (rota === 'campanhas_listar') {
    mostrar_elemento('campanhas_titulo');
    mostrar_elemento('campanhas_listar');
  } else if (rota === 'personagens_editar') {
    mostrar_elemento('personagens_editar');
    mostrar_elemento('personagens_editar_form');
    mostrar_elemento('itens_listar');
    mostrar_elemento('itens_listar_lista');
  }

  esconder_shimmer();
}

/******************************************************************************/
/******************************     INICIAR     *******************************/
/******************************************************************************/

function obterUrlRouter(callback) {
  let pagina = obterUrl();

  if (pagina.possui_url) {
    obter_com_parametro(
      createURL('router.php'),
      'url',
      pagina.url,
      (json)=>{
        callback(true,json);
      },
      (erro)=>{
        console.error(erro);
        router('erro','Sorry, mas seu registro não foi encontrado :(');
        callback(false,pagina);
      },
    );
  } else {
    callback(true,pagina);
  }
}

function listarCampanhasSistemas(json) {
  listar(
    createURL('sistemas.php'),
    (sistemas)=>{
      /* Listar campanhas */
      router('campanhas_listar');
      renderCampanhas(json,sistemas,()=>{
        closeLoading();
      });
      /* Listar campanhas */
    },
    (erro)=>{
      router('campanhas_listar');
      console.error(erro);
      closeLoading();
      renderErrorToast('Ocorreu um erro ao obter os dados!');
    },
  );
}

function listarCampanhas(pagina) {
  if (pagina.eh_admin) {
    // Listar com parâmetros
    obter_com_parametro(
      createURL('campanhas.php'),
      'admin',
      pagina.admin,
      (json)=>{
        listarCampanhasSistemas(json);
      },
      (erro)=>{
        router('campanhas_listar');
        console.error(erro);
        closeLoading();
        renderErrorToast('Ocorreu um erro ao obter os dados!');
      },
    );
    // Listar com parâmetros
  } else {
    // Listar sem parâmetros
    listar(
      createURL('campanhas.php'),
      (json)=>{
        listarCampanhasSistemas(json);
      },
      (erro)=>{
        router('campanhas_listar');
        console.error(erro);
        closeLoading();
        renderErrorToast('Ocorreu um erro ao obter os dados!');
      },
    );
    // Listar sem parâmetros
  }
}

function editarCampanhas(pagina) {
  obter_com_parametro(
    createURL('campanhas.php'),
    'url',
    pagina.url,
    (json)=>{
      router('campanhas_editar');
      document.getElementById('campanhas_editar_url').value = pagina.url;
      render_campanhas_editar(json,()=>{
        closeLoading();
      });
    },
    (erro)=>{
      router('erro','Sorry, mas sua campanha não foi encontrada :(');
      console.error(erro);
      closeLoading();
      renderErrorToast('Ocorreu um erro ao obter os dados!');
    },
  );
}

function personagensConverterPermissoes(json) {
  json.permissoes = JSON.parse(json.permissoes);
  json.permissoes.controlar_peso = itsTrue(json.permissoes.controlar_peso);
  json.permissoes.permitir_incluir_item = itsTrue(json.permissoes.permitir_incluir_item);
  json.permissoes.permitir_alterar_item = itsTrue(json.permissoes.permitir_alterar_item);
  json.permissoes.permitir_alterar_quantidade_item = itsTrue(json.permissoes.permitir_alterar_quantidade_item);
  json.permissoes.permitir_excluir_item = itsTrue(json.permissoes.permitir_excluir_item);
  json.permissoes.permitir_entregar_item = itsTrue(json.permissoes.permitir_entregar_item);
  json.permissoes.permitir_alterar_moedas = itsTrue(json.permissoes.permitir_alterar_moedas);
  json.permissoes.permitir_entregar_moedas = itsTrue(json.permissoes.permitir_entregar_moedas);
}

function editarPersonagens(pagina) {
  obter_com_parametro(
    createURL('personagens.php'),
    'url',
    pagina.url,
    (json)=>{
      router('personagens_editar');
      document.getElementById('personagens_editar_url').value = pagina.url;

      /* Permissões */
      personagensConverterPermissoes(json);

      render_personagens_editar(json,()=>{
        closeLoading();
      });
    },
    (erro)=>{
      router('erro','Sorry, mas seu personagem não foi encontrado :(');
      console.error(erro);
      closeLoading();
      renderErrorToast('Ocorreu um erro ao obter os dados!');
    },
  );
}

/* AUTOCOMPLETE */
function autocomplete_regra_comparacao(item,digitado) {
  //return poco.substr(0, digitado.length).toUpperCase() == digitado.toUpperCase();
  return item.toUpperCase().includes(digitado.toUpperCase());
}

function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

function autocomplete_bold_text(item,digitado,callback) {

  let inicio = 0;
  let index = item.toLowerCase().indexOf(digitado.toLowerCase());
  let retorno = '';

  if (index > -1) {
    inicio = index;

    if (inicio == 0) {
      retorno += "<strong>" + item.substr(0, digitado.length) + "</strong>" + item.substr(digitado.length);
    } else {
      retorno += item.substr(0, inicio);
      retorno += "<strong>" + item.substr(inicio, digitado.length) + "</strong>";
      retorno += item.substr(inicio + digitado.length);
    }

    callback(retorno);
  } else {
    callback(item);
  }
}

function autocomplete(inp, arr, autocomplete_itens_detalhes, campos_autocomplete) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (autocomplete_regra_comparacao(arr[i],val)) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          // b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          // b.innerHTML += arr[i].substr(val.length);
          autocomplete_bold_text(arr[i],val,(retorno)=>{

            b.innerHTML = retorno;

            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
                selecionaItem(autocomplete_itens_detalhes,campos_autocomplete);
            });
            a.appendChild(b);

          });
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });

  function selecionaItem(autocomplete_itens_detalhes,campos_autocomplete) {
    if (inp.id === campos_autocomplete.descricao) {
      let identifier = document.getElementById(campos_autocomplete.descricao).value;
      if ((identifier != undefined) && (identifier != null) && (identifier in autocomplete_itens_detalhes)) {
        document.getElementById(campos_autocomplete.detalhes).value = autocomplete_itens_detalhes[identifier].detalhes;
        document.getElementById(campos_autocomplete.quantidade).value = 1;
        document.getElementById(campos_autocomplete.peso_unitario).value = autocomplete_itens_detalhes[identifier].peso_unitario;
        let select = document.getElementById(campos_autocomplete.uuid_medida_peso_unitario);
        let index_select = [...select.options].findIndex(option => option.value === autocomplete_itens_detalhes[identifier].uuid_medida_peso_unitario);
        if (index_select > -1) {
          select.selectedIndex = index_select;
        }
      }
    }
  }

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

function render_item_autocomplete(campos_autocomplete,tag_input,itens_base,callback) {
  let length = itens_base.length;
  tag_input.value = '';
  autocomplete_itens = [];
  autocomplete_itens_detalhes = {};

  itens_base.forEach((entry,index) => {
    let item_da_vez = entry.descricao;
    autocomplete_itens.push(item_da_vez);
    autocomplete_itens_detalhes[item_da_vez] = entry;
    autocomplete_itens_detalhes[item_da_vez].id = entry.id;
    autocomplete_itens_detalhes[item_da_vez].descricao = entry.descricao;
    autocomplete_itens_detalhes[item_da_vez].detalhes = entry.detalhes;
    autocomplete_itens_detalhes[item_da_vez].peso_unitario = entry.peso_unitario;
    autocomplete_itens_detalhes[item_da_vez].uuid_medida_peso_unitario = entry.uuid_medida_peso_unitario;
    autocomplete_itens_detalhes[item_da_vez].uuid_sistema = entry.uuid_sistema;

    if ((length - 1) == index) {      
      autocomplete(tag_input, autocomplete_itens, autocomplete_itens_detalhes, campos_autocomplete);
      callback();
    }
  });
}
/* AUTOCOMPLETE */

function iniciar() {
  console.log(`Versão ${VERSION}`);
  openLoading();
  definirListeners();

  obterUrlRouter((valido,pagina)=>{
    /* Router */

    if (valido) {
      if (!pagina.possui_url) {
        listarCampanhas(pagina);
      } else if (pagina.eh_narrador_campanha || pagina.eh_jogador_campanha || pagina.eh_visualizador_campanha) {
        editarCampanhas(pagina);
      } else if (pagina.eh_narrador_personagem || pagina.eh_jogador_personagem || pagina.eh_visualizador_personagem) {
        editarPersonagens(pagina);
      }

      verificar_mensagem();
    } else {
      closeLoading();
    }

    /* Router */
  });
}

iniciar();
