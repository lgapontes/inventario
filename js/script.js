/* version */
const VERSION = '1.0.2';
let versao_texto = `Versão ${VERSION}`;

/* Testes unitários */
const UNIT_TESTS = false;
const QTDE_TESTS = 1000;

/* debug */
const DEBUG = false;
function debug(texto) {
  if (DEBUG) {
    console.log(texto);
  }
}

function error(texto) {
  console.error(texto);
}

function warning(texto) {
  console.warn(texto);
}

var forcar_classe = {
  primeira: 'Todas',
  segunda: 'Nenhuma',
  terceira: 'Nenhuma',
  multiclasse: false,

  tem_multiclasse_sugerida: false,
  multiclasse_sugerida: '',
};
var forcar_raca = 'Todas';
var forcar_havenloft = false;
var forcar_darksun = false;

var ARMAS_MAIS_FORTES_GLOBAL = [];
