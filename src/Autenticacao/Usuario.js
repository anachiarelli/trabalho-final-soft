const ListaDeMovimentacoes = require("../Financeiro/ListaDeMovimentacoes");
const Movimentacao = require("../Financeiro/Movimentacao");
module.exports = class Usuario {
    /**
     *
     * @param {string} email
     * @param {string} senha
     * @param {ListaDeMovimentacoes} movimentacoes
     */
    constructor(email, senha, movimentacoes) {
        if (!(movimentacoes instanceof ListaDeMovimentacoes)) {
            throw new Error("Usuário depende de uma instância da classe ListaDeMovimentações");
        }
        this.email = email;
        this.senha = senha;
        this.movimentacoes = movimentacoes;
    }

    addMovimentacao(movimentacao) {
        this.movimentacoes.addMovimentacao(movimentacao);
    }
}