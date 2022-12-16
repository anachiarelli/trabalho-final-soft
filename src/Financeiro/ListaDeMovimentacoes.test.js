const ListaDeMovimentacoes = require("./ListaDeMovimentacoes");
const Movimentacao = require("./Movimentacao");
describe("ListaDeMovimentacoes", () => {
    describe("Construtor", () => {
        describe("Passando um array de movimentações", () => {
            test("Deve lançar uma exceção caso algum elemento do array não seja uma movimentação", () => {
                expect(() => new ListaDeMovimentacoes(["string"]))
                    .toThrow("A lista deve conter apenas movimentações.");
            });
            test("Deve aceitar array vazio", () => {
                expect(() => new ListaDeMovimentacoes([])).not.toThrow();
            });
        });

        describe("Construindo sem parâmetros", () => {
            test("Deve aceitar construtor vazio", () => {
                expect(() => new ListaDeMovimentacoes()).not.toThrow();
            });
        });
    });

    describe("Add Movimentação", () => {
        describe("Quando movimentação for inválida", () => {
           test("Deve lançar uma exceção", () => {
               const lista = new ListaDeMovimentacoes();
              expect(() => lista.addMovimentacao("string"))
                  .toThrow("Movimentação inválida");
           });
        });

        describe("Quando movimentação for válida", () => {
            test("Deve adicionar a movimentação na lista de movimentações", () => {
                const movimentacoes = [];
                const lista = new ListaDeMovimentacoes(movimentacoes);
                const movimentacao = new Movimentacao(100.00, new Date());
                const addSpy = jest.spyOn(movimentacoes, "push");
                lista.addMovimentacao(movimentacao);
                expect(addSpy).toBeCalledWith(movimentacao);
                expect(addSpy).toHaveBeenCalledTimes(1);
            });
        });
    });
});