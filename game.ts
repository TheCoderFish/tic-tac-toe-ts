const board: HTMLDivElement = document.querySelector<HTMLDivElement>('.board') as HTMLDivElement;
const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function createBox(i: number): HTMLDivElement {
    const box: HTMLDivElement = document.createElement('td');
    box.classList.add('box');
    box.setAttribute('id', i.toString());
    box.addEventListener('click', clicked);
    return box;
}

function createBoard() {
    const table: HTMLTableElement = document.createElement('table');
    for (let i = 0; i < 3; i++) {
        const row: HTMLDivElement = document.createElement('tr');
        row.classList.add('row')
        for (let j = 0; j < 3; j++) {
            row.appendChild(createBox(j + (i * 3)));
        }
        table.appendChild(row);
    }
    board.appendChild(table);
}

function clicked(e: Event) {
    let box = e.target as HTMLDivElement;
    box.innerText = currentPlayer;
    let status = checkWin(currentPlayer);
    if (status?.hasWon) {
        console.log(`Player ${status.player} has Won`);

    } else {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
}

function checkWin(player: string) {
    const boxes = document.querySelectorAll<HTMLElement>('.box');
    const currentPlayerBoxes: number[] = [];
    boxes.forEach(box => {
        if (box.innerText === player) {
            currentPlayerBoxes.push(parseInt(box.id));
        }
    });
    for (let win of wins) {
        let hasWon = win.every(w => {
            return currentPlayerBoxes.indexOf(w) !== -1
        });
        if (hasWon) {
            return {
                hasWon: true,
                player
            }
        }
    }
}

function startGame() {
    createBoard();
    const boxes = document.querySelectorAll<HTMLElement>('.box');
    boxes.forEach((box: HTMLElement) => {
        box.innerText = '';
    })
}


const playerOne = 'X';
const playerTwo = 'O';
let currentPlayer = playerOne;

startGame();