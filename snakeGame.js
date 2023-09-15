//game constconst & variables
let inputDir = {x:0,y:0};
const foodSound = new Audio("music/food.mp3");
const gameOveSound =  new Audio("music/gameover.mp3");
const moveSound =  new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let score =0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    { x:13,y:15}
]
let food ={
    x:6,y:15
}

//game gunction
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
      return
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
 // if you bump into your self
 for (let i =1 ; i<snakeArr.length;i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
    
 }
 //if you bump into the wall
 if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
    return true;
 }
}


function gameEngine(){
    //part 1 : updatind the snake array & food

    //when the geme is over 
      if(isCollide(snakeArr)){
        gameOveSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert(`GAME OVER !! your score is ${score} Press any key to start ||  Fool you cant beat my score because I am the devloper of this code HA! HA!`);
        snakeArr =[{ x:13,y:15}];
        score = 0;
        scoreBox.innerHTML = "SCORE: "+score;
        if(soundOn==0){
            musicSound.play();
        }else{
            
            musicSound.pause();
        }
        
      }



     //if you have eaten the food and increment the score and regenerate the food
     if(snakeArr[0].y == food.y & snakeArr[0].x == food.x){
        score++;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

        let scoreBox = document.querySelector("#scoreBox");
        scoreBox.innerHTML = "SCORE: "+score;
        foodSound.play();
        
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x , y:snakeArr[0].y+inputDir.y});
        let a = 1;
        let b = 17;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
     }


     //moveing the snake
     for(let i=snakeArr.length-2;i>=0;i--){
        
        snakeArr[i+1]={...snakeArr[i]};
     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;


      //part2:
    //display the snake 
    
    let board = document.querySelector("#bord");
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
       snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart =e.x;
        
        if(index==0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })

    //display the food
    foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart =food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);
}
 


//highscore logic
musicSound.play();
let hiScoreBox = document.querySelector("#hiScoreBox");
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
   let hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiScoreBox.innerHTML = "Hi-Score: " + hiscoreval;
}

//sound ON/OFF
let soundOn = 0;
let soundOnOff = document.querySelector("#soundOnOff") ;
let soundOff = document.querySelector("#soundOff");
soundOnOff.addEventListener("click",()=>{
    if(soundOn==0){
        console.log("sound off");
        musicSound.pause();
        soundOnOff.style.opacity = 0;
        soundOff.style.opacity = 1;
        soundOn = 1;
    }else{
        console.log("sound on");
        musicSound.play();
        soundOnOff.style.opacity = 1;
        soundOff.style.opacity = 0;
        soundOff.style.zIndex = 1;
        soundOn=0;
    }

})

//main logic start here

window.requestAnimationFrame(main);

window.addEventListener("keydown",e=>{
    inputDir = {x:0,y:1};
     //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x =-1;
            inputDir.y=0;
            break;
            case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y= 0;
            break;
            
    }
})