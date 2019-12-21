const board: HTMLDivElement = document.querySelector('.board') as HTMLDivElement;
const replayButton: HTMLButtonElement = document.querySelector('.replay') as HTMLButtonElement;
const body = document.querySelector('body');
const overlay: HTMLDivElement = document.querySelector('.overlay') as HTMLDivElement;;

const winConditions = [
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

function clicked(e: Event) {
    let box = e.target as HTMLDivElement;
    box.innerText = currentPlayer;
    let status = checkWin(currentPlayer);
    if (status?.hasWon) {
        const winMessage: HTMLDivElement = document.createElement('div');
        winMessage.classList.add('win');
        winMessage.innerText = `Player ${status.player} has Won`;
        body?.appendChild(winMessage);
        overlay.style.display = 'block';
        winMessage.appendChild(replayButton);
        replayButton.style.display = 'inline-block';

    } else {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
}

function createBoard(): void {
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



function checkWin(player: string) {
    const boxes = [...document.querySelectorAll('.box') as any];
    const currentPlayerBoxes: number[] = boxes.filter(box => box.innerText === player)
        .map(box => parseInt(box.id));

    for (let win of winConditions) {
        const hasWon = win.every(w => {
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
    });
    overlay.style.display = 'none';
    document.querySelector('.win')?.remove();
}


const playerOne = 'X';
const playerTwo = 'O';
let currentPlayer = playerOne;

startGame();