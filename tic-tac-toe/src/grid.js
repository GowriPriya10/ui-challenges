import checkWinningStatus from "./controller";

export default class Grid {

    options = ['X', 'O'];

    constructor(grid){
        this.turns = 0;
        this.currentPlayer = 0;
        this.grid = grid;
        this.constructGrid();
    }

    constructGrid(){
        const gridCell = document.getElementById('grid-cell');
        for(let i=0; i<9; i++){
            const cell = gridCell.content.cloneNode(true);
            cell.querySelector('.cell').id = `cell-${i+1}`;
            this.grid.appendChild(cell);
        }
    }

    addListener(grid, store, reset){
        grid.addEventListener('click', (e) => {
            
            /**
             * 1. Update store with value
             * 2. Check if value already existing in that cell
             * 2. If no, Update store & UI else do nothing
             * 3. If turns >= 5, check is any player won
             * 4. If yes, show alert and reset
             * 5. If turns = 9, stop the game and reset
             * 5. Else update current player and continue...
             */

            const cellNo = e.target.id.split('-')[1];
            const isExisting = store.getValue(cellNo);
        
            if(!isExisting){
                this.turns++;
                const value = this.options[this.currentPlayer];
                store.setValue(cellNo, value);
                
                const cell = document.getElementById(e.target.id);
                cell.appendChild(document.createTextNode(value));
                // cell.insertAdjacentHTML('afterbegin',value);
                cell.style = 'cursor: not-allowed';

                if(this.turns >= 5 && checkWinningStatus(value, store.getStore())){
                    setTimeout(() => {
                        alert(`Player ${this.currentPlayer+1} - Won!!!`);
                        reset();
                    }, 500);
                    return;
                }

                if(this.turns === 9) {
                    setTimeout(() => {
                        alert(`It's a draw!!!`);
                        reset();
                    }, 2);
                    return;
                }
                
                this.updateCurrentPlayer();
            }
        })
    }

    resetGrid(){
        this.grid.replaceChildren();
        this.turns = 0;
        this.currentPlayer = 0;
        this.updateCurrentPlayer();
        this.constructGrid();
    }

    updateCurrentPlayer() {
        if(this.turns > 0) {
            document.querySelector(`#player${this.currentPlayer+1}`).classList.remove('currentPlayer');
            this.currentPlayer = Math.abs(this.currentPlayer - 1);
            document.querySelector(`#player${this.currentPlayer+1}`).classList.add('currentPlayer');
        }
        else {
            document.querySelector('#player1').classList.add('currentPlayer');
            document.querySelector('#player2').classList.remove('currentPlayer');
        }
    }
}