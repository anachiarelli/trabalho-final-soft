const ListaDeUsuarios = require("./ListaDeUsuarios");
const Usuario = require("./Usuario");
const ListaDeMovimentacoes = require("../Financeiro/ListaDeMovimentacoes");

describe("ListaDeUsuarios", () => {
    describe("Construtor", () => {
        describe("Passando um array de usuários", () => {
            test("Deve lançar uma exceção caso algum elemento do array não seja um usuário", () => {
                expect(() => new ListaDeUsuarios(["string"]))
                    .toThrow("A lista deve conter apenas usuários.");
            });
            test("Deve aceitar array vazio", () => {
                expect(() => new ListaDeUsuarios([])).not.toThrow();
            });
        });

        describe("Construindo sem parâmetros", () => {
            test("Deve aceitar construtor vazio", () => {
                expect(() => new ListaDeUsuarios()).not.toThrow();
            });
        });
    });

    describe("Pesquisa", () => {
        describe("Quando o usuário não existe", () => {
            test("Deve retornar undefined", () => {
                const lista = new ListaDeUsuarios();
                const usuario = lista.pesquisar("email@email.com");
                expect(usuario).toBeUndefined();
            });
        });

        describe("Quando o usuário existe", () => {
            test("Deve retornar o usuário", () => {
                const lista = new ListaDeUsuarios([
                    new Usuario("email@email.com", "senha", new ListaDeMovimentacoes()),
                ]);
                const usuario = lista.pesquisar("email@email.com");
                expect(usuario).toBeInstanceOf(Usuario);
            });
        });
    });
});