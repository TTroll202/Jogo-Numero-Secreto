/*let titulo = document.querySelector('h1')titulo.innerHTML = 'Jogo do número Secreto';-------------let paragrafo = document.querySelector('p')paragrafo.innerHTML = 'Escolha um número entre 1 e 10';*/
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarUmNumeroAleatorio();
let tentativas = 1;
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial()
//Logica de Chute, Acerto e Erro//
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        limparCampo();
        document.getElementById('reiniciar').removeAttribute('disabled');

    }
    else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número é menor que ${chute}`);
        }
        else {
            exibirTextoNaTela('p', `O número é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
    console.log(numeroSecreto);
}
function gerarUmNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite)
    { listaDeNumerosSorteados = [];}
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarUmNumeroAleatorio(); 
    }
     else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarUmNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
