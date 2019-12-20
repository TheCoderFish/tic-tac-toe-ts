const board: HTMLDivElement = document.querySelector<HTMLDivElement>('.board') as HTMLDivElement;

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
    console.log(`${box.id}`);
}

createBoard();
