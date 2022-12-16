const ListaDeUsuarios = require("./Autenticacao/ListaDeUsuarios");
module.exports = class Aplicacao {
    constructor(usuarios) {
        if (!(usuarios instanceof ListaDeUsuarios)) {
            throw new Error("Aplicação depende de uma instância da classe ListaDeUsuarios");
        }
        this.usuarios = usuarios;
    }

    /**
     *
     * @param {string} email
     * @param {string} senha
     */
    login(email, senha) {
        const usuario = this.usuarios.pesquisar(email);
        if (usuario === undefined) {
            console.error("Usuário não encontrado");
            return;
        }

        if(usuario.senha !== senha) {
            console.error("Senha incorreta");
            return;
        }

        console.log("Login bem sucedido");
    }

}