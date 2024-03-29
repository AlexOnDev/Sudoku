var numSelected = null;
var tileSelected = null;
var colorSelected = null;
var eliminarSelected = false;
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
    "387491625",
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
    //------------------------------------------------
    let buttonDm=document.getElementById("darkmode");
    buttonDm.addEventListener("click", darkMode);

    let buttonCorregir=document.getElementById("corregir");
    buttonCorregir.addEventListener("click", corregirBoard);

    let botonesColores=document.querySelectorAll("#menu button");
    botonesColores.forEach(function(boton){
        boton.addEventListener("click", selectColor);
    })

    let botonEliminar= document.getElementById("eliminar");
    botonEliminar.addEventListener("click",selectEliminar);

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

function selectColor(){
    //resetClaseBotonesColores();
    //colorSelected=this;

    if(colorSelected==this){
        colorSelected.classList.toggle("colorSelected");
    }
    else {
        if(colorSelected!=null) 
        colorSelected.classList.remove("colorSelected");
           
        
        colorSelected=this;
        colorSelected.classList.add("colorSelected");
    }
    
}
function selectEliminar(){

    //numSelected=false;

    if(eliminarSelected){
        eliminarSelected=false;
        this.classList.remove("rojo"); //Colorea boton rojo eliminar
    }
    else{
        eliminarSelected=true;
        this.classList.add("rojo");
    }

}
function selectTile(){
    if(checkNumberSelected()){
        //Resetea el color rojo puesto por fallar al corregir
        if(this.classList.contains("rojo") && this.innerText != numSelected.id)
            this.classList.remove("rojo");
        
        //Evita escribir sobre casillas por defecto
        if(!this.classList.contains("tile-start"))
        this.innerText = numSelected.id;

    }
    if(checkColorSelected() && eliminarSelected==false){
        checkColorTile(this);
        if(colorSelected.classList[0] != "blanco" && !this.classList.contains("tile-start"))
        this.classList.add(colorSelected.classList[0]);

    }

    if(eliminarSelected)
    this.textContent="";
    /*
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
    }*/
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
    digitos.forEach(function(digito) {    const colorPicker = document.getElementById('colorPicker');

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

    var botones=Array.from(document.getElementsByTagName("button"));
    botones.forEach(function(boton){
        if(boton.classList.contains("buttonGenerales")){
            boton.classList.toggle("dark-mode-buttonGeneral");
        }else
        boton.classList.toggle("dark-mode-button");
    });
}
function checkNumberSelected(){
    var numbersSelected = document.getElementsByClassName("numberSelected");
    if(numbersSelected.length >0) return true;
    return false;
}

function checkColorSelected(){
    var colorsSelected = document.getElementsByClassName("colorSelected");
    if(colorsSelected.length >0) return true;
    return false;
}

function checkColorTile(tile){
    let casilla = tile;
    if(casilla.classList.contains("naranja"))
    casilla.classList.remove("naranja");

    if(casilla.classList.contains("azul"))
    casilla.classList.remove("azul");

    if(casilla.classList.contains("verde"))
    casilla.classList.remove("verde");

    if(casilla.classList.contains("amarillo"))
    casilla.classList.remove("amarillo");

    if(casilla.classList.contains("rojo"))
    casilla.classList.remove("rojo");


    /*if(casilla.classList.contains("blanco"))
    casilla.classList.remove("blanco");*/
}
function corregirBoard(){
    
    let boardCompletado = true;  

    var tiles = Array.from(document.getElementsByClassName("tile"));
    var valores = [];
    var filaValores = "";

    for (var i = 0; i < tiles.length; i++) {
        // Obtener el textContent de cada div
        var valor = tiles[i].textContent;

        if(valor == ""){
            valor="-";
            boardCompletado = false;
        }

        // Agregar el valor a la fila actual
        filaValores+=valor;
        
        // Si hemos acumulado 9 valores, guardar la fila en el array de valores y resetear la fila
        if (filaValores.length === 9) {
            valores.push(filaValores);
            filaValores = "";
        }
    }

    // Verificar que tengamos los valores correctos
    //console.log(valores);
    
    //Comparamos los arrays y resaltamos si hay diferencias.
        let arrayDiferencias = compararArrays(valores, solution);
        if(arrayDiferencias.length > 0){
            resaltarDiferencias(arrayDiferencias);
            aumentarErrores(arrayDiferencias.length);

        }else if (boardCompletado == true){
            console.log("Has ganado OOOOO");
        }
        //console.log(arrayDiferencias);
    
}
function compararArrays(array1, array2) {
    var diferencias = [];

    // Recorrer ambos arrays
    for (var i = 0; i < array1.length; i++) {
        var fila1 = array1[i];
        var fila2 = array2[i];

        // Comparar los elementos de cada fila
        for (var j = 0; j < fila1.length; j++) {
            if ( fila1[j] !== "-"  && fila1[j] !== fila2[j]) {
                // Si los elementos son diferentes, añadir la posición a las diferencias
                diferencias.push({ fila: i, columna: j });
            }
        }
    }

    return diferencias;
}
function resaltarDiferencias(diferencias) {
    // Recorrer el array de diferencias
    diferencias.forEach(function(diferencia) {
        // Construir el ID del div correspondiente
        var divId = diferencia.fila + "-" + diferencia.columna;
        
        // Obtener el div con el ID correspondiente
        var div = document.getElementById(divId);
        
        // Si el div existe, establecer el fondo rojo
        if (div) {
            checkColorTile(div);
            div.classList.add("rojo");
        }
    });
}
// function resetClaseBotonesColores(){
//     document.getElementById("botonAzul").classList.toggle("azul")
//     document.getElementById("botonAmarillo").classList.toggle("amarillo");
//     document.getElementById("botonVerde").classList.toggle("verde");
//     document.getElementById("botonBlanco").classList.toggle("blanco");
//     document.getElementById("botonNaranja").classList.toggle("naranja");
   
// }
function aumentarErrores(errores){
    errors+=errores;
    if(errors>=999) errors = 999;
        document.getElementById("errors").innerText= errors;
}
