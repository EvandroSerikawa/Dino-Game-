const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameover = false;
let position = 0;

function handleKeyUp(event){
    if(event.KeyCode === 32){
        if(!isJumping){
            Jump();
        }
    }
}

function Jump(){
    isJumping = true;

    let upInterval = setInterval(()=> {
        if(position >=150){

            // descendo 
            clearInterval(upInterval);

            let downInterval = setInterval(()=>{
                if(position <= 0){
                clearInterval(downInterval)
                isJumping = false;
                } else {
                position -= 20;
                dino.style.bottom = position + 'px';
                }
            },20);
        }else{
        //subindo 
        position += 20;
        dino.style.bottom = position + 'px';
        }
    },20);
}


function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = math.random() * 6000; // Ordem aleatória dos Cactus    

    if(isGameover) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(()=>{
        if(cactusPosition < -60){
            //saiu da tela
            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if ( cactusPosition > 0 && cactusPosition < 60 && position < 60){
            // Game Over

            clearInterval(leftTimer);
            isGameover = true;
            document.body.innerHTML = '<h1 class="game-over">Fim do jogo</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
         }
    },20);

    setTimeout(createCactus,randomTime);
}


createCactus();
document.addEventListener('Keyup', handleKeyUp);

