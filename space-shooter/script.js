const witch = document.querySelector('#hero')
const playArea = document.querySelector('#main-play-area')
const badWitches = ['./img/witch.png', './img/witch 2.png', './img/witch 3.png']
const instructionsText = document.querySelector('.game-instructions')
const startButton = document.querySelector('.start-button')
let witchInterval

function flyWitch(event){
    if(event.key ==='ArrowUp'){
        event.preventDefault();
        moveUp()
    } else if (event.key === 'ArrowDown'){
        event.preventDefault()
        moveDown()
    } else if(event.key === ' '){
        event.preventDefault()
        shootYourShot()
    }
}

function moveUp(){
    let topPosition = getComputedStyle(witch).getPropertyValue('top')
    if(topPosition === '0px'){
        return
    } else {
        let position = parseInt(topPosition)
        position -= 50;
        witch.style.top = `${position}px`
    }
}

function moveDown(){
    let topPosition = getComputedStyle(witch).getPropertyValue('top')
    if(topPosition >= '740px'){
        return
    } else {
        let position = parseInt(topPosition)
        position += 50;
        witch.style.top = `${position}px`
    }
}

function shootYourShot(){
//cria o elemento dentro da play area
    let shot = createShotElement()
    playArea.appendChild(shot)
    moveShot(shot)
}

function createShotElement(){
    let xPosition = parseInt(window.getComputedStyle(witch).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(witch).getPropertyValue('top'))
    let newSpell = document.createElement('img')
    newSpell.src = './img/spell.png'
    newSpell.classList.add('shot')
    newSpell.style.left = `${xPosition}px`
    newSpell.style.top = `${yPosition-10}px`
    return newSpell
}

function moveShot(shot){
    let shotInterval = setInterval(()=>{
        let xPosition = parseInt(shot.style.left)
        let witches = document.querySelectorAll('.witch')

        witches.forEach((witch)=>{
            if(checkTarget(shot, witch)){
                witch.src='./img/explosao.png'
                witch.classList.remove('witch')
                witch.classList.add('dead-witch')
            }
        })
        if(xPosition === 740){
            shot.remove()
        } else{
            shot.style.left = `${xPosition +8}px`
        }

    },10)
}

function createWitches(){
    let newWitch = document.createElement('img')
    let witchSprite = badWitches[Math.round(Math.random()* badWitches.length)]
    newWitch.src = witchSprite;
    newWitch.classList.add('witch')
    newWitch.classList.add('witch-transition')
    newWitch.style.left = '740px'
    newWitch.style.top = `${Math.round(Math.random()*340)+30}px`
    playArea.appendChild(newWitch)
    moveWitch(newWitch)
}


function moveWitch(witch){
    let moveWitchInterval = setInterval(()=>{
        let xPosition = parseInt(window.getComputedStyle(witch).getPropertyValue('left'))

        if(xPosition<=50){
            if(Array.from(witch.classList).includes('dead-witch')){
                witch.remove()
            } else{
                gameOver()
            }
        } else{
            witch.style.left = `${xPosition-4}px`
        }
    },30)
}

function checkTarget(shot,witch){
    let shotTop = parseInt(shot.style.top)
    let shotLeft = parseInt(shot.style.left)


    let witchTop = parseInt(witch.style.top)
    let witchLeft = parseInt(witch.style.left)
    let witchBotton = witchTop-80

    if(shotLeft!=740 && shotLeft + 30 >= witchLeft){
        if(shotTop<=witchTop && shotTop>=witchBotton){
            return true
        } else{
            return false
        }
    } else{
        return false
    }
}
function start(){
    startButton.style.display = 'none';
    instructionsText.style.display='none'
    window.addEventListener('keydown', flyWitch)
    witchInterval = setInterval(()=>{
       createWitches();
    },2000)
}

function gameOver(){
    window.removeEventListener('keydown',flyWitch)
    clearInterval(witchInterval)
    let witches = document.querySelectorAll('.witch')
    witches.forEach((witch)=> witch.remove())
    let shots = document.querySelectorAll('.shot')
    shots.forEach((shot)=>shot.remove())
    setTimeout(()=>{
        alert('GAME OVER!')
        witch.style.top='250px';
        startButton.style.display='unset'
        instructionsText.style.display='block'
    })
}
//createWitches()