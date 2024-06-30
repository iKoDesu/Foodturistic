const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascota = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId
let mokepones = []

let ataqueJugador = []
let ataqueEnemigo = []

let opcionDeMokepones

let ataquesMokepon
let ataquesMokeponEnemigo = []

let inputPizza
let inputRamen
let inputSushi


let botonFuego
let botonAgua
let botonTierra
let botones = []

let indexAtaqueJugador
let indexAtaqueEnemigo

let mascotaJugador
let mascotaJugadorObjeto

let victoriasJugador = 0
let victoriasEnemigo = 0

let vidasJugador = 3
let vidasEnemigo = 3

let lienzo = mapa.getContext("2d")

let intervalo

let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20

const anchoMaximoDelMapa = 500

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}


alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor (nombre, foto, vida, fotoMapa, x = 10, y = 10){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let pizzable = new Mokepon('Pizzable', './assets/PizzaProgramable.png', 5, './assets/Pizzable_Face.png')
let ramentivo = new Mokepon('Ramentivo', './assets/RamenRadioactivo.png', 5, './assets/Ramentivo_Face.png')
let sinteshi = new Mokepon('Sinteshi', './assets/SushiSintetico.png', 5, './assets/Sinteshi_Face.png')

const PIZZABLE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'}
]

const RAMENTIVO_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}
]

const SINTESHI_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}
]

pizzable.ataques.push(...PIZZABLE_ATAQUES)

pizzableEnemigo.ataques.push(...PIZZABLE_ATAQUES)

ramentivo.ataques.push(...RAMENTIVO_ATAQUES)

ramentivoEnemigo.ataques.push(...RAMENTIVO_ATAQUES)

sinteshi.ataques.push(...SINTESHI_ATAQUES)

sinteshiEnemigo.ataques.push(...SINTESHI_ATAQUES)

mokepones.push(pizzable, ramentivo, sinteshi)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputPizza = document.getElementById('Pizzable')
    inputRamen = document.getElementById('Ramentivo')
    inputSushi = document.getElementById('Sinteshi')

    })

    botonMascota.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}
    
function seleccionarMascotaJugador(){
    if(inputPizza.checked){
        spanMascotaJugador.innerHTML = inputPizza.id
        mascotaJugador = inputPizza.id
    }else if(inputRamen.checked){
        spanMascotaJugador.innerHTML = inputRamen.id
        mascotaJugador = inputRamen.id
    }
    else if(inputSushi.checked){
        spanMascotaJugador.innerHTML = inputSushi.id
        mascotaJugador = inputSushi.id
    }else{
        alert("Selecciona una mascota")
    }
    
    if(spanMascotaJugador.innerHTML.length > 1){
        
        seleccionarMokepon(mascotaJugador)
        
        sectionSeleccionarMascota.style.display = "none"
        sectionVerMapa.style.display = "flex"
        
        iniciarMapa()

        let imagenDePizzable = new Image()
        imagenDePizzable.src = pizzable.foto

        extrarAtaques(mascotaJugador)
    }
}

function seleccionarMokepon(mascotaJugador) {
    fetch("http://localhost:8080/mokepon/" + jugadorId, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extrarAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataques BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque(){
    console.log("crea ataque")
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if (e.target.textContent === '🌱'){
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarMascotaEnemigo(enemigo){
    //let mascotaAleatoria = aleatorio(0, mokepones.length -1)
    //spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    //ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }

    console.log(ataqueEnemigo)
    /* crearMensaje() */

    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

/* 🔥 💧 🌱 */

function combate(){

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        }else if(ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index]. nombre === 'AGUA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVictorias()
}

function resultadoCombate(){
    let resultado = ""

    if(ataqueJugador == ataqueEnemigo){
        resultado = "EMPATE"
    }else if(ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego'){
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        resultado = "GANASTE 🎖️"
    }else if(ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra'){
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        resultado = "GANASTE 🎖️"
    } else if(ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua'){
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        resultado = "GANASTE 🎖️"
    }else{
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
        resultado = "PERDISTE :("
    }
    return resultado
}

function revisarVictorias(){
    if(victoriasJugador === victoriasEnemigo){
        mensajeFinal("¡OH! ¡¡ESTO FUE UN EMPATE!!")
    }else if(vidasJugador > victoriasEnemigo){
        mensajeFinal("FELICITACIONES! Ganaste")
    }else{
        mensajeFinal("Que pena, has perdido :(")
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    
    sectionMensajes.innerHTML = resultado

    nuevoAtaqueDelJugador.innerText = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerText = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

function mensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = "La batalla ha terminado. <br/>"+resultadoFinal

    sectionReiniciar.style.display = "flex"
}

function reiniciarJuego(){
    location.reload()
}


function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)

    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    pizzableEnemigo.pintarMokepon()
    sinteshiEnemigo.pintarMokepon()
    ramentivoEnemigo.pintarMokepon()

    if(mascotaJugadorObjeto.velocidadX !== 0 || 
        mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(pizzableEnemigo)
        revisarColision(sinteshiEnemigo)
        revisarColision(ramentivoEnemigo)
    }
}

function enviarPosicion(x, y) {
    console.log(x, y)
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if(res.ok){
            res.json()
                .then(function ({enemigos}) {
                    console.log(enemigos)

                    enemigos.forEach(function (enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""

                        if(mokeponNombre === 'Pizzable'){
                            mokeponEnemigo = new Mokepon('Pizzable', './assets/PizzaProgramable.png', 5, './assets/Pizzable_Face.png')
                        }else if(mokeponNombre === 'Ramentivo'){
                            mokeponEnemigo = new Mokepon('Ramentivo', './assets/RamenRadioactivo.png', 5, './assets/Ramentivo_Face.png')
                        }else if (mokeponNombre == 'Sinteshi'){
                            mokeponEnemigo = new Mokepon('Sinteshi', './assets/SushiSintetico.png', 5, './assets/Sinteshi_Face.png')
                        }

                        mokeponEnemigo.pintarMokepon()
                    })
                })
        }
    })
}



function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota()

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre){
           return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return;
    }
    detenerMovimiento()
    console.log('Se detecto una colision');
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)