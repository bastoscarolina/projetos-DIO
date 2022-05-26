const personagem = document.querySelector(".personagem"); //API são comandos disponibilizados pelo browser para selecionar e manipular elementos na tela
const background = document.querySelector(".background");
let isJumping = false;
let position = 0; //position saiu da função personagem e veio pra fora pra poder ser acessada por todo o código. Dentro da função só poderia ser acessada pela função

// esse querySelector pegou o elemento dino e colocou na variável
// pro personagem pular, é preciso interceptar o pressionamento de teclas. Nesse caso a tecla seria o espaço
function handleKeyUp(event){ //esse event é enviado para a função toda vez que alguém pressiona uma tecla pelo navegador
    if(event.keyCode === 32) { //cada tecla tem um código, 32 é o código da tecla espaço
        if (!isJumping){
           jump();
        }
    }
}
function jump(){
    
    isJumping = true;

    let upInterval = setInterval (() => {
        if(position >=150){
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if  (position <=0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else {  
                    position -= 20;

                    personagem.style.bottom = position + "px";
                }
            },20); //se alterar esse 20 o personagem sobe ou desce mais rápido
        } else {
            position += 20;

            personagem.style.bottom = position + "px";
        }
    }, 20); //vai criar uma repetição. A função setInterval serve pra definir intervalos. Tudo que tiver dentro desse bloco vai ser executado sem parar no intervalo definido (no caso 20ms)

}

function createCoqueiro(){
    const coqueiro = document.createElement('div');
    let coqueiroPosition = 1000;
    let randomTime = Math.random() * 6000; // aleatoriedade que o novo coqueiro será criado

    coqueiro.classList.add('coqueiro'); // você pode criar a classe tanto no HTML quanto por esse comando
    coqueiro.style.left = 1000 + 'px';
    background.appendChild(coqueiro); //o método append child adiciona um filho

    let leftInterval = setInterval(() => {
        
        if (coqueiroPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(coqueiro); //esse comando remove o filho
        } else if (coqueiroPosition > 0 && coqueiroPosition < 60 && position < 60) { // entre 0 e 60 é o personagem. Se eles se encontrarem acaba o jogo
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo!</h1>';
        } else {
            coqueiroPosition -=10; //velocidade que ele se move para a esquerda, se colocar um número maior se move mais rápido. 
            coqueiro.style.left = coqueiroPosition + 'px';
        }
    },20)

    setTimeout(createCoqueiro, randomTime)
}
createCoqueiro(); //imediatamente após o jogo começar já crie um coqueiro
document.addEventListener('keyup', handleKeyUp );//esse evento de keyup é: quando você pressiona a tecla, ele gera um evento de keydown mas quando você solta a tecla ele gera um evento de keyup
// tudo o que você faz no navegador, tipo um pressionamento de teclas, ele gera eventos