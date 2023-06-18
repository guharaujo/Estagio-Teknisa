$(document).ready(function () {
  $("#cpf").inputmask("999.999.999-99");
});

function validaCPF() {
  const cpfFormatado = document.getElementById('cpf').value;

  const cpf = limpaFormatacao(cpfFormatado);

  
  if (verificaDigitosRepetidos(cpf)) {
    mostraResultado('CPF não pode conter digitos repetidos', 'red');
    return;
  }

  const digito1 = formulaCpf(cpf);

  if (!digito1) {
    mostraResultado(`CPF Inválido - ${cpfFormatado}`, 'red');
    return;
  }

  const digito2 = formulaCpf(cpf);

  if (!digito2) {
    mostraResultado(`CPF Inválido - ${cpfFormatado}`, 'red');
    return;
  }

  mostraResultado(`CPF Válido - ${cpfFormatado}`, 'green', cpfFormatado)
}

function formulaCpf(cpf) {
  let Soma = 0;
  let Resto;

  for (let i = 1; i <= 9; i++) {
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
  }

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(cpf.substring(9, 10))) return false;
  Soma = 0;

  for (i = 1; i <= 10; i++) {
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
  }

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function limpaFormatacao(cpf) {
  cpf = cpf.replace(/\D/g, '');

  return cpf;
}

function mostraResultado(texto, cor, cpf) {
  const span = document.getElementById('resultado');

  span.innerHTML = texto;
  span.style.color = cor;

  if (cor === 'green') {
    const cpfList = document.getElementById('cpfList');
    const cpfElement = document.createElement('li');
    cpfElement.textContent = formatarCPF(cpf) + " - CPF Válido";
    cpfElement.classList.add('cpf-item');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener('click', function () {
      excluirCPF(cpf);
    });
    deleteButton.classList.add('delete-button');
    cpfElement.appendChild(deleteButton);
    cpfList.appendChild(cpfElement);
  }
}

function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function verificaDigitosRepetidos(cpf) {
  return cpf.split('').every((d) => d === cpf[0]);
}

function excluirCPF(cpf) {
  const cpfList = document.getElementById('cpfList');
  const cpfElements = cpfList.getElementsByTagName('li');

  for (let i = 0; i < cpfElements.length; i++) {
    const cpfElement = cpfElements[i];
    if (cpfElement.textContent.includes(cpf)) {
      cpfElement.remove();
      break;
    }
  }
}