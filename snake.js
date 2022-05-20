var body = document.querySelector("body")
let table = document.createElement("table")
var matriz = [[]]
var direcao = ""
let xSnake = 5
let ySnake = 5
let contagemComida = 0;
let comidasComidas = 0;
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

    Cobra(tamanhoCobra) {
        for (let i = 0; i < tamanhoCobra; i++) {
            matriz[ySnake][xSnake + i] = `<img width="32px" src="images/icons8-snake-64.png">`
            snake.unshift([ySnake, xSnake + i])
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
    if (ySnake < 0) ySnake = 9
    if (ySnake > 9) ySnake = 0
    if (xSnake < 0) xSnake = 9
    if (xSnake > 9) xSnake = 0

    snake.push([ySnake, xSnake])

    if (direcao) {
        if (contagemComida == 3)
            snake[0].unshift(snake[0][0], snake[0][1]), contagemComida = 0
        else if (matriz[ySnake][xSnake] == `<img width="32px" src="images/icons8-animal-de-rato-24.png">`)
            contagemComida++, comidasComidas++, matriz[snake[0][0]][snake[0][1]] = `&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`, snake.shift()
        else if (matriz[ySnake][xSnake] == `<img src="images/icons8-rocha-32.png">`)
            matriz[snake[0][0]][snake[0][1]] = `&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`, snake.shift(), matriz[snake[0][0]][snake[0][1]] = `&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`, snake.shift()
        else
            matriz[snake[0][0]][snake[0][1]] = `&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`, snake.shift()
    }

    if (snake.length == 0)
        alert("Game Over"), window.location.href = window.location.href
    if (comidasComidas == 14)
        alert("Ganhou"), window.location.href = window.location.href

    matriz[ySnake][xSnake] = `<img width="32px" src="images/icons8-snake-64.png">`
    table.innerHTML = ""

    map.Mapa()
}

setInterval(() => {
    if (direcao == "cima")
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowUp' }));

    if (direcao == "baixo")
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));

    if (direcao == "esquerda")
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowLeft' }));

    if (direcao == "direita")
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowRight' }));
}, 1000);


var s = 1;
var m = 0;
window.onload = alert("voçe tem 3 minutos")
intervalo = window.setInterval(function () {
    if (s == 60) { m++; s = 0; }
    s++;
    console.log(m, s)
}, 1000);

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
        map.Cobra(5)
        map.Pedras(10)
        map.Comidas(15)
        map.Mapa()
    },
}

App.init()