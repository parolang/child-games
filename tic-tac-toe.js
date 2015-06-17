// Tic Tac Toe

var cellIds = [[" ", " ", " "],
               [" ", " ", " "],
               [" ", " ", " "]];

var board = [[" ", " ", " "], 
             [" ", " ", " "], 
             [" ", " ", " "]];

var idCells = function () {
    // This function needs to find each .cell element, and give them
    // id's according to their row and position #r0c0, #r0c1, #r0c2,
    // etc.  Also initialize cellIds and board arrays.
        
    $(".row").each(function(i,row) {
        $(row).find(".cell").each(function(j,col) {
            var id = "#r"+i.toString()+"c"+j.toString();
            
            $(col).attr("id", id);
            cellIds[i][j] = id;
            board[i][j] = " ";
        });
    });
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
};

$(".cell").click(cellClick);
idCells();
console.log(board);
console.log(cellIds);
