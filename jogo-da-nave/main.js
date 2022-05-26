function start() {
  let botaoComeco = document.querySelector("#botao-comecar");
  if(botaoComeco){
      botaoComeco.parentNode.removeChild(botaoComeco);
  }
  let fundo = document.querySelector("#fundoGame");

  let jogador = document.createElement("div");
  jogador.setAttribute("id", "jogador");
  jogador.setAttribute("class", "animacao");

  function createInimigo1() {
    let inimigo1 = document.createElement("div");
    inimigo1.setAttribute("id", "inimigo1");
    fundo.appendChild(inimigo1);
    return inimigo1;
  }
  let inimigo1 = createInimigo1();

  function createInimigo2() {
    let inimigo2 = document.createElement("div");
    inimigo2.setAttribute("id", "inimigo2");
    fundo.appendChild(inimigo2);
    return inimigo2;
  }
  let inimigo2 = createInimigo2();

  let amigo = document.createElement("div");
  amigo.setAttribute("id", "amigo");

  fundo.appendChild(jogador);
  fundo.appendChild(amigo);

  let velocidade = 5;
  let posicaoY = parseInt(Math.floor(Math.random() * 300)) + 80;
  let inimigosAcertados = 0;
  let amigosSalvos = 0;

  let podeAtirar = true;

  let TECLA = {
    W: 87,
    S: 83,
    D: 68,
  };
  let jogo = {};

  jogo.pressionou = [];

  document.onkeydown = function (e) {
    jogo.pressionou[e.which] = true;
  };
  document.onkeyup = function (e) {
    jogo.pressionou[e.which] = false;
  };
  jogo.timer = setInterval(loop, 30);

  function loop() {
    moveFundo();
    moveJogador();
    moveInimigo1();
    moveInimigo2();
    moveAmigo();
    interferencia();
    salvaAmigo();
  }

  function moveFundo() {
    let container = document.querySelector("#container");
    let estiloContainer = window.getComputedStyle(container);
    let esquerda = parseInt(
      estiloContainer.getPropertyValue("background-position")
    );

    document
      .querySelector("#container")
      .style.setProperty("background-position", `${esquerda - 1}px`);
  }

  function moveJogador() {
    let topo = parseInt(
      window.getComputedStyle(jogador).getPropertyValue("top")
    );
    if (jogo.pressionou[TECLA.W]) {
      if (topo <= 40) {
        jogador.style.setProperty("top", `${topo + 5}px`);
      } else {
        jogador.style.setProperty("top", `${topo - 5}px`);
      }
    } else if (jogo.pressionou[TECLA.S]) {
      if (topo >= 400) {
        jogador.style.setProperty("top", `${topo - 5}px`);
      } else {
        jogador.style.setProperty("top", `${topo + 5}px`);
      }
    } else if (jogo.pressionou[TECLA.D]) {
      atacar();
    }
  }

  function moveInimigo1() {
    let posicaoX = parseInt(
      window.getComputedStyle(inimigo1).getPropertyValue("left")
    );

    inimigo1.style.setProperty("left", `${posicaoX - velocidade}px`);
    inimigo1.style.setProperty("top", `${posicaoY}px`);

    if (posicaoX <= 200) {
      posicaoY = parseInt(Math.floor(Math.random() * 300)) + 80;

      inimigo1.style.setProperty("top", `${posicaoY}px`);

      inimigo1.style.setProperty("left", `900px`);
    }
  }

  function moveInimigo2() {
    let posicaoX = parseInt(
      window.getComputedStyle(inimigo2).getPropertyValue("left")
    );

    inimigo2.style.setProperty("left", `${posicaoX - velocidade * 0.5}px`);

    if (posicaoX <= 200) {
      inimigo2.style.setProperty("left", `900px`);
    }
  }

  function moveAmigo() {
    let posicaoX = parseInt(
      window.getComputedStyle(amigo).getPropertyValue("left")
    );

    amigo.style.setProperty("left", `${posicaoX + velocidade * 0.25}px`);

    if (posicaoX > 940) {
      amigo.style.setProperty("left", `200px`);
    }
  }

  function atacar() {
    let inimigo1 = document.querySelector("#inimigo1");
    let inimigo2 = document.querySelector("#inimigo2");

    if (podeAtirar) {
      podeAtirar = false;

      let topo = parseInt(
        window.getComputedStyle(jogador).getPropertyValue("top")
      );
      let posicaoJogadorX = parseInt(
        window.getComputedStyle(jogador).getPropertyValue("left")
      );
      let tiroX = posicaoJogadorX + 150;
      let topoTiro = topo + 100;

      criaAtaque(tiroX, topoTiro);
    }

    function criaAtaque(tiroX, topoTiro) {
      let ataque = document.createElement("div");
      ataque.setAttribute("id", "ataque");
      ataque.style.setProperty("left", `${tiroX}px`);
      ataque.style.setProperty("top", `${topoTiro}px`);
      fundo.appendChild(ataque);

      moveAtaque();
    }

    function moveAtaque() {
      let tempoAtaque = setInterval(() => {
        let ataque = document.querySelector("#ataque");
        let posicaoX = parseInt(
          window.getComputedStyle(ataque).getPropertyValue("left")
        );
        if (posicaoX > 900) {
          window.clearInterval(tempoAtaque);
          tempoAtaque = null;
          ataque.remove();
          podeAtirar = true;
        } else if (colisao(ataque) == inimigo1) {
          inimigo1.style.setProperty("left", "900px");
          inimigo1.style.setProperty("top", `${posicaoY}px`);
          window.clearInterval(tempoAtaque);
          tempoAtaque = null;
          ataque.remove();
          podeAtirar = true;
        } else if (colisao(ataque) == inimigo2) {
          inimigo2.style.setProperty("left", "900px");
          window.clearInterval(tempoAtaque);
          tempoAtaque = null;
          ataque.remove();
          podeAtirar = true;
        } else {
          ataque.style.setProperty("left", `${posicaoX + 1}px`);
        }
      }, 10);
    }
    function colisao(ataque) {
      let ataqueTopo = parseInt(
        window.getComputedStyle(ataque).getPropertyValue("top")
      );
      let ataqueX = parseInt(
        window.getComputedStyle(ataque).getPropertyValue("left")
      );

      let inimigo1Topo = parseInt(
        window.getComputedStyle(inimigo1).getPropertyValue("top")
      );

      let inimigo1Fim = inimigo1Topo + 150;

      let inimigo1X = parseInt(
        window.getComputedStyle(inimigo1).getPropertyValue("left")
      );

      let inimigo2Topo = parseInt(
        window.getComputedStyle(inimigo2).getPropertyValue("top")
      );
      let inimigo2Fim = inimigo2Topo + 100;
      let inimigo2X = parseInt(
        window.getComputedStyle(inimigo2).getPropertyValue("left")
      );

      if (ataqueX != 900 && ataqueX + 10 >= inimigo1X) {
        if (ataqueTopo >= inimigo1Topo && ataqueTopo <= inimigo1Fim) {
          inimigosAcertados++;
          return inimigo1;
        } else {
          return false;
        }
      } else if (ataqueX != 900 && ataqueX + 10 >= inimigo2X) {
        if (ataqueTopo >= inimigo2Topo && ataqueTopo <= inimigo2Fim) {
          inimigosAcertados++;
          return inimigo2;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  function interferencia() {
    let jogadorX = parseInt(
      window.getComputedStyle(jogador).getPropertyValue("left")
    );
    let jogadorY = parseInt(
      window.getComputedStyle(jogador).getPropertyValue("top")
    );

    let inimigo1X = parseInt(
      window.getComputedStyle(inimigo1).getPropertyValue("left")
    );
    let inimigo1Y = parseInt(
      window.getComputedStyle(inimigo1).getPropertyValue("top")
    );

    let inimigo2X = parseInt(
      window.getComputedStyle(inimigo2).getPropertyValue("left")
    );
    let inimigo2Y = parseInt(
      window.getComputedStyle(inimigo2).getPropertyValue("top")
    );

    let amigoX = parseInt(
      window.getComputedStyle(amigo).getPropertyValue("left")
    );
    let amigoY = parseInt(
      window.getComputedStyle(amigo).getPropertyValue("top")
    );

    salvaAmigo(amigoX, jogadorX, amigoY, jogadorY);

    if (jogadorX + 100 >= inimigo1X && jogadorX + 100 <= inimigo1 + 100) {
      if ((jogadorY >= inimigo1Y && jogadorY <= inimigo1Y + 150)||(jogadorY +200 >= inimigo1Y && jogadorY +200<= inimigo1Y + 150)) {
        jogador.remove();
        inimigo1.remove();
        window.clearInterval(jogo.timer);
        jogo.timer = null;
        exibePlacar();
      }
    } else if (
      jogadorX + 75 >= inimigo2X &&
      jogadorX + 75 <= inimigo2X + 100
    ) {
      if ((jogadorY >= inimigo2Y && jogadorY <= inimigo2Y + 150)||(jogadorY +200>=inimigo2Y && jogadorY+200<=inimigo2Y+150)) {
          console.log('2')
        jogador.remove();
        inimigo2.remove();
        window.clearInterval(jogo.timer);
        exibePlacar();
      }
    } else if (amigoX + 75 >= inimigo1X && amigoX + 75 <= inimigo1X + 100) {
      if ((amigoY >= inimigo1Y && amigoY <= inimigo1Y + 150)|| (amigoY +115 >= inimigo1Y && amigoY +115<= inimigo1Y + 150)) {
        amigo.remove();
        inimigo1.remove();
        window.clearInterval(jogo.timer);
        exibePlacar();
      }
    } else if (amigoX + 100 >= inimigo2X && amigoX + 100 <= inimigo2X + 100) {
      if ((amigoY >= inimigo2Y && amigoY <= inimigo2Y + 150)||(amigoY+115>=inimigo2Y&& amigoY+115<=inimigo2Y+150)) {
        let posicaoY = parseInt(Math.round(Math.random()*300))+80
        amigo.style.setProperty('top', `${posicaoY}px`)
      }
    }
  }

  function exibePlacar() {
    let placar = document.createElement("div");
    placar.setAttribute("id", "placar");
    fundo.appendChild(placar);
    let salvos = document.createElement("h2");
    salvos.textContent = "Amigos salvos: " + amigosSalvos;
    placar.appendChild(salvos);
    let destruidos = document.createElement("h2");
    destruidos.textContent = "Inimigos acertados: " + inimigosAcertados;
    placar.appendChild(destruidos);

    let jogarNovamente = document.createElement("button");
    jogarNovamente.textContent = 'Jogar Novamente'
    jogarNovamente.style.setProperty('margin', '10px')
    jogarNovamente.style.setProperty('cursor', 'pointer')
    placar.appendChild(jogarNovamente)
    jogarNovamente.onclick = reiniciaJogo
    
  }

  function salvaAmigo(amigoX, jogadorX, amigoY, jogadorY) {
    let amigo = document.querySelector("#amigo")
    let jogador = document.querySelector('#jogador')
    
    if (amigoX >= jogadorX && amigoX <= jogadorX + 100) {
      if (jogadorY + 100 > amigoY && jogadorY + 100 < amigoY + 115) {
        amigosSalvos++;
        amigo.style.setProperty("left", "200px");
        amigo.style.setProperty("top", "400px");
        jogador.style.setProperty("left", "200px");
        jogador.style.setProperty("top", "75px");
      }
    }
  }
}

function reiniciaJogo(){
    let placar = document.querySelector('#placar')
    let amigo = document.querySelector('#amigo')
    let inimigo1 = document.querySelector('#inimigo2')
    let inimigo2 = document.querySelector('#inimigo2')
    let jogador = document.querySelector('#jogador')

    if(amigo){
        amigo.remove()
    }
    if(inimigo1){
        inimigo1.remove()
    }
    if(inimigo2){
        inimigo2.remove()
    }
    if(jogador){
        jogador.remove()
    }
    placar.remove()

    start()
}
