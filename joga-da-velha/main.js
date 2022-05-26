let jogador = {nome:"Yoda", icon: '<img src="https://img.icons8.com/dotty/80/000000/baby-yoda--v2.png"/>'}

//<img src="https://img.icons8.com/wired/64/000000/darth-vader.png"/>
//<img src="https://img.icons8.com/dotty/80/000000/baby-yoda--v2.png"/>

let jogadorDaVez= document.getElementById('jogador-da-vez')

let vencedor = document.getElementById('vencedor-da-rodada')

let quadrados = document.querySelectorAll('.quadrado')


function escolherQuadrado(id){
    if(vencedor.innerHTML !== ""){
        return
    }
    const quadrado = document.getElementById(id)
    
    if(quadrado.innerHTML !== ""){
        return
    }
    quadrado.innerHTML = jogador.icon;
    quadrado.classList.add(jogador.nome)
    
    checarVencedor();

    if(jogador.nome == 'Yoda'){
        jogador.nome = 'Vader';
        jogador.icon='<img src="https://img.icons8.com/wired/64/000000/darth-vader.png"/>'
    } else{
        jogador.nome = 'Yoda';
        jogador.icon ='<img src="https://img.icons8.com/dotty/80/000000/baby-yoda--v2.png"/>'
    }

    mudarJogador(jogador)
    
}

function mudarJogador(jogador){
    jogadorDaVez.innerHTML=jogador.nome;
}

function checarVencedor(){
        
    for(let i = 0;i<quadrados.length;i++){
        if(quadrados[i]!==""){
            verificaResultado(quadrados)
        }
    }    
    
}

function mudaCorQuadrado(quadrados, jogador){

    for(let i =0;i<quadrados.length;i++){
        if(quadrados[i].classList.contains(jogador.nome)){
            if(jogador.nome=='Yoda'){
                quadrados[i].style.backgroundColor='#17a8eb';
                mudarVencedor(jogador)
            } else{
                quadrados[i].style.backgroundColor='#b40e0e';
                mudarVencedor(jogador)
            }
        }
    }
        
}

function mudarVencedor(jogador){
    vencedor.innerHTML=jogador.nome
}

function verificaResultado(quadrados){
    const verificador = COMBINACOES.some((comb => {
        return comb.every((index) => {
            return quadrados[index].classList.contains(jogador.nome)
        })
    }))
    if(verificador){
        mudaCorQuadrado(quadrados, jogador)
    }
    
}
const COMBINACOES = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
]

function reiniciar(){
    vencedor.innerHTML=null;
    jogadorDaVez.innerHTML=null;

    for(let i =0; i<quadrados.length;i++){
        quadrados[i].innerHTML=""
        quadrados[i].style.backgroundColor='#8feb17c9'
        quadrados[i].classList.remove('Yoda','Vader')      
    }
}