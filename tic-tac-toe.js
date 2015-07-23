// Tic Tac Toe

var randomCell = function() {
    // Just return a random cell from the Tic-Tac-Toe board in id.
    var horzCellNum = Math.floor( Math.random() * 3 );
    var vertCellNum = Math.floor( Math.random() * 3 );
    return coord2id(horzCellNum, vertCellNum);
};

var emptyCells = new Array(0);

var remove = function(element, array) {
    var index = array.indexOf(5);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

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
    var coord;
    
    coord[0] = rowNum(id);
    coord[1] = colNum(id);
    
    return coord;
};

var coord2id = function (coord0, coord1) {
    // Decide here, an id-type is of the form "#r0c1".
    // var id = "#r"+coord[0]+"c"+coord[1];
    var id = "#r"+coord0+"c"+coord1;
    return id;
};

var diagWin = [[coord2id(0,0), coord2id(1,1), coord2id(2,2)],
               [coord2id(2,0), coord2id(1,1), coord2id(0,2)]];

var vertWin = [[coord2id(0,0), coord2id(1,0), coord2id(2,0)],
               [coord2id(0,1), coord2id(1,1), coord2id(2,1)],
               [coord2id(0,2), coord2id(1,2), coord2id(2,2)]];

var horzWin = [[coord2id(0,0), coord2id(0,1), coord2id(0,2)],
               [coord2id(1,0), coord2id(1,1), coord2id(1,2)],
               [coord2id(2,0), coord2id(2,1), coord2id(2,2)]];

var searchCells = function (cellArray, player) {
    // cellArray is a two-dimensional array.  Search each element in
    // cellArray to see if each element in that sub-array is the same
    // as player.  If so, return those cellIds in an array. Otherwise,
    // return an empty array.

    var allSame = true;
    var matchedArray = [];
    for (var i=0; i<cellArray.length; i+=1) {
        allSame = true;         // Reset allSame on each iteration
        allSame = allSame && ($(cellArray[i][0]).text() === player);
        allSame = allSame && ($(cellArray[i][1]).text() === player);
        allSame = allSame && ($(cellArray[i][2]).text() === player);
        if (allSame) {
            matchedArray.push(cellArray[i]);
        }
    }
    return matchedArray;
};

var isStringEmpty = function (str) {
    // Found at http://stackoverflow.com/a/1173854
    var isEmpty = ($.trim(str) === '');
    
    return isEmpty;
};

var searchEmptyCells = function () {
    // return list of empty cells
    var cells = [];
    
    $(".row").each(function(i,row) {
        $(row).find(".cell").each(function(j,col) {
            var id = "r"+i.toString()+"c"+j.toString();
            var cellContent = $(col).text();
            if (isStringEmpty(cellContent)) {
                cells.push(id);
            }
        });
    });
    console.log("cells: ", cells);
    return cells;
};

var cellClick = function () {
    // Click handler

    // We need the HTML id of the cell that was clicked.
    var cellId = "#" + $(this).attr("id");

    // We also need the text content of the clicked cell.
    var cellContent = $(this).text();
    
    // If the cell is empty, change it to an X.
    if (isStringEmpty(cellContent)) {
        $(this).text("X");
    } else {
        return;
    }

    // Beginning of old function isWin
    // Functionality in isWin should really go in here.
    // Return true if the player won horizontally, vertically, or
    // diagonally. Otherwise return false.

    var playerWin = false;

    playerWin = playerWin || searchCells(horzWin, "X").length !== 0;
    playerWin = playerWin || searchCells(vertWin, "X").length !== 0;
    playerWin = playerWin || searchCells(diagWin, "X").length !== 0;

    if (playerWin) {
        var matchCells = [];
        // Concatenate the list of win cells from all possibilities.
        matchCells = matchCells.concat(searchCells(horzWin, "X"),
                                       searchCells(vertWin, "X"),
                                       searchCells(diagWin, "X"));

        // Add CSS "win" class to winning cells.
        for(var i=0; i<matchCells.length; i++) {
            $(matchCells[i][0]).addClass("win");
            $(matchCells[i][1]).addClass("win");
            $(matchCells[i][2]).addClass("win");
        }
    }
    // End of old function isWin

    // Did the player win?  If so, pop up an alert box for now.
    if (playerWin) {
        console.log("Win!");
        alert("You win!");
    }

    // Let's start the computer player (O) here.  Refactor later.

    // Make a function that will get a list of empty spaces on the
    // board.
    var emptyCells = searchEmptyCells();
    console.log("+emptyCells: ", emptyCells);
    // If there are no empty spaces on the board, and neither
    // player has won (e.g. above), pick a random element from this
    // list of empty spaces.
    var gameIsDraw = (emptyCells.length === 0) && !playerWin;
    console.log("gameIsDraw: ", gameIsDraw);
    var selectedCell;
    if (gameIsDraw) {
        alert("Game is a draw!");
    } else if (emptyCells.length !== 0) {
        selectedCell =
            emptyCells[Math.floor(emptyCells.length*Math.random())];
        console.log("selectedCell: ", selectedCell);
        // TODO: Make a random function to declutter the above line.
        // Then place O in that space.
        $("#"+selectedCell).text("O");
    }
    
    // Then find out if player O wins, using a lot of the same code
    // above.

    var computerWin = false;

    computerWin = computerWin || searchCells(horzWin, "O").length !== 0;
    computerWin = computerWin || searchCells(vertWin, "O").length !== 0;
    computerWin = computerWin || searchCells(diagWin, "O").length !== 0;

    if (computerWin) {
        var matchCells = [];
        // Concatenate the list of win cells from all possibilities.
        matchCells = matchCells.concat(searchCells(horzWin, "O"),
                                       searchCells(vertWin, "O"),
                                       searchCells(diagWin, "O"));

        // Add CSS "lose" class to winning cells.
        for(var i=0; i<matchCells.length; i++) {
            $(matchCells[i][0]).addClass("lose");
            $(matchCells[i][1]).addClass("lose");
            $(matchCells[i][2]).addClass("lose");
        }
    }
    // End of old function isWin

    // Did the player lose?  If so, pop up an alert box for now.
    if (computerWin) {
        console.log("Win");
        alert("You lost.");
    }

};

var idCells = function () {
    // This function needs to find each .cell element, and give them
    // id's according to their row and position #r0c0, #r0c1, #r0c2,
    // etc.  Also initialize cellIds and board arrays.
    
    $(".row").each(function(i,row) {
        $(row).find(".cell").each(function(j,col) {
            var id = "r"+i.toString()+"c"+j.toString();
            emptyCells.push(id);
            $(col).attr("id", id);
        });
    });
};

// Initialize game

 // First bind cellClick as click handler.
$(".cell").click(cellClick);

// Then call idCells to add HTML id to each cell div.
idCells();
console.log("emptyCells: ", emptyCells);
