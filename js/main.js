document.addEventListener('DOMContentLoaded', () => {
  // 🛰️ Console de boas-vindas
  console.log("🚀 Gaton IX: Sistema de bordo iniciado");

  // ⭐ Sticky Header ao rolar
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // 😺 Prepara o som de miado
  const miado = new Audio('assets/audio/miau.mp3');

  // 🌙 Alternância de tema galáctico (com memória)
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

  // 🖼️ Slider simples para galeria
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlides() {
    slides.forEach((el, i) => {
      el.style.display = i === slideIndex ? 'block' : 'none';
    });
    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(showSlides, 3000); // 3 segundos para passar a imagem
  }
  if (slides.length > 0) showSlides();

  // 🪐 Animação ao rolar (revela elementos)
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
  revealOnScroll(); // chama uma vez no início

  // 😺 Miado ao clicar em qualquer botão
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

  // 😺 Miado ao clicar nos links do menu com navegação atrasada
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
      }, 500); // tempo para ouvir o miado
    });
  });

  // 😺 Tentar miar ao carregar (autoplay pode falhar dependendo do navegador)
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
// Função para expandir ou contrair a descrição
function expandCard(element) {
  const isExpanded = element.classList.contains('expand');
  
  // Fecha todos os outros cards
  document.querySelectorAll('.card.tripulante').forEach(card => {
    card.classList.remove('expand');
  });

  // Se não estava expandido, expande o clicado
  if (!isExpanded) {
    element.classList.add('expand');
  }
}



