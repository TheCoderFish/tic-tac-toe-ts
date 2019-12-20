"use strict";
var board = document.querySelector('.board');
function createBox(i) {
    var box = document.createElement('td');
    box.classList.add('box');
    box.setAttribute('id', i.toString());
    box.addEventListener('click', clicked);
    return box;
}
function createBoard() {
    var table = document.createElement('table');
    for (var i = 0; i < 3; i++) {
        var row = document.createElement('tr');
        row.classList.add('row');
        for (var j = 0; j < 3; j++) {
            row.appendChild(createBox(j + (i * 3)));
        }
        table.appendChild(row);
    }
    board.appendChild(table);
}
function clicked(e) {
    var box = e.target;
    console.log("" + box.id);
}
createBoard();
