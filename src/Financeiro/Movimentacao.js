module.exports = class Movimentacao {
    /**
     *
     * @param {number} valor
     * @param {date} data
     * @param {string} [descricao]
     */
    constructor(valor, data, descricao) {
        if (isNaN(valor)) {
            throw new Error("Valor inválido");
        }

        if (!(data instanceof Date)) {
            throw new Error("Data inválida");
        }

        if (!(descricao instanceof String) && descricao !== undefined) {
            throw new Error("Descrição inválida");
        }

        this.valor = valor;
        this.data = data;
        this.descricao = descricao;
    }
}