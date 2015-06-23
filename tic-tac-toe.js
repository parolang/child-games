// Tic Tac Toe


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

var id2coord = function (id) {
    // An id-type is of the form "#r0c1"
    var coord[0] = rowNum(id);
    var coord[1] = colNum(id);
    
    return coord;
#+END_SRC

};

var coord2id = function (coord) {
    // Decide here, an id-type is of the form "#r0c1".
    var id = "#r"+coord[0]+"c"+coord[1];
    return id;
};

var isDiagWin = function (cellId, player) {
    // Lazy method

    // First define array of all diagonal win combinatons. There are
    // only two.
    var win = [[coord2id(0,0), coord2id(1,1), coord2id(2,2)],
               [coord2id(2,0), coord2id(1,1), coord2id(0,2)]]; 

    // If all three cells are the players mark, then return true.
    var playerWin = true;

    for (var i=0; i<win.length; i+=1) {
        playerWin = playerWin && ($(win[i][0]).text === player);
        playerWin = playerWin && ($(win[i][1]).text === player);
        playerWin = playerWin && ($(win[i][2]).text === player);
    }

    return playerWin;
};

var isVertWin = function (cellId, player) {
    // Lazy method

    // First define array of all vertical win combinatons. There are
    // only three.
    var win = [[coord2id(0,0), coord2id(1,0), coord2id(2,0)],
               [coord2id(0,1), coord2id(1,1), coord2id(2,1)],
               [coord2id(0,2), coord2id(1,2), coord2id(2,2)]];

    // If all three cells are the players mark, then return true.
    var playerWin = true;

    for (var i=0; i<win.length; i+=1) {
        playerWin = playerWin && ($(win[i][0]).text === player);
        playerWin = playerWin && ($(win[i][1]).text === player);
        playerWin = playerWin && ($(win[i][2]).text === player);
    }

    return playerWin;
};

var isHorzWin = function (cellId, player) {
    // Lazy method                 

    // First define array of all horizontal win combinatons. There are
    // only three.
    var win = [[coord2id(0,0), coord2id(0,1), coord2id(0,2)],
               [coord2id(1,0), coord2id(1,1), coord2id(1,2)],
               [coord2id(2,0), coord2id(2,1), coord2id(2,2)]];


    // If all three cells are the players mark, then return true.
    var playerWin = true;

    for (var i=0; i<win.length; i+=1) {
        playerWin = playerWin && ($(win[i][0]).text === player);
        playerWin = playerWin && ($(win[i][1]).text === player);
        playerWin = playerWin && ($(win[i][2]).text === player);
    }

    return playerWin;
};

var isWin = function (cellId, player) {
    // Return true if the player won horizontally, vertically, or
    // diagonally. Otherwise return false.

    var playerWin = false;

    playerWin = playerWin || isHorzWin(cellId, player);
    playerWin = playerWin || isVertWin(cellId, player);
    playerWin = playerWin || isDiagWin(cellId, player);

    return playerWin;
};

var cellClick = function () {
    // Click handler

    // We need the HTML id of the cell that was clicked.
    var id = $(this).attr("id");

    // We also need the text content of the clicked cell.
    var cellContent = $(this).text();

    // If the cell is empty, change it to an X.
    if (cellContent===" ") {
        $(this).text("X");
    }

    // Did the player win?  If so, just write "Win!" to the console
    // for now.
    if (isWin(cellId, "X")) {
        console.log("Win!");
    }
};

var idCells = function () {
    // This function needs to find each .cell element, and give them
    // id's according to their row and position #r0c0, #r0c1, #r0c2,
    // etc.  Also initialize cellIds and board arrays.
    
    $(".row").each(function(i,row) {
        $(row).find(".cell").each(function(j,col) {
            var id = "r"+i.toString()+"c"+j.toString();
            
            $(col).attr("id", id);
        });
    });
};

// Initialize game

// First bind cellClick as click handler.
$(".cell").click(cellClick);

// Then call idCells to add HTML id to each cell div.
idCells();

