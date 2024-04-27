let board=new Array(5);
let Parent=document.getElementById("parent");
for (let i = 0; i < 5; i++) {
    board[i] = new Array(5);
}

let visited=new Array(5);
for (let i = 0; i < 5; i++) {
    visited[i] = new Array(5);
}


function buildBoard(){
    for(let i=0;i<5;i++){
        let row=document.createElement("div");
        row.className=" flex flex-row gap-5  justify-center w-full  items-center h-14";
        row.id=i;
        Parent.appendChild(row);
        let arr=[];
        for(let j=0;j<5;j++){
            let item=document.createElement("div");
            item.className="box bg-red-700 w-12 h-12 border-2 border-solid border-black rounded-lg text-center font-bold text-2xl";
            item.innerText="0";
            item.id=`I${i}${j}`;
            item.style.backgroundColor="red";
            
            row.appendChild(item);
            board[i][j]=item;

            visited[i][j]=0;
        }
    }

}

buildBoard();
makeboardRed();
console.log(board);

////////////////////////////Entering Values////////////////////////////
let valueTobeFilled=0;

let buttons=document.getElementById("buttons");

let S_X=0;
let S_Y=0;
let D_X=4;
let D_Y=4;

let assignDES=false;
let assignSource=false;

let isdestinationReached=false;
let noOfsourse=0;
let noOfdes=0;

parent.addEventListener("click",(e)=>{
    if(e.target.innerText=="S"){
        noOfsourse--;
    }
    if(e.target.innerText=="D"){
        noOfdes--;
    }
    if(e.target.id=="source"&&noOfsourse==0){
        assignSource=true;
    }
    if(e.target.id=="des"&&noOfdes==0){
        assignDES=true;
    }
    if(e.target.id[0]=="I"&&!assignSource &!assignDES){
        e.target.innerText=valueTobeFilled;
    }
    if(e.target.id[0]=="I"&&assignSource){
        noOfsourse++;
        S_X=e.target.id[2];
        S_Y=e.target.id[1];
        assignSource=false;
        e.target.innerText="S";
    }
    if(e.target.id[0]=="I"&&assignDES){
        noOfdes++;
        D_X=e.target.id[2];
        D_Y=e.target.id[1];
        assignDES=false;
        e.target.innerText="D";
    }
})

///starting the game
buttons.addEventListener("click",(e)=>{
    if(e.target.id=="0"||e.target.id=="1"){
        valueTobeFilled=e.target.id;
    }
    if(e.target.id=="start"){
        console.log(S_X+S_Y)
        console.log(D_X+D_Y)
        isdestinationReached=false;
        makeboardRed();
solve(board,Number(S_X),Number(S_Y),visited);
console.log("solve finish");
    }
})


///backtrack logic
function validMove(arr,x,y,visited){
    if((x>=0&&x<5)&&(y>=0&&y<5)&&(arr[y][x].innerText=="1"||arr[y][x].innerText=="D")&&visited[y][x]==0){
        return true;
    }
    return false;
}

function solve(arr,x,y,visited){
    if(isdestinationReached){
        return;
    }
    arr[y][x].style.backgroundColor="green";
    visited[y][x]=true;
    if(x==Number(D_X)&&y==Number(D_Y)){
        isdestinationReached=true;
        return;
    }
    

    if(validMove(arr,x+1,y,visited)){
       
        solve(arr,x+1,y,visited)
         
    }
    if(validMove(arr,x-1,y,visited)){
        
        solve(arr,x-1,y,visited);
         
    }
    if(validMove(arr,x,y+1,visited)){
      
        solve(arr,x,y+1,visited);
         
    }
    if(validMove(arr,x,y-1,visited)){
        
        solve(arr,x,y-1,visited);
         
    }
    if(!isdestinationReached){
        visited[y][x]=false;
        arr[y][x].style.backgroundColor="red";//wrong move will get this color
    }
    
    
}

function makeboardRed(){
    
for(let i=0;i<5;i++){
    
    for(let j=0;j<5;j++){
       board[i][j].style.backgroundColor="purple";//initial color of board
       visited[i][j]=false;
       console.log("s")
    }
}
}

