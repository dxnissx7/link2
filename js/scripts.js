/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


var myCarousel = document.getElementById("carouselExample")
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000 // Cambia las imágenes cada 2 segundos
})


// Configuración del juego
const cardImages = 
[
    'assets/collage/1.jpeg', 'assets/collage/1.jpeg',
    'assets/collage/2.jpeg', 'assets/collage/2.jpeg',
    'assets/collage/3.jpeg', 'assets/collage/3.jpeg',
    'assets/collage/4.jpeg', 'assets/collage/4.jpeg',
    'assets/collage/5.jpeg', 'assets/collage/5.jpeg',
    'assets/collage/6.jpeg', 'assets/collage/6.jpeg',
    'assets/collage/7.jpeg', 'assets/collage/7.jpeg',
    'assets/collage/8.jpeg', 'assets/collage/8.jpeg'
  ];
  
  // Variables
  let flippedCards = [];
  let matchedCards = 0;
  const totalPairs = cardImages.length / 2;
  const gameBoard = document.getElementById('game-board');
  
  // Función para barajar las cartas
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Función para crear las cartas en el tablero
  function createGameBoard() {
    shuffle(cardImages);
  
    cardImages.forEach((image, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;
  
      const cardBack = document.createElement('div');
      cardBack.classList.add('card-back');
  
      const cardFront = document.createElement('img');
      cardFront.src = image;
  
      card.appendChild(cardBack);
      card.appendChild(cardFront);
      gameBoard.appendChild(card);
  
      // Agregar evento de clic en cada carta
      card.addEventListener('click', flipCard);
    });
  }
  
  // Función para voltear la carta
  function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) {
      return;
    }
  
    this.classList.add('flipped');
    flippedCards.push(this);
  
    // Si ya tenemos 2 cartas volteadas, verificamos si son iguales
    if (flippedCards.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 1000);
    }
  }
  
  // Función para verificar si las cartas volteadas son un par
  function checkMatch() {
    const [card1, card2] = flippedCards;
  
    if (card1.querySelector('img').src === card2.querySelector('img').src) {
      matchedCards++;
      flippedCards = [];
  
      if (matchedCards === totalPairs) {
        alert('¡Felicidades! Has emparejado todas las cartas.');
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }
  }
  
  // Iniciar el juego
  createGameBoard();
 // Función para ajustar el tablero según el tamaño de la pantalla
function adjustBoardLayout() {
  const gameBoard = document.getElementById('game-board');
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    // Modo móvil: 2 columnas
    gameBoard.style.display = 'grid';
    gameBoard.style.gridTemplateColumns = 'repeat(2, 120px)';
    gameBoard.style.gap = '10px';
  } else {
    // Modo PC: 4 columnas
    gameBoard.style.display = 'grid';
    gameBoard.style.gridTemplateColumns = 'repeat(4, 150px)';
    gameBoard.style.gap = '15px';
  }
}

// Llamamos a la función cuando cargue la página y cuando se redimensione la ventana
window.addEventListener('load', adjustBoardLayout);
window.addEventListener('resize', adjustBoardLayout);
