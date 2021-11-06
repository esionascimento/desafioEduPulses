import "isomorphic-fetch"
import * as readline from 'node:readline';

const arrayUsuarios = [];
const categories = [];
const estruturaUsuario = [];
let countA = 1;
let countB = 5;

async function request(url) {
  let response = await fetch(url);
  let userData = await response.json();

  return userData;
}

async function getAleatorio() {
  const tamCategories = categories.length;
  const position = Math.floor(Math.random() * (tamCategories - 0) + 0);
  const data = categories[position];
  const aux = await request(`https://api.mercadolibre.com/sites/MLB/search?q=${data.name}`).then((userData) => {
    const auxArrayUsuarios = [];
    auxArrayUsuarios.push(userData.results);
    const newq = auxArrayUsuarios[0];
    newq.map((aux) => {
      arrayUsuarios.push(aux);
    });
    const nome = '';
    const idade = 1010;
    const cidade = '';
    const preco = newq[0].price;
    const titulo = newq[0].title;
    const id = newq[0].prices.id;
    estruturaUsuario.push({ nome, idade, cidade, id, titulo, preco });
    console.log('estruturaUsuario :', estruturaUsuario);
  });
  for (let i = countA; i < countB; i++) {
    countA++;
    getAleatorio();
  }
}

async function getCategories() {
  
    const aux = await request(`https://api.mercadolibre.com/sites/MLB/categories`).then((userData) => {
    userData.map((aux) => {
      categories.push(aux);
    });
    getAleatorio();
  });
}

async function resquestApi() {
  const apiResponse = await getCategories();
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
                  resquestApi();
          break;
        case '2':console.log('Listando...')
          break;
        default:
          break;
      }
      rl.close();
    });

}
main();
