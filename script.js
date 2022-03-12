let which = 0;
let wIndex = 0;
let mem = [];
let cord = [];
let answer;
let scoreNow = 0;
let arr1 = [0,0,0,0];
let arr2 = [0,0,0,0];
let arr3 = [0,0,0,0];
let arr4 = [0,0,0,0];
let arrAll = [arr1,arr2,arr3,arr4];
let field = document.querySelector(`.field`);
let scoreNum = document.querySelector(`.Score`);
let bestScore = document.querySelector(`.Best`);
let gameOver = document.querySelector(`#Game_Over`);
let cubeTextColors = [`black`,`#FFF`];
let cubeBackgroundColors = [`#CDC1B5FF`,`#eee3da`,`#ede0c8`,`#f2b179`,`#f59563`,`#f67c5f`,`#f65e3b`,`#edcf72`,`#edcc61`,`#9c0`,`#33b5e5`,`#09c`,`#a6c`,`#93c`];
function print(){
    for (let i=0;i<arrAll.length;i++){
        for(let j=0;j<arrAll[i].length;j++){
            if (arrAll[i][j]==0){field.children[i*3+j+i].innerText=``;field.children[i*3+j+i].style.backgroundColor=`${cubeBackgroundColors[0]}`;field.children[i*3+j+i].style.color=`${cubeTextColors[0]}`;}
            else {
                if (arrAll[i][j]==2||arrAll[i][j]==4){field.children[i*3+j+i].style.backgroundColor=`${cubeBackgroundColors[arrAll[i][j]/2]}`;field.children[i*3+j+i].style.color=`${cubeTextColors[0]}`;}
                else {field.children[i*3+j+i].style.backgroundColor=`${cubeBackgroundColors[findPowofTwo(arrAll[i][j])]}`;field.children[i*3+j+i].style.color=`${cubeTextColors[1]}`;}
                field.children[i*3+j+i].innerText=arrAll[i][j]}
        }
    }
    scoreNum.children[1].innerText=scoreNow;
    bestScore.children[1].innerText=localStorage.getItem(`bestScore`);
}
function swipeAll(diraction,arr){
    if (diraction==1){
        for (let i=0;i<arr.length;i++){
            for (let j=0;j<arr[i].length;j++){
                swipeOne(i,j,diraction,arr);
            }
        }
    }
    else if (diraction==2) {
        for (let i=0;i<arr.length;i++){
            for (let j=arr[i].length-1;j>=0;j--){
                swipeOne(i,j,diraction,arr);
            }
        }
    }
    else if (diraction==3) {
        for (let i=arr.length-1;i>=0;i--){
            for (let j=0;j<arr[i].length;j++){
                swipeOne(i,j,diraction,arr);
            }
        }
    }
    else if (diraction==4) {
        for (let i=0;i<arr.length;i++){
            for (let j=0;j<arr[i].length;j++){
                swipeOne(i,j,diraction,arr);
            }
        }
    }
}
function swipeOne(x,y,diraction,arr){
    arrWhere = swipeWhere(x,y,diraction,arr);
    let mid = arr[x][y];
    arr[x][y]=0;
    arr[arrWhere[0]][arrWhere[1]]=mid;
}
function swipeWhere(x,y,diraction,arr){
    cord = [x,y];
    if (diraction==1){bestCordUp(x,y,arr)}
    else if (diraction==2) {bestCordRight(x,y,arr)}
    else if (diraction==3) {bestCordDown(x,y,arr)}
    else if (diraction==4) {bestCordLeft(x,y,arr)}
    return cord;
}
function bestCordDown(x,y,arr){
    if (x+1==4){return cord[0]=x}
    if (arr[x+1][y]==0){bestCordDown(x+1,y,arr)}
    else cord[0]=x;
}
function bestCordUp(x,y,arr){
    if (x-1<0){return cord[0]=x;}
    if (arr[x-1][y]==0){bestCordUp(x-1,y,arr)}
    else cord[0]=x;
}
function bestCordLeft(x,y,arr){
    if (arr[x][y-1]==0){bestCordLeft(x,y-1,arr)}
    else cord[1]=y;
}
function bestCordRight(x,y,arr){
    if (arr[x][y+1]==0){bestCordRight(x,y+1,arr)}
    else cord[1]=y;
}
function summing(diraction,arr,isTesting){
    which=0;
    wIndex = 0;
    if (diraction==1){
        for (let i=1;i<arr.length;i++){
            for (let j=0;j<arr[i].length;j++){
                if (arr[i][j]!=0){sumWhichWhere(diraction,i,j,arr)}
            }
        }
    }
    else if (diraction==2) {
        for (let i=0;i<arr.length;i++){
            for (let j=arr[i].length-2;j>=0;j--){
                if (arr[i][j]!=0){sumWhichWhere(diraction,i,j,arr)}
            }
        }
    }
    else if (diraction==3) {
        for (let i=arr.length-2;i>=0;i--){
            for (let j=0;j<arr[i].length;j++){
                if (arr[i][j]!=0){sumWhichWhere(diraction,i,j,arr)}
            }
        }
    }
    else if (diraction==4) {
        for (let i=0;i<arr.length;i++){
            for (let j=1;j<arr[i].length;j++){
                if (arr[i][j]!=0){sumWhichWhere(diraction,i,j,arr)}
            }
        }
    }
    if (Array.isArray(which)){sumNeeded(arr,isTesting)}
}
function sumNeeded(arr,isTesting){
    for (let i=0;i<which.length;i++){
        if (arr[which[i][0][0]][which[i][0][1]]!=arr[which[i][1][0]][which[i][1][1]]){continue}
        else {
            arr[which[i][0][0]][which[i][0][1]]=0;
            arr[which[i][1][0]][which[i][1][1]]*=2;
            score(arr[which[i][1][0]][which[i][1][1]],isTesting);
        }
    }
}
function sumWhichWhere(diraction,i,j,arr){
    if (diraction==1){
        for (let k=1; k<=i;k++){
            if (arr[i-k][j]==0){continue}
            else if (arr[i-k][j]==arr[i][j]){
                if (!Array.isArray(which)){ which=[]}
                which[wIndex]=[[i,j],[i-k,j]];
                wIndex+=1;
            }
            else if ((arr[i-k][j]!=arr[i][j])&&(arr[i-k][j]!=0)){return}
        }
    }
    if (diraction==3){
        for (let k=1; k<arr.length-i;k++){
            if (arr[i+k][j]==0){continue}
            else if (arr[i+k][j]==arr[i][j]){
                if (!Array.isArray(which)){ which=[]}
                which[wIndex]=[[i,j],[i+k,j]];
                wIndex+=1;
            }
            else if ((arr[i+k][j]!=arr[i][j])&&(arr[i+k][j]!=0)){return}
        }
    }
    if (diraction==2){
        for (let k=1; k<arr[i].length-j;k++){
            if (arr[i][j+k]==0){continue}
            else if (arr[i][j+k]==arr[i][j]){
                if (!Array.isArray(which)){ which=[]}
                which[wIndex]=[[i,j],[i,j+k]];
                wIndex+=1;
            }
            else if ((arr[i][j+k]!=arr[i][j])&&(arr[i][j+k]!=0)){return}
        }
    }
    if (diraction==4){
        for (let k=1; k<=j;k++){
            if (arr[i][j-k]==0){continue}
            else if (arr[i][j-k]==arr[i][j]){
                if (!Array.isArray(which)){ which=[]}
                which[wIndex]=[[i,j],[i,j-k]];
                wIndex+=1;
            }
            else if ((arr[i][j-k]!=arr[i][j])&&(arr[i][j]-k!=0)){return}
        }
    }
}
function getRandomInt(){
    return Math.floor(Math.random() * 4); 
}
function isFull(arr){
    answer = false;
    arr.forEach(checkZero)
    if (answer){return false}
    else return true
}
function checkZero(currentValue, index, arr){
    currentValue.forEach((item)=>{if (item==0){answer=true}})
}
function isMoved(arr){
    let main = ``;
    let copy = ``;
    for (let i=0;i<arr.length;i++){
        main += arr[i].toString();
        copy += mem[i].toString();
    }
    if (main==copy){return false}
    else return true
}
function memory(arr){
    mem = [[...arr[0]],[...arr[1]],[...arr[2]],[...arr[3]]];
}
function randomTwo(arr){
    if ((isFull(arr)==false)&&(isMoved(arr)==true)){
        let two=[getRandomInt(),getRandomInt()];
        if (arr[two[0]][two[1]]==0){return arr[two[0]][two[1]]=2}
        else randomTwo(arr);
    }
    else return
}
function randomTwoWithoutCheck(){
    let two=[getRandomInt(),getRandomInt()];
    if (arrAll[two[0]][two[1]]==0){return arrAll[two[0]][two[1]]=2}
    else randomTwoWithoutCheck();
}
function score(arrI,isTesting){
    if (isTesting==true){return}
    else if(isTesting==undefined) {
        scoreNow+=arrI;
        if (scoreNow>localStorage.getItem(`bestScore`)){localStorage.bestScore=scoreNow}
    }
}
function checkBestScore(){
    if (localStorage.getItem(`bestScore`)==null){localStorage.setItem(`bestScore`,0)}
}
function findPowofTwo(num){
    let i=0;
    let x = num;
    while (x>1) {
        x/=2;
        i++;
    }
    return i
}
function newGame(){
    randomTwoWithoutCheck();
    randomTwoWithoutCheck();
}
function isGameOver(){
    let copyArrAll=[[...arr1],[...arr2],[...arr3],[...arr4]];
    memory(copyArrAll);
    summing(3,copyArrAll,true);
    summing(2,copyArrAll,true);
    summing(1,copyArrAll,true);
    summing(4,copyArrAll,true);
    swipeAll(2,copyArrAll);
    swipeAll(1,copyArrAll);
    swipeAll(4,copyArrAll);
    swipeAll(3,copyArrAll);
    if (isMoved(copyArrAll)==false&&isFull(copyArrAll)==true){gameOver.innerText=`Game Over`}
}
function swipeDown(arr){
    memory(arr);
    summing(3,arr);
    swipeAll(3,arr);
    randomTwo(arr);
    print();
    isGameOver();
}
function swipeLeft(arr){
    memory(arr);
    summing(4,arr);
    swipeAll(4,arr);
    randomTwo(arr);
    print();
    isGameOver();
}
function swipeUp(arr){
    memory(arr);
    summing(1,arr);
    swipeAll(1,arr);
    randomTwo(arr);
    print();
    isGameOver();
}
function swipeRight(arr){
    memory(arr);
    summing(2,arr);
    swipeAll(2,arr);
    randomTwo(arr);
    print();
    isGameOver();
}
document.addEventListener ('keydown', function (event) {
    if (event.repeat) return;  
    else {
        if (event.key=='ArrowLeft'){swipeLeft(arrAll)}
        if (event.key=='ArrowRight'){swipeRight(arrAll)}
        if (event.key=='ArrowUp'){swipeUp(arrAll)}
        if (event.key=='ArrowDown'){swipeDown(arrAll)}
        if (event.key=='x'){x();}
    }
});

field.addEventListener('touchstart', TouchStart, {passive: false});        
field.addEventListener('touchmove', TouchUp, {passive: false});

let xDown = null;
let yDown = null;                                                    

function getTouches(evt) {
return evt.touches || evt.originalEvent.touches;
}                                                     
function TouchStart(evt) {
    evt.preventDefault();
    const firstTouch = getTouches(evt)[0];                           
    xDown = firstTouch.clientX; 
    yDown = firstTouch.clientY;                                  
};                                                
function TouchUp(evt) {
    if ( !xDown || !yDown ) {
        return;
    }
    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;  
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    if (Math.abs(xDiff)>Math.abs(yDiff)){
        if (xDiff > 0) {swipeLeft(arrAll)}
        else {swipeRight(arrAll)}
    }
    else {
        if (yDiff > 0){swipeUp(arrAll)}
        else {swipeDown(arrAll)}
    }
    xDown = null; 
    yDown = null;                                       
};
//Начало игры...
checkBestScore();
newGame();
print();