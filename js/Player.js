class Player {

    constructor(name, symbol, wins=0, cells=[], color='white') {
        this.name = name
        this.symbol = symbol
        this.wins = wins
        this.cells = cells
        this.color = color
    }
}

export { Player }