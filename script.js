'use strict'

const buscarBtn = document.getElementById('buscarBtn')

async function buscarImagens() {
    const racaInput = document.getElementById('racaInput')
    const raca = racaInput.value.trim().toLowerCase()

    const url = `https://dog.ceo/api/breed/${raca}/images/random/10`
    const resposta = await fetch(url)
    const dados = await resposta.json()

    // se a raça não existir, a API não devolve "success"
    if (dados.status !== 'success') {
        return []
    }

    return dados.message // lista com as URLs das imagens
}

function criarCard(imagem) {
    const card = document.createElement('div')
    card.classList.add('card')
    const foto = document.createElement('img')
    foto.src = imagem
    card.appendChild(foto)

    return card
}

async function preencherGaleria() {
    const galeria = document.getElementById('galeria-container')
    const mensagem = document.getElementById('mensagem')

    const imagens = await buscarImagens()

    if (imagens.length === 0) {
        mensagem.textContent = 'Raça não encontrada. Tente em inglês (ex: hound, pug).'
        galeria.replaceChildren()
        return
    }

    mensagem.textContent = ''
    const cards = imagens.map(criarCard)

    galeria.replaceChildren(...cards)
}

buscarBtn.onclick = preencherGaleria