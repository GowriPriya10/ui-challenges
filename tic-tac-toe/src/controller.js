export default function checkWinningStatus(currentValue, store) {
    /**
     * For a Player to win the game any one of the following 3 should satisfy
     * 1. In any of the 3 rows, all col values should be of currentValue
     * 2. In any of the 3 cols, all row values should be of currentValue
     * 3. In any of the 2 diag, all diag cell values should be of currentValue
     */

    let col = 0;
    for(let row of store) {
        if(row.every(ele => ele === currentValue)) return true
        if([store[0][col], store[1][col], store[2][col]].every(ele => ele === currentValue)) return true
        col++;
    }

    const diag = [store[0][0], store[1][1], store[2][2]].every(ele => ele === currentValue) || 
                    [store[0][2], store[1][1], store[2][0]].every(ele => ele === currentValue)
    return diag;
}