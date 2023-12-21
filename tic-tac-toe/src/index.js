import '../style.css';
import Grid from './grid';
import Store from './store';

const grid = document.getElementById('grid');

const store = new Store();
const gridLayout = new Grid(grid);
gridLayout.addListener(grid, store, reset);

function reset() {
    store.resetStore();
    gridLayout.resetGrid();
}

document.getElementById('reset').addEventListener('click', reset);
