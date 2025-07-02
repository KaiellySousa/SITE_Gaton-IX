document.addEventListener('DOMContentLoaded', () => {
  console.log("Gaton IX: Sistema de bordo iniciado");

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // miado
  const miado = new Audio('assets/audio/miau.mp3');

  // fica mudando o tema
  const toggleButton = document.querySelector('#themeToggle');
  if (localStorage.getItem('tema') === 'galactico') {
    document.body.classList.add('galactic-theme');
  }
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('galactic-theme');
      const ativado = document.body.classList.contains('galactic-theme');
      localStorage.setItem('tema', ativado ? 'galactico' : 'normal');
    });
  }

  //Slider
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlides() {
    slides.forEach((el, i) => {
      el.style.display = i === slideIndex ? 'block' : 'none';
    });
    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(showSlides, 3000); // 3 segundos de imagem
  }
  if (slides.length > 0) showSlides();

  const revealElements = document.querySelectorAll('.reveal');
  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach((el) => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); 

  // Miado ao clicar no botão
  document.querySelectorAll('button').forEach((botao) => {
    botao.addEventListener('click', () => {
      try {
        miado.currentTime = 0;
        miado.play();
      } catch (e) {
        console.warn("Erro ao tentar tocar o miado:", e);
      }
    });
  });

  //Miado ao clicar nos menu 
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        miado.currentTime = 0;
        miado.play();
      } catch (err) {
        console.warn("Erro ao tocar miado em link:", err);
      }
      const destino = link.getAttribute('href');
      setTimeout(() => {
        window.location.href = destino;
      }, 500); //tempo do miado
    });
  });

  // miado
  try {
    miado.play();
  } catch (e) {
    console.warn("Autoplay bloqueado pelo navegador.");
  }

  document.querySelectorAll('.card.tripulante').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('expand'); // Alterna a classe 'expand' para mostrar ou esconder a descrição
    });
  });
});

function expandCard(element) {
  const isExpanded = element.classList.contains('expand');
  
  document.querySelectorAll('.card.tripulante').forEach(card => {
    card.classList.remove('expand');
  });

  if (!isExpanded) {
    element.classList.add('expand');
  }
}



