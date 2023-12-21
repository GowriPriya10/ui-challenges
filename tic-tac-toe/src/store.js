export default class Store {
    constructor() {
        this.store = Array(3).fill(null).map(e => Array(3).fill(null));
    }

    getValue(cell) {
        const i = cell <= 3 ? 0 : cell <= 6 ? 1 : 2;
        const j = (cell - 1) % 3;
        return this.store[i][j];
    }
    
    setValue(cellNo, value) {
        const i = cellNo <= 3 ? 0 : cellNo <= 6 ? 1 : 2;
        const j = (cellNo - 1) % 3;
        this.store[i][j] = value;
    }

    resetStore() {
        this.store = Array(3).fill(null).map(e => Array(3).fill(null));
    }

    getStore() {
        return this.store;
    }
}