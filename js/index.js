// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 11;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    // js mein x axis uper hoti hai aur y axis neeche hoti hai. dhyaan rakhna hai ye baat..
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functions
function main(ctime) {
    // main ko firse idhar call kiya.. so that to make main a loop!! javascript main flicker nhi hone deta hai.. js easily chalta hai smoothly but set interval kisi ek interval par baar baar repeat karega ek cheez ko
    window.requestAnimationFrame(main);
    // console.log(ctime)
    // we can control fps. and can check kar sakte ho kitne fps aapko chahiye aur kitne aap rakhna chahte ho! ek condition daal kar by subtracting ctime-lastpainttime. milisecond mein hai, we will divide it by 1000.
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        // hamara snake peeche apni pooch ke kisi bhi segment mein ghus jaata hai toh vo collision maana jaaega! 
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    // idhar chaaro mein se koi ek true honi chahiye! then true hofa hence sbmein or lagaya!
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food.
    // kab khaaega snake khaana jab uski mundi aur food ke coordinates jo hain vo milenge.
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        // jaise jaise snake khaata jaaega vaise vaise uske body segments badte jaaein. uske liye likha hai neeche.
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;

        // ek random jagah par naya food generate karenge with the help of math.random. math.round maane vo integer hoga complete float aae tab bhi it will round it off.
        // neeche jo hota hai vo formula hai neeche.
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake

    // dekho apne ko karna ye hai ki jaise hi snake food khaaega, jo elements hain snake ke body ke vo apni place se ek place aage shift ho jaaenge aur uska jo head hai vo ek kadam aage aa jaaega jis drxn mein vo chal raha hai.
    // hum poore snake ki body par iterate karenge with the help of for loop.
    // ulta for loop lagaenge. snakeArr.lenth-1 hota hai hamara last element. -2 is for second last element. 

    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    // so loop ka kaam hoga ki jaise jaise vo bindu snake khata jaaega, hum snake ke pooch mein vo add karte jaaenge
    // maane vo jitne bindu honge unki sabki hum location iss snakearray mein add karte jaaenge.
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food


    // Display the snake
    // phele toh board ke ander ki html ko khaali karenge!
    board.innerHTML = "";
    // foreach is a loop. e=element. 
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        // row x nhi hoga aur coloumn y nhi hoga. y= row ,x= coloumn
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    // ab food ke x aur y particle ko dekhenge
    // dhyaan rakhna hai ki food isnt array.
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
// jaise hi koi keyboard par function run hogavaise ye neeche vaala function run hoga.is addeventlistener function ka pehela argument hota hai event aur dusra arrow function.
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game koi bhi button dabe vaise hi start hoga game.
    moveSound.play();
    // ab mei kaunsi key dabaai gyi hai vo detect karni ki koshish karungi. so switch case statement use karenge.
    // e.key maane e jo event fire hua hai aur .key jo ki bataega kaunsi key hai.
    switch (e.key) {
        // now jitne bhi arrows vali cheezein hain, unko console.log mein daalenge ye batane ke liye ye vaali key dabaai gyi hai.
        
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
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});