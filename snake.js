var body = document.querySelector("body")
var matriz = [[]]
var direcao = ""
var comprimentoMatriz = 10
var quantidadeComidas = 15
var quantidadePedras = 10
let xSnake = 5
let ySnake = 5
let snake = []
var comida = () => { return Math.floor(Math.random() * 10); }
var pedra = () => { return Math.floor(Math.random() * 10); }
let table = document.createElement("table")
areaMatriz()

function mapearElementos() {
    matriz[xSnake][ySnake] = `<img width="32px" src="icons8-snake-64.png">`
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
            matriz[xComida][yComida] = `<img width="32px" src="icons8-animal-de-rato-24.png">`
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
    atualizarCoordenadas()
}

function atualizarCoordenadas(direcao) {
    snake.push([ySnake, xSnake])
    console.log(snake)

    if (matriz[ySnake][xSnake] == `<img width="32px" src="icons8-animal-de-rato-24.png">`)
        snake[0].unshift(snake[0][0], snake[0][1])
    else if (matriz[ySnake][xSnake] == `<img src="icons8-rocha-32.png">`)
        matriz[snake[0][0]][snake[0][1]] = ``, snake.shift()
    else
        matriz[snake[0][0]][snake[0][1]] = ``

    matriz[ySnake][xSnake] = `<img width="32px" src="icons8-snake-64.png">`
    table.innerHTML = ""

    for (let x = 0; x < matriz.length; x++) {
        let tr = document.createElement("tr")
        table.appendChild(tr)

        for (let y = 0; y < matriz.length; y++) {
            let td = document.createElement("td")

            if (matriz[x][y] != undefined)
                td.innerHTML = matriz[x][y]

            else if (matriz[x][y] == undefined)
                td.innerHTML = `&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`

            td.style.height = "50px"
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
        direcao = "cima", ySnake--, atualizarCoordenadas(direcao), snake.shift()
    if (event.key == "ArrowDown" && direcao != "cima")
        direcao = "baixo", ySnake++, atualizarCoordenadas(direcao), snake.shift()
    if (event.key == "ArrowLeft" && direcao != "direita")
        direcao = "esquerda", xSnake--, atualizarCoordenadas(direcao), snake.shift()
    if (event.key == "ArrowRight" && direcao != "esquerda")
        direcao = "direita", xSnake++, atualizarCoordenadas(direcao), snake.shift()
})

mapearElementos()