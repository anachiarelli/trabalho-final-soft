const Usuario = require("./Usuario");
const ListaDeMovimentacoes = require("../Financeiro/ListaDeMovimentacoes");
const Movimentacao = require("../Financeiro/Movimentacao");

describe("Usuario", () => {
    describe("Construtor", () => {
       describe("Quando a lista de movimentações for inválida", () => {
          test("Deve lançar uma exceção", () => {
             expect(() => new Usuario("email@email.com", "senha", []))
              .toThrow("Usuário depende de uma instância da classe ListaDeMovimentações");
          });
       });
    });

    describe("AddMovimentação", () => {
        describe("Quando a movimentação é válida", () => {
            test("Deve adicionar a movimentação na lista", () => {
                const lista = new ListaDeMovimentacoes();
                const movimentacao = new Movimentacao(100.00, new Date());
                const addSpy = jest.spyOn(lista, "addMovimentacao");
                const usuario = new Usuario("email@email.com", "senha", lista);
                usuario.addMovimentacao(movimentacao);
                expect(addSpy).toBeCalledWith(movimentacao);
                expect(addSpy).toBeCalledTimes(1);
            });
        });
    });
});