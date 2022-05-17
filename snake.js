var body = document.querySelector("body")
var matriz = [[]]
var direcao = ""
var comprimentoMatriz = 10
var quantidadeComidas = 15
var quantidadePedras = 10
var comida = () => { return Math.floor(Math.random() * 10); }
var pedra = () => { return Math.floor(Math.random() * 10); }

function mapearElementos() {
    areaMatriz()
    snake()
    let table = document.createElement("table")
    table.style.textAlign = "center"
    table.style.width = "100%"
    table.style.height = "100%"
    body.style.height = "95vh"
    body.style.margin = "none"
    body.append(table)

    for (let i = 0; i < quantidadeComidas; i++) {

        let xComida = comida()
        let yComida = comida()

        if (matriz[xComida][yComida] == undefined)
            matriz[xComida][yComida] = `<img src="icons8-animal-de-rato-24.png">`
        else
            i--
    }

    for (let i = 0; i < quantidadePedras; i++) {

        let xPedra = pedra()
        let yPedra = pedra()

        if (matriz[xPedra][yPedra] == undefined)
            matriz[xPedra][yPedra] = `<img src="icons8-rocha-32.png">`
        else
            i--
    }

    for (let x = 0; x < matriz.length; x++) {
        let tr = document.createElement("tr")
        table.appendChild(tr)

        for (let y = 0; y < matriz.length; y++) {
            let td = document.createElement("td")
            if (matriz[x][y] != undefined)
                td.innerHTML = matriz[x][y]
            else if (matriz[x][y] == undefined)
                td.innerHTML = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
            tr.appendChild(td)
        }
    }
}

function areaMatriz() {
    for (let index = 0; index < comprimentoMatriz; index++) {
        matriz[index] = new Array(comprimentoMatriz)
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp" && direcao != "baixo")
        direcao = "cima", console.log(direcao)
    if (event.key == "ArrowDown" && direcao != "cima")
        direcao = "baixo", console.log(direcao)
    if (event.key == "ArrowLeft" && direcao != "direita")
        direcao = "esquerda", console.log(direcao)
    if (event.key == "ArrowRight" && direcao != "esquerda")
        direcao = "direita", console.log(direcao)
})

function snake() {
    matriz[matriz.length / 2][matriz.length / 2] = `<img width="30px" src="icons8-snake-64.png">`
    for (let i = 1; i <= matriz.length; i++) {

    }
}

mapearElementos()