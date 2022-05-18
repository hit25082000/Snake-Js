var body = document.querySelector("body")
let table = document.createElement("table")
var matriz = [[]]
var direcao = ""
let xSnake = 5
let ySnake = 5
let snake = []
var comida = () => { return Math.floor(Math.random() * 10); }
var pedra = () => { return Math.floor(Math.random() * 10); }

const map = {
    Comidas(quantidadeComidas) {
        for (let i = 0; i < quantidadeComidas; i++) {
            let xComida = comida()
            let yComida = comida()

            if (matriz[xComida][yComida] == undefined)
                matriz[xComida][yComida] = `<img width="32px" src="images/icons8-animal-de-rato-24.png">`
            else
                i--
        }
    },

    Pedras(quantidadePedras) {
        for (let i = 0; i < quantidadePedras; i++) {

            let xPedra = pedra()
            let yPedra = pedra()

            if (matriz[xPedra][yPedra] == undefined)
                matriz[xPedra][yPedra] = `<img src="images/icons8-rocha-32.png">`
            else
                i--
        }
    },

    Mapa() {
        table.style.textAlign = "center"
        table.style.width = "100%"
        table.style.height = "100%"
        body.style.height = "95vh"
        body.style.margin = "none"
        body.append(table)

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
    },

    areaMatriz(comprimentoMatriz) {
        for (let index = 0; index < comprimentoMatriz; index++) {
            matriz[index] = new Array(comprimentoMatriz)
        }
    }
}

function atualizarCoordenadas(direcao) {
    snake.push([ySnake, xSnake])

    if (direcao) {
        if (matriz[ySnake][xSnake] == `<img width="32px" src="images/icons8-animal-de-rato-24.png">`)
            snake[0].unshift(snake[0][0], snake[0][1]), map.Comidas(1)
        else if (matriz[ySnake][xSnake] == `<img src="images/icons8-rocha-32.png">`)
            matriz[snake[0][0]][snake[0][1]] = ``, snake.shift(), matriz[snake[0][0]][snake[0][1]] = ``, snake.shift()
        else if (matriz[ySnake][xSnake] == `<img width="32px" src="images/icons8-snake-64.png">`)
            matriz[snake[0][0]][snake[0][1]] = ``, snake.shift(), matriz[snake[0][0]][snake[0][1]] = ``, snake.shift()
        else
            matriz[snake[0][0]][snake[0][1]] = ``, snake.shift()
    }

    console.log(snake)
    matriz[ySnake][xSnake] = `<img width="32px" src="images/icons8-snake-64.png">`
    table.innerHTML = ""

    map.Mapa()
}



document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp" && direcao != "baixo")
        direcao = "cima", ySnake--, atualizarCoordenadas(direcao)
    if (event.key == "ArrowDown" && direcao != "cima")
        direcao = "baixo", ySnake++, atualizarCoordenadas(direcao)
    if (event.key == "ArrowLeft" && direcao != "direita")
        direcao = "esquerda", xSnake--, atualizarCoordenadas(direcao)
    if (event.key == "ArrowRight" && direcao != "esquerda")
        direcao = "direita", xSnake++, atualizarCoordenadas(direcao)
})

const App = {
    init() {
        map.areaMatriz(10)
        map.Pedras(10)
        map.Comidas(15)
        matriz[xSnake][ySnake] = `<img width="32px" src="images/icons8-snake-64.png">`
        map.Mapa()
        atualizarCoordenadas(direcao)
    }
}

App.init()