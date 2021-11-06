function submit() {
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value.split("-");
  const dia = date[2];
  const mes = date[1];
  const ano = date[0];
  const city = document.getElementById('city').value;
  
  if (dia < 1 || dia > 31) {
    toastr["error"]("Erro: Data inválida")
  } else if (name === '' || city === '' || date.length <= 1) {
    toastr["error"]("Campo nome e cidade não preenchidos!");
  } else {
    document.getElementById("campoNome").innerHTML = `Nome: ${name}`;
    document.getElementById("campoData").innerHTML = `Data de nascimento: ${dia}/${mes}/${ano}`;
    document.getElementById("campoCidade").innerHTML = `Cidade: ${city}`;

    document.getElementById("name").value = '';
    document.getElementById("date").value = '';
    document.getElementById("city").value = '';
    $("#login-modal").modal('focus');
  }
}
