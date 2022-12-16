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

       describe("Quando usuário é inválido", () => {
          test("Deve lançar uma exceção", () => {
              expect(() => new Aplicacao(new ListaDeUsuarios(), "nomeDoUsuario"))
                  .toThrow("Usuário inválido");
          });
       });

       test("Deve aceitar usuário indefinido", () => {
           expect(() => new Aplicacao(new ListaDeUsuarios()))
               .not.toThrow();
       });

       describe("Quando o usuário não é definido", () => {
          test("Não deve haver um usuário corrente", () => {
              const app = new Aplicacao(new ListaDeUsuarios([]));
              const usuarioCorrente = app.getUsuarioCorrente();
              expect(usuarioCorrente).toBe(undefined);
          });
       });

       describe("Quando o usuário é válido", () => {
           test("Deve definir o usuário corrente como o usuário passado por parâmetro", () => {
               const usuarioInicial = new Usuario("email@email.com", "senha");
               const app = new Aplicacao(new ListaDeUsuarios([usuarioInicial]), usuarioInicial);
               const usuarioCorrente = app.getUsuarioCorrente();
               expect(usuarioCorrente).toBe(usuarioInicial);
           });
       });

       describe("Quando o usuário é válido, mas não está na lista de usuários", () => {
           test("Deve lançar uma exceção", () => {
               expect(() => new Aplicacao(new ListaDeUsuarios(), new Usuario("email@email.com", "senha")))
                   .toThrow("Usuário inexistente");
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

            test("Deve alterar o usuario corrente", () => {
                const lista = new ListaDeUsuarios();
                const usuario = new Usuario("usuario", "senha");
                Object.assign(lista, {
                    pesquisar: () => usuario
                });
                const app = new Aplicacao(lista);
                app.login("usuario", "senha");
                const usuarioCorrente = app.getUsuarioCorrente();
                expect(usuarioCorrente).toBe(usuario);
            });
        });
    });
});