import "isomorphic-fetch"
import * as readline from 'node:readline';

const arrayProduto = [];
const categories = [];
const arrayPessoa = [];
const estruturaUsuario = []; //Array final dados dos usuários
let countA = 1; //CountA vai saber a hora de parar === CountB
let countB = 50; // CountB limitar o array, pela quantidade de usuários. Ex. 50 usuarios;

async function requeste(url) {
  let response = await fetch(url);
  let userData = await response.json();
  return userData;
};

function ordenar() {
  if (estruturaUsuario.length > 1) {
    for (let i = 0; i < estruturaUsuario.length; i++) {
      for (let j = estruturaUsuario.length - 1; j > i; j--) {
        if (estruturaUsuario[i].preco > estruturaUsuario[j].preco) {
          const aux = estruturaUsuario[i];
          estruturaUsuario[i] = estruturaUsuario[j];
          estruturaUsuario[j] = aux;
        };
      }
    }
    console.log('Ordenado com sucesso.');
    console.log('Tecle enter para continuar');
  } else {
    console.log('Array vazio ou com uma posicao.')
  }
};

async function getAleatorio() {
  const tamCategories = categories.length;
  const position = Math.floor(Math.random() * (tamCategories - 0) + 0);
  const data = categories[position];
  await requeste(`https://api.mercadolibre.com/sites/MLB/search?q=${data.name}`).then((userData) => {
    const auxArrayUsuarios = [];
    auxArrayUsuarios.push(userData.results);
    const newq = auxArrayUsuarios[0];
    const nome = arrayPessoa[countA - 1].nome;
    const idade = arrayPessoa[countA - 1].dataNascimento;
    const cidade = arrayPessoa[countA - 1].cidade;
    const preco = newq[0].price;
    const titulo = newq[0].title;
    const id = newq[0].prices.id;
    estruturaUsuario.push({ nome, idade, cidade, id, titulo, preco });
  });
  for (let i = countA; i < countB; i++) {
    countA++;
    getAleatorio();
  }
  if (countB === estruturaUsuario.length) {
    console.log('Tecle enter para continuar');
  }
};

async function getCategories() {
  const aux = await requeste(`https://api.mercadolibre.com/sites/MLB/categories`).then((userData) => {
    userData.map((aux) => {
      categories.push(aux);
    });
    getAleatorio();
  });
};

async function resquestPessoa() {
  const apiResponse = await requeste(`https://geradorbrasileiro.com/api/faker/pessoa?limit=${countB}`).then((dataPessoa) => {
    const auxSalvePessoa = dataPessoa.values;
    auxSalvePessoa.map((data) => {
      const nome = data.nome;
      const dataNascimento = data.dataNascimento;
      const cidade = data.endereco.cidade;
      arrayPessoa.push({ nome, dataNascimento, cidade })
    })
  });
};

function getAll() {
  console.log('Estrutura: ', estruturaUsuario);
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  function oi() {
    rl.question("=======================\n"
        + "1) Carrega array de usuarios\n"
        + "2) Listar array\n"
        + "3) Ordenar\n"
        + "4) Exit\n"
        + "Selecione uma opcao: "
        , function (value) {

      switch (value) {
        case '1': console.log('Carregando...');
          resquestPessoa();
          getCategories();
          break;
        case '2': console.log('Listando...');
                  getAll();
          break;
        case '3': console.log('Ordenar...');
                  ordenar();
          break;
        case '4': console.log('Saindo...');
                  rl.close();
            break;
        default: console.log("Operação invalida... ");
          break;
      }
      oi();
    });
  }
  oi();
}
main();
