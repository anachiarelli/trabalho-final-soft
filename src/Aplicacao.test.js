const Aplicacao = require("./Aplicacao");
const Usuario = require("./Autenticacao/Usuario");
const ListaDeUsuarios = require("./Autenticacao/ListaDeUsuarios");

describe("Aplicacao", () => {
    describe("Construtor", () => {
       describe("Quando a lista de usuários for inválida", () => {
          test("Deve lançar uma exceção", () => {
             expect(() => new Aplicacao([]))
                 .toThrow("Aplicação depende de uma instância da classe ListaDeUsuarios");
          });
       });
    });
    describe("Login", () => {
        describe("Quando usuário não existe", () => {
            test("Deve mostrar um erro dizendo que o usuário não foi encontrado", () => {
                const app = new Aplicacao(new ListaDeUsuarios());
                const consoleSpy = jest.spyOn(console, "error");
                app.login("usuario", "senha");
                expect(consoleSpy).toHaveBeenCalledWith("Usuário não encontrado");
            });
        });

        describe("Quando a senha está incorreta", () => {
            test("Deve mostrar um erro dizendo que a senha está incorreta", () => {
                const lista = new ListaDeUsuarios();
                Object.assign(lista, {
                    pesquisar: () => new Usuario("usuario", "outra_senha")
                });
                const app = new Aplicacao(lista);
                const consoleSpy = jest.spyOn(console, "error");
                app.login("usuario", "senha");
                expect(consoleSpy).toHaveBeenCalledWith("Senha incorreta");
            });
        });

        describe("Quando usuário e senha estão corretos", () => {
            test("Deve mostrar uma mensagem de login bem sucedido", () => {
                const lista = new ListaDeUsuarios();
                Object.assign(lista, {
                    pesquisar: () => new Usuario("usuario", "senha")
                });
                const app = new Aplicacao(lista);
                const consoleSpy = jest.spyOn(console, "log");
                app.login("usuario", "senha");
                expect(consoleSpy).toHaveBeenCalledWith("Login bem sucedido");
            });
        });
    });
});