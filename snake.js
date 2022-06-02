var body = document.querySelector("body")
let table = document.createElement("table")
var matriz = [[]]
var direcao = " "
let xSnake = 5
let ySnake = 5
let contagemComida = 0;
let comidasComidas = 0;
let snake = []
let direcionado = 0;
let direcaoAnterior;
let rato = `<img width="32px" src="images/icons8-animal-de-rato-24.png">`
let rocha = `<img src="images/icons8-rocha-32.png">`
let corpoCobra = `<img width="32px" src="images/icons8-snake-64.png">`
let vazio = `&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`
var random = () => { return Math.floor(Math.random() * 10); }

let randomDirect = random()

if (randomDirect <= 2)
    direcao = "cima"
else if (randomDirect <= 5)
    direcao = "baixo"
else if (randomDirect <= 7)
    direcao = "esquerda"
else if (randomDirect <= 9)
    direcao = "direita"

const map = {
    Comidas(quantidadeComidas) {
        for (let i = 0; i < quantidadeComidas; i++) {
            let xComida = random()
            let yComida = random()

            if (matriz[xComida][yComida] == undefined)
                matriz[xComida][yComida] = rato
            else
                i--
        }
    },

    Pedras(quantidadePedras) {
        for (let i = 0; i < quantidadePedras; i++) {

            let xPedra = random()
            let yPedra = random()

            if (matriz[xPedra][yPedra] == undefined)
                matriz[xPedra][yPedra] = rocha
            else
                i--
        }
    },

    Cobra(tamanhoCobra) {
        if (direcao == "direita" || direcao == "cima") {
            for (let i = 0; i < tamanhoCobra; i++) {
                matriz[ySnake + i][xSnake] = corpoCobra
                snake.unshift([ySnake + i, xSnake])
            }
        } else {
            for (let i = 0; i < tamanhoCobra; i++) {
                matriz[ySnake][xSnake + i] = corpoCobra
                snake.unshift([ySnake, xSnake + i])
            }
        }
    },

    Mapa() {
        table.style.textAlign = "center"
        table.style.width = "100% "
        table.style.height = "100% "
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
                    td.innerHTML = vazio

                if (td.innerHTML == corpoCobra)
                    td.style.backgroundColor = "DarkGreen"

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

function utrapassouLimite() {
    if (ySnake < 0) ySnake = 9
    if (ySnake > 9) ySnake = 0
    if (xSnake < 0) xSnake = 9
    if (xSnake > 9) xSnake = 0
}

function atravessouRabo() {
    if (matriz[ySnake][xSnake] == corpoCobra) {
    }
}

function gameover() {
    if (snake.length == 0)
        alert("Game Over"), window.location.href = window.location.href
    if (comidasComidas == 15)
        alert("Ganhou"), window.location.href = window.location.href
    if (matriz[ySnake][xSnake] == corpoCobra)
        alert("Game Over"), window.location.href = window.location.href
}

function atualizarCoordenadas() {

    utrapassouLimite(ySnake, xSnake)


    snake.push([ySnake, xSnake])

    if (matriz[ySnake][xSnake] == rato) {
        comidasComidas++
        contagemComida++
        matriz[snake[0][0]][snake[0][1]] = vazio, snake.shift()
    }
    else if (contagemComida == 3) {
        snake[0].unshift(snake[0][0], snake[0][1])
        contagemComida = 0
    }
    else if (matriz[ySnake][xSnake] == rocha) {
        matriz[snake[0][0]][snake[0][1]] = vazio, snake.shift()
        matriz[snake[0][0]][snake[0][1]] = vazio, snake.shift()
    }
    else
        matriz[snake[0][0]][snake[0][1]] = vazio, snake.shift()

    gameover()

    matriz[ySnake][xSnake] = corpoCobra
    table.innerHTML = " "
    map.Mapa()
}

var s = 1;
var m = 0;
window.onload = alert("voçe tem 1 minutos")
intervalo = window.setInterval(function () {
    let tempoHtml = document.querySelector(".tempo")
    if (s == 60) { m++; s = 0; }
    s++;
    if (m == 1) window.location.href = window.location.href, alert("Acabou o tempo")
    tempoHtml.style.position = "absolute"
    tempoHtml.innerHTML = `Tempo : ${m}:${s} `
}, 1000);

setInterval(() => {
    if (direcao == "cima")
        ySnake--, atualizarCoordenadas(direcao)

    if (direcao == "baixo")
        ySnake++, atualizarCoordenadas(direcao)

    if (direcao == "esquerda")
        xSnake--, atualizarCoordenadas(direcao)

    if (direcao == "direita")
        xSnake++, atualizarCoordenadas(direcao)
    direcionado = 0

}, 300);

document.addEventListener("keydown", (event) => {
    if (direcionado == 0) {
        direcaoAnterior = direcao
        if (event.key == "ArrowUp" && direcao != "baixo")
            direcao = "cima", direcionado = 1

        if (event.key == "ArrowDown" && direcao != "cima")
            direcao = "baixo", direcionado = 1

        if (event.key == "ArrowLeft" && direcao != "direita")
            direcao = "esquerda", direcionado = 1

        if (event.key == "ArrowRight" && direcao != "esquerda")
            direcao = "direita", direcionado = 1
    }
})

const App = {
    init() {
        map.areaMatriz(10)
        map.Cobra(5)
        map.Pedras(10)
        map.Comidas(15)
        map.Mapa()
    },
}

App.init()

