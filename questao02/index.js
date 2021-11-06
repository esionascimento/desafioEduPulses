function submit() {
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value.split("-");
  console.log('date :', date);
  const dia = date[2];
  const mes = date[1];
  const ano = date[0];
  const city = document.getElementById('city').value;
  console.log('name :', name);
  console.log('dia :', dia);
  console.log('mes :', mes);
  console.log('ano :', ano);
  console.log('city :', city);
  
  if (dia < 1 || dia > 31) {
    toastr["error"]("Erro: Data inválida")
  } else if (name === '' || city === '' || date.length <= 1) {
    toastr["error"]("Campo nome e cidade não preenchidos!");
  } else {
    $("#login-modal").modal('focus');
  }
}
