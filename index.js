let boardSize=4;
let gridsArray=[];
let score=0;
let scoreDisplay=document.getElementById("scores");
document.addEventListener("DOMContentLoaded",()=>{
    const gameBoard=document.getElementById('game-box');
    createBoard(gameBoard);
    generateRandomTile();
    generateRandomTile();
    givingValuesToTiles(gameBoard);
    document.addEventListener("keydown",onArrowKeyPress);
});

function createBoard(gameBoard){
    for (let i=0;i<boardSize;i++){
        gridsArray[i]=[];
        for (let j=0; j<boardSize;j++){
            gridsArray[i][j]=0;
            const tile=document.createElement("div");
            tile.className="tile";
            tile.id=`tile-${i}-${j}`;
            gameBoard.appendChild(tile);
        }
    }
}
function generateRandomTile(){
    let emptyTiles=[];
    for(let i=0;i<boardSize;i++){
        for(let j=0;j<boardSize;j++){
            if(gridsArray[i][j]===0)emptyTiles.push({x:i,y:j});
        }
    }
    if(emptyTiles.length>0){
        const{x,y}=emptyTiles[Math.floor(Math.random()*emptyTiles.length)];
        gridsArray[x][y]=Math.random()>0.1?2:4;
    }
}
function givingValuesToTiles(gameBoard){
    for(let i=0;i<boardSize;i++){
        for(let j=0;j<boardSize;j++){
            const tile=document.getElementById(`tile-${i}-${j}`);
            tile.textContent=gridsArray[i][j]!==0?gridsArray[i][j]:"";
            tile.className=`tile ${gridsArray[i][j]? `tile-${gridsArray[i][j]}`:""}`;
        }
    }
}

function onArrowKeyPress(event){
    switch(event.key){
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        default:
            return
    }
    generateRandomTile();
    givingValuesToTiles(document.getElementById('game-board'));
    if(checkGameOver()) alert("Game Over!");
}

function slide(row){
    let arr=row.filter(val=>val);
    let missing=boardSize-arr.length;
    let zeroes=Array(missing).fill(0);
    return arr.concat(zeroes);
}

function combine(row){
    for(let i=0;i<row.length-1;i++){
        if(row[i]===row[i+1]&&row[i]!==0){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
            scoreDisplay.textContent="Score :"+score;
        }
    }
    return row;
}
function moveLeft(){
    for(let i=0;i<boardSize;i++){
        let row=gridsArray[i];
        row=slide(row);
        row=combine(row);
        gridsArray[i]=slide(row);
    }
}
function moveRight(){
    for(let i=0;i<boardSize;i++){
        let row=gridsArray[i].reverse();
        row=slide(row);
        row=combine(row);
        gridsArray[i]=slide(row).reverse();
    }
}
function moveUp(){
    for(let j=0;j<boardSize;j++){
        let column=[];
        for(let i=0;i<boardSize;i++){
            column.push(gridsArray[i][j]);
        }
        column=slide(column);
        column=combine(column);
        column=slide(column);
        for(let i=0;i<boardSize;i++){
            gridsArray[i][j]=column[i];
        }
    }
}
function moveDown(){
    for(let j=0;j<boardSize;j++){
        let column=[];
        for (let i=0;i<boardSize;i++){
            column.push(gridsArray[i][j]);
        }
        column=column.reverse();
        column=slide(column);
        column=combine(column);
        column=slide(column).reverse();
        for(let i=0;i<boardSize;i++){
            gridsArray[i][j]=column[i];
        }
    }
}

function checkGameOver(){
    for(let i=0;i<boardSize;i++){
        for(let j=0;j<boardSize;j++){
            if(gridsArray[i][j]===0) return false;
            if(i!==boardSize-1&&gridsArray[i][j]===gridsArray[i+1][j]) return false;
            if(j!==boardSize-1&&gridsArray[i][j]===gridsArray[i][j+1]) return false;
        }
    }
    return true;
}
