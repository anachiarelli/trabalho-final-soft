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

    projecao(quantidadeDeMeses) {
        let dataInicio = null;
        let dataFim = null;
        const movimentacoes = this.usuarioCorrente.movimentacoes;
        let soma = 0;
        for (let movimentacao of movimentacoes.getAll()) {
            if (dataInicio === null || dataInicio > movimentacao.data) {
                dataInicio = movimentacao.data;
            }

            if (dataInicio === null || dataFim < movimentacao.data) {
                dataFim = movimentacao.data;
            }
            soma += movimentacao.valor;
        }
        let count;
        if (dataFim == null || dataInicio == null) {
            count = 0;
        } else {
            count = monthDiff(dataFim, dataInicio);
        }
        const media = count ? (soma / count) : 0;
        const projecao = [media];
        for (let i = 1; i < quantidadeDeMeses; i++) {
            projecao.push(media+projecao[i-1]);
        }
        return projecao;
    }
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return (months <= 0 ? 0 : months) +1;
}
