const Aplicacao = require("./Aplicacao");
const Usuario = require("./Autenticacao/Usuario");
const ListaDeUsuarios = require("./Autenticacao/ListaDeUsuarios");
const ListaDeMovimentacoes = require("./Financeiro/ListaDeMovimentacoes");
const Movimentacao = require("./Financeiro//Movimentacao");

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
               const usuarioInicial = new Usuario("email@email.com", "senha", new ListaDeMovimentacoes());
               const app = new Aplicacao(new ListaDeUsuarios([usuarioInicial]), usuarioInicial);
               const usuarioCorrente = app.getUsuarioCorrente();
               expect(usuarioCorrente).toBe(usuarioInicial);
           });
       });

       describe("Quando o usuário é válido, mas não está na lista de usuários", () => {
           test("Deve lançar uma exceção", () => {
               expect(() => new Aplicacao(new ListaDeUsuarios(), new Usuario("email@email.com", "senha", new ListaDeMovimentacoes())))
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
                    pesquisar: () => new Usuario("usuario", "outra_senha", new ListaDeMovimentacoes())
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
                    pesquisar: () => new Usuario("usuario", "senha", new ListaDeMovimentacoes())
                });
                const app = new Aplicacao(lista);
                const consoleSpy = jest.spyOn(console, "log");
                app.login("usuario", "senha");
                expect(consoleSpy).toHaveBeenCalledWith("Login bem sucedido");
            });

            test("Deve alterar o usuario corrente", () => {
                const lista = new ListaDeUsuarios();
                const usuario = new Usuario("usuario", "senha", new ListaDeMovimentacoes());
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

    describe("Projeção", () => {
        describe("Quando a lista de movimentações do usuário é vazia", () => {
            test("Deve retornar um array onde todas os valores são 0", () => {
                const movimentacoes = new ListaDeMovimentacoes();
                const usuario = new Usuario("email@email.com", "senha", movimentacoes);
                const lista = new ListaDeUsuarios();
                Object.assign(lista, {
                    pesquisar: () => usuario
                });
                const app = new Aplicacao(lista, usuario);
                const projecao = app.projecao(3);
                expect(Array.isArray(projecao)).toBe(true);
                expect(projecao).toHaveLength(3);
                expect(projecao[0]).toBe(0);
                expect(projecao[1]).toBe(0);
                expect(projecao[2]).toBe(0);
            });
        });
        describe("Quando a lista de movimentações do usuário não é vazia", () => {
            test("Deve retornar um array onde cada elemento é a soma do anterior mais a média", () => {
                const movimentacoes = new ListaDeMovimentacoes();
                Object.assign(movimentacoes, {
                   getAll: () => [
                       new Movimentacao(10000, new Date()),
                       new Movimentacao(-5000, new Date())
                   ]
                });
                const usuario = new Usuario("email@email.com", "senha", movimentacoes);
                const lista = new ListaDeUsuarios();
                Object.assign(lista, {
                    pesquisar: () => usuario
                });
                const app = new Aplicacao(lista, usuario);
                const projecao = app.projecao(3);
                expect(Array.isArray(projecao)).toBe(true);
                expect(projecao).toHaveLength(3);
                expect(projecao[0]).toBe(5000);
                expect(projecao[1]).toBe(10000);
                expect(projecao[2]).toBe(15000);
            });
        });
    });
});