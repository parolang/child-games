// Tic Tac Toe

var cellIds = [[" ", " ", " "],
               [" ", " ", " "],
               [" ", " ", " "]];

var board = [[" ", " ", " "], 
             [" ", " ", " "], 
             [" ", " ", " "]];

var extractNum = function(n) {
    return function(str) {
        return parseInt(str.charAt(n), 10);
    };
};

// rowNum: Return the row number of a given id.
// E.g., #R1C2 --> 1
var rowNum = extractNum(2);

// colNum: Return the column number of a given id.
// E.g., #R1C2 --> 2
var colNum = extractNum(4);

var coord2id = function() {
    return;
};

var id2coord = function() {
    return;
};

var isWin = function(player, cell) {
    // This function determines if the player (either "X" or "O") will
    // win after putting their mark in the cell (designated by #id).
    var coord = [rowNum(cell),colNum(cell)];
    console.log("coord[0]: ", coord[0], "coord[1]: ", coord[1]);
    var isHorzWin = function() {
        var same=true;
        var id;
        var cellContent;
        
        for( var i=0; i<3; i+=1) {
            id = "#r"+coord[0]+"c"+i;
            cellContent=$(id).text();
            $(id).css("background-color", "orange");
            same = same && (cellContent===player);
            console.log(id,cellContent, same);
        };
        return same;
    };

    var isVertWin = function() {
        var same;
        var id;
        
        for( var i=0; i<3; i+=1) {
            id = "#r"+i+"c"+coord[1];
            cellContent=$(id).text();
            same = same && (cellContent===player);
        };
        return same;
    };

    var isDiagWin = function() {
        var same;
        var id;
        
        for( var i=0; i<3; i+=1) {
            id = "#r"+i+"c"+i;
            cellContent=$(id).text();
            same = same && (cellContent===player);
        };
        
        for( var i=0; i<3; i+=1) {
            id = "#r"+i+"c"+(3-i);
            cellContent=$(id).text();
            same = same && (cellContent===player);
        };
        return same;
    };

    return isHorzWin() || isVertWin() || isDiagWin();
};

var idCells = function () {
    // This function needs to find each .cell element, and give them
    // id's according to their row and position #r0c0, #r0c1, #r0c2,
    // etc.  Also initialize cellIds and board arrays.
        
    $(".row").each(function(i,row) {
        $(row).find(".cell").each(function(j,col) {
            var id = "r"+i.toString()+"c"+j.toString();
            
            $(col).attr("id", id);
            cellIds[i][j] = id;
            board[i][j] = " ";
        });
    });
    console.log("idCells called!");
};

var cellClick = function (event) {
    var id = $(this).attr("id");
    var cellContent = $(this).text();
    
    if (cellContent==="X") {
        $(this).text(" ");
    } else {
        $(this).text("X");
    }
    console.log($(this).text());
    if (isWin("X","#"+$(this).attr("id"))) {
        console.log("Win!");
    };
};

$(".cell").click(cellClick);
idCells();
console.log(board);
console.log(cellIds);
