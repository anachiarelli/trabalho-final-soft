const Movimentacao = require("./Movimentacao");

describe("Movimentacao", () => {
    describe("Construtor", () => {
       describe("Quando o valor não é um número", () => {
          test("Deve lançar uma exceção", () => {
             expect(() => new Movimentacao(NaN, new Date()))
                 .toThrow("Valor inválido");
          });
       });

       describe("Quando a data não é do formato Date", () => {
           test("Deve lançar uma exceção", () => {
               expect(() => new Movimentacao(100.00, "14/12/2022"))
                   .toThrow("Data inválida");
           });
       });

        describe("Quando a descrição não é uma string", () => {
            test("Deve lançar uma exceção", () => {
                expect(() => new Movimentacao(100.00, new Date(), 1234))
                    .toThrow("Descrição inválida");
            });
        });

        describe("Quando a descrição é indefinida", () => {
            test("Deve aceitar descrição indefinida", () => {
                expect(() => new Movimentacao(100.00, new Date()))
                    .not.toThrow();
            });
        });

    });

});