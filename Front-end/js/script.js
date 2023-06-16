function validaCPF(){
    const cpfFormatado = document.getElementById('cpf').value;

    const cpf = limpaFormatacao(cpfFormatado)

    if(cpf.length !== 11){
        mostraResultado('O CPF deve ter exatamente 11 caracteres', 'red');
        return
    }
    if(verificaDigitosRepetidos(cpf)){
        mostraResultado('CPF não pode conter digitos repetidos', 'red');
        return;
    }

    const digito1 = calcularDigitoVerificador(cpf, 1);

    if(!digito1){
        mostraResultado(`CPF Inválido - ${cpfFormatado}`, 'red')
    }

    const digito2 = calcularDigitoVerificador(cpf, 2);  

    if(!digito2){
        mostraResultado(`CPF Inválido - ${cpfFormatado}`, 'red')
    }

    mostraResultado(`CPF Válido - ${cpfFormatado}`, 'green', cpfFormatado)
}



function calcularDigitoVerificador(cpf, posicao){
    const sequencia = cpf.slice(0, 8 + posicao).split('');

    let soma = 0;

    let multiplicador = 9 + posicao;

    for(const numero of sequencia){
        soma += multiplicador * Number(numero);
        multiplicador--
    }

    const restoDivisao = (soma * 10)%11;
    const digito = cpf.slice(8+posicao, 9+posicao);

    return restoDivisao == digito;

}

function limpaFormatacao(cpf){
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
    deleteButton.addEventListener('click', function() {
      excluirCPF(cpf);
    });
    deleteButton.classList.add('delete-button'); // Adiciona a classe 'delete-button'
    cpfElement.appendChild(deleteButton);
    cpfList.appendChild(cpfElement);
}
}

function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function verificaDigitosRepetidos(cpf){
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