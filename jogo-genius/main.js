    let order = [];
    let clickOrder = [];
    let score = 0;

    let blue = document.querySelector('.blue');
    let yellow = document.querySelector('.yellow');
    let red = document.querySelector('.red');
    let green = document.querySelector('.green')

    let shuffleOrder = () => {
        let colorOrder = Math.floor(Math.random()*4);
        order[order.length] = colorOrder;
        clickOrder=[]

        for(let i in order){
            let elementColor = createColorElement(order[i]);
            lightColor(elementColor,Number(i)+1)
        }
    }

    let lightColor = (element, number) => {
        number = number *500;
        
            setTimeout(()=>{
                element.classList.add('selected')
            }, number - 250)
            setTimeout(()=>{
                element.classList.remove('selected')
            },number)
        
    }

    let checkOrder=()=>{
        for(let i in clickOrder){
            if(clickOrder[i]!=order[i]){
                gameOver();
                break
            }
        }
        if(clickOrder.length==order.length){
            nextLevel()
        }
    }
    let click = (color) => {
        clickOrder[clickOrder.length] = color
        createColorElement(color).classList.add('selected');

        setTimeout(() => {
            createColorElement(color).classList.remove('selected')
            checkOrder()
        },250)

    }

    let createColorElement = (color)=> {
        if (color == 0){
            return blue
        } else if (color == 1){
            return green
        } else if(color ==2){
            return red
        }else if(color == 3){
            return yellow
        }
    }

    let nextLevel = () => {
        score ++
        shuffleOrder()
    }

    let gameOver = () => {
        alert(`Pontuação: ${score} \nPara iniciar novo jogo clique em OK`)
        order =[]
        clickOrder=[]

        playGame()
    }

    let playGame = () => {
        score = 0;
        shuffleOrder( )
    }

    blue.onclick = () => click(0)
    green.onclick = () => click(1)
    red.onclick = () => click(2)
    yellow.onclick = () => click(3)
    

    playGame()
