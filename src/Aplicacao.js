const ListaDeUsuarios = require("./Autenticacao/ListaDeUsuarios");
const Usuario = require("./Autenticacao/Usuario");
module.exports = class Aplicacao {
    /**
     *
     * @param {ListaDeUsuarios} usuarios
     * @param {Usuario} [usuario]
     */
    constructor(usuarios, usuario) {
        if (!(usuarios instanceof ListaDeUsuarios)) {
            throw new Error("Aplicação depende de uma instância da classe ListaDeUsuarios");
        }

        if (!(usuario instanceof Usuario) && usuario !== undefined) {
            throw new Error("Usuário inválido");
        }

        if (usuario instanceof Usuario) {
            const usuarioDaAplicacao = usuarios.pesquisar(usuario.email);
            if (usuarioDaAplicacao !== usuario) {
                throw new Error("Usuário inexistente");
            }
        }
        this.usuarios = usuarios;
        this.usuarioCorrente = usuario;
    }

    getUsuarioCorrente() {
        return this.usuarioCorrente;
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

        this.usuarioCorrente = usuario;
        console.log("Login bem sucedido");
    }

}