const Movimentacao = require("./Movimentacao");
module.exports = class ListaDeMovimentacoes {
    /**
     *
     * @param {Movimentacao[]} [movimentacoes]
     */
    constructor(movimentacoes) {
        if (movimentacoes !== undefined) {
            for (let movimentacao of movimentacoes) {
                if (!(movimentacao instanceof Movimentacao)) {
                    throw new Error("A lista deve conter apenas movimentações.")
                }
            }
        }
        this.movimentacoes = movimentacoes ?? [];
    }

    getAll() {
        return this.movimentacoes;
    }

    addMovimentacao(movimentacao) {
        if (!(movimentacao instanceof Movimentacao)) {
            throw new Error("Movimentação inválida");
        }
        this.movimentacoes.push(movimentacao);
    }

}