function submit() {
  console.log('entrei');
  /* const aux = document.getElementById('login-modal');
  const aux1 = document.getElementsByClassName('modal');
  aux.addEventListener('shown.bs.modal', function() {
    console.log('opa')
    aux1.focus()
  }) */
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value.split("-");
  console.log('date :', date);
  const dia = date[2];
  const mes = date[1];
  const ano = date[0];
  const city = document.getElementById('city').value;

  /* const aux = document.getElementById('aModal');
  aux = attribute('rel', 'modal:open') */
  /* $('#aModal').modal('backdrop') */
  if (dia < 1 || dia > 31) {
    toastr["error"]("Erro: Data inválida")
  } else {
      console.log('oi')
      $("#login-modal").modal('focus');
  }
}
