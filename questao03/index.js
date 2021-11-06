import "isomorphic-fetch"
import * as readline from 'node:readline';

const arrayProduto = [];
const categories = [];
const arrayPessoa = [];
const estruturaUsuario = []; //Array final dados dos usuários
let countA = 1; //CountA vai saber a hora de parar === CountB
let countB = 4; // CountB limitar o array, pela quantidade de usuários. Ex. 50 usuarios;

async function requeste(url) {
  let response = await fetch(url);
  let userData = await response.json();
  return userData;
}

function ordenar() {
  for (let i = 0; i < estruturaUsuario.length; i++) {
    for (let j = estruturaUsuario.length - 1; j > i; j--) {
      if (estruturaUsuario[i].preco > estruturaUsuario[j].preco) {
        const aux = estruturaUsuario[i];
        estruturaUsuario[i] = estruturaUsuario[j];
        estruturaUsuario[j] = aux;
      };
    }
  }
}

async function getAleatorio() {
  const tamCategories = categories.length;
  const position = Math.floor(Math.random() * (tamCategories - 0) + 0);
  const data = categories[position];
  const aux = await requeste(`https://api.mercadolibre.com/sites/MLB/search?q=${data.name}`).then((userData) => {
    const auxArrayUsuarios = [];
    auxArrayUsuarios.push(userData.results);
    const newq = auxArrayUsuarios[0];
    newq.map((aux) => {
      arrayProduto.push(aux);
    });
    const nome = '';
    const idade = 1010;
    const cidade = '';
    const preco = newq[0].price;
    const titulo = newq[0].title;
    const id = newq[0].prices.id;
    estruturaUsuario.push({ nome, idade, cidade, id, titulo, preco });
  });
  for (let i = countA; i < countB; i++) {
    countA++;
    getAleatorio();
  }
  if (countA === countB) {
    ordenar();
  }
}

async function getCategories() {
  const aux = await requeste(`https://api.mercadolibre.com/sites/MLB/categories`).then((userData) => {
    userData.map((aux) => {
      categories.push(aux);
    });
    getAleatorio();
    resquestPessoa();
  });
}

async function resquestPessoa() {
  const apiResponse = await requeste(`https://geradorbrasileiro.com/api/faker/pessoa?limit=${countB}`).then((dataPessoa) => {
    const auxSalvePessoa = dataPessoa.values;
    console.log('dataPessoa.values :', dataPessoa.values);
    dataPessoa.map((data) => {
      arrayPessoa.push(data)
    })
  });
}


function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log('1 - Carregar')
  console.log('2 - Listar');
  
  rl.question('Opcao: ', (value) => {
      let op = 0;
      op = value;
      switch(value) {
        case '1': console.log('Carregando...');
        getCategories();
          break;
        case '2':console.log('Listando...')
          break;
        case '3': console.log('Ordenar...');
                  ordenar();
          break;
        default:
          break;
      }
      rl.close();
    });
}
main();
