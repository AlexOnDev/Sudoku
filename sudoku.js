var numSelected = null;
var tileSelected = null;
var errors= 0;
var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "3874916-5",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload=function(){
    setGame();
}
function setGame(){
    //Digits 1-9
    for(let i = 1; i<10; i++){
        //<div id="1"> </div>
        let number=document.createElement("div");
        number.id= i
        number.innerText = i;

        number.addEventListener("click", selectNumber);
        number.classList.add("number");

        document.getElementById("digits").appendChild(number);
    }
    //Board 9x9
    for(let r=0; r<9;r++){
        for(let c=0; c<9; c++){
            let tile= document.createElement("div");
            tile.id = r.toString() + "-"+c.toString();

            if(board[r][c] != "-"){
                tile.innerText= board[r][c];
                tile.classList.add("tile-start");
            }
            if(r == 2 || r== 5)
                tile.classList.add("horizontal-line");
            
            if(c == 2 || c == 5)
                tile.classList.add("vertical-line");
            
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");

            document.getElementById("board").append(tile);
        }
    }
    let buttonDm=document.getElementById("darkmode");

    buttonDm.addEventListener("click", darkMode);

}
function selectNumber(){
    if(numSelected==this){
        numSelected.classList.toggle("numberSelected");
    }
    else {
        if(numSelected!=null) 
            numSelected.classList.remove("numberSelected");
           
        
        numSelected=this;
        numSelected.classList.add("numberSelected");
    }
    
}
function selectTile(){
    if(checkNumberSelected()){
        if(this.innerText != "") //NO SOBRESCRIBIR
        return;


        //"0-0","0-1",...
        let coords= this.id.split("-");
        let r= parseInt(coords[0]);
        let c= parseInt(coords[1]);

        if(solution[r][c] == numSelected.id){
            this.innerText = numSelected.id;
        }else{
            errors ++;
            document.getElementById("errors").innerText= errors;
        }
    }
}
function darkMode() {
    document.body.classList.toggle("dark-mode");


    var elementosConClase = Array.from(document.getElementsByClassName("tile"));
    elementosConClase.forEach(function(elemento) {
        elemento.classList.toggle("darkTile-border");
    });

    var elementosConClase = Array.from(document.getElementsByClassName("tile-start"));
    elementosConClase.forEach(function(elemento) {
        elemento.classList.toggle("dark-modeTile-start");
    });

    var digitos = Array.from(document.getElementsByClassName("number"));
    digitos.forEach(function(digito) {
        digito.classList.toggle("dark-mode-border-number");
    });

    var tilesHorizontal= Array.from(document.getElementsByClassName("horizontal-line"));
    tilesHorizontal.forEach(function(tile) {
        tile.classList.toggle("dark-horizontal-line");
    });


    var tilesVertical= Array.from(document.getElementsByClassName("vertical-line"));
    tilesVertical.forEach(function(tile) {
        tile.classList.toggle("dark-vertical-line");
    });
 }
 function checkNumberSelected(){
    var numbersSelected = document.getElementsByClassName("numberSelected");
    if(numbersSelected.length >0) return true;
    return false;
 }