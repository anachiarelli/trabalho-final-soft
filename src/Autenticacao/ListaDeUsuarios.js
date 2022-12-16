const Usuario = require("./Usuario");

module.exports = class ListaDeUsuarios {
    /**
     *
     * @param {Usuario[]} [usuarios]
     */
    constructor(usuarios) {
        if (usuarios !== undefined) {
            for (let usuario of usuarios) {
                if (!(usuario instanceof Usuario)) {
                    throw new Error("A lista deve conter apenas usuários.");
                }
            }
            this.usuarios = usuarios;
        }
    }

    /**
     *
     * @param {string} email
     */
    pesquisar(email) {
        for (let usuario of this.usuarios ?? []) {
            if (usuario.email === email) {
                return usuario;
            }
        }
        return undefined;
    }
}