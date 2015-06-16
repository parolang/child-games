// Tic Tac Toe

var board = [[" ", " ", " "],
             [" ", " ", " "],
             [" ", " ", " "]];

var cellNumber = function (element) {
    
}

var cellClick = function () {
    console.log($(this).contents());
    $(this).replaceWith('<div class="cell">X</div>');
    console.log($(this).text());
};

$(".cell").click(cellClick);

