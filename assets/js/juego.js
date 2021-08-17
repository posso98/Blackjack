/**
 *  2C = two of clubs (tréboles)
 *  2D = Two of Diamonds
 *  2H = two of hearts
 *  2S = Two of spades
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#Computadora-cartas');
const puntosHtml = document.querySelectorAll('small');

// Esta función me permite crear una nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  deck = _.shuffle(deck);
  console.log(deck)
};

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return ( isNaN(valor) ) ? 
            (valor === "A" ? 11 : 10) 
            : valor * 1;

};

// const valor = valorCarta( pedirCarta() );

//Turno de la  pc
const turnoComputadora = (puntosMinimos) =>{

    do{
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;
        // Se agrega la carta al html
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21){
            break;
        }

    } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
       if(puntosComputadora === puntosMinimos){
           alert('Empate');
       } else if ( puntosMinimos > 21 ) {
           alert('Gana la computadora');
       }else if ( puntosComputadora > 21 ){
        alert('Ganaste!!');
       } else{
        alert('Gana la computadora');
       }
    }, 1000);

}


//Eventos
btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;
        // Se agrega la carta al html
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if(puntosJugador > 21){
            console.warn('Lo siento mucho, persite');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

});

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;

    turnoComputadora( puntosJugador );
});

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    crearDeck();

    puntosComputadora = 0;
    puntosHtml[1].innerText = puntosComputadora;
    puntosJugador = 0;
    puntosHtml[0].innerText = puntosJugador;

    btnDetener.disabled = false;
    btnPedir.disabled = false;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

});
