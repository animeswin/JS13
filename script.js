document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioCadastro")
    const mensagemSucesso = document.getElementById("mensagemSucesso")

    const exibirErro = (campo, mensagem) => {
        const elementoErro = document.getElementById(`erro${campo}`)
        elementoErro.textContent = mensagem
    }

    const limparErros = () => {
        document.querySelectorAll(".erro").forEach(erro => (erro.textContent = ""))
        mensagemSucesso.textContent = ""
    }

    const validarDados = () => {
        const nome = document.getElementById("nome").value.trim()
        const usuario = document.getElementById("usuario").value.trim()
        const senha = document.getElementById("senha").value.trim()
        const email = document.getElementById("email").value.trim()
        const idade = parseInt(document.getElementById("idade").value.trim())

        if (!nome) throw { campo: "Nome", mensagem: "O nome é obrigatório." }
        if (!usuario) throw { campo: "Usuario", mensagem: "O usuário é obrigatório." }
        if (!senha || senha.length < 6) throw { campo: "Senha", mensagem: "A senha deve ter pelo menos 6 caracteres." }
        if (!email || !/\S+@\S+\.\S+/.test(email)) throw { campo: "Email", mensagem: "Insira um e-mail válido." }
        if (isNaN(idade) || idade < 18) throw { campo: "Idade", mensagem: "A idade deve ser maior ou igual a 18." }

        return { nome, usuario, senha, email, idade }
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault()
        limparErros()

        try {
            const dadosValidados = validarDados()
            mensagemSucesso.textContent = "Cadastro realizado com sucesso!"
            console.log("Dados cadastrados:", dadosValidados)
            formulario.reset()
        } catch (erro) {
            if (erro.campo && erro.mensagem) {
                exibirErro(erro.campo, erro.mensagem)
            } else {
                console.error("Erro inesperado:", erro)
            }
        }
    })
})