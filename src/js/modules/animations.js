import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export const initAnimations = () => {
  // Assegurar que tudo começa invisível para a animação
  gsap.set([".header", "[data-menu='logo']", "#menu li", ".social-icons-header a", ".img-circulo", ".introducao-texto h1"], { opacity: 0 });

  // Embrulhar cada letra do h1 em um span para animação
  const h1 = document.querySelector('.wave-text');
  // Checa se o h1 existe para evitar erros
  if (h1) {
    h1.innerHTML = h1.textContent.split('').map(letter => `<span>${letter}</span>`).join('');
    // Imediatamente tornar o h1 visível para que os spans sejam visíveis
    gsap.set(h1, { opacity: 1 });
  }

  // Animação do cabeçalho para entrada suave
  gsap.to(".header", { duration: 1, opacity: 1, ease: "power1.inOut" });

  // Animação para o logo
  gsap.to("[data-menu='logo']", { duration: 1, delay: 0.5, opacity: 1, ease: "power1.inOut" });

  // Animação dos itens do menu
  gsap.to("#menu li", {
      duration: 0.5,
      delay: 1,
      opacity: 1,
      stagger: 0.2, // Efeito dominó para os itens do menu
      ease: "power1.out"
  });

  // Animação dos ícones de redes sociais
  gsap.to(".social-icons-header a", {
      duration: 0.5,
      delay: 2, // Atraso após os itens do menu
      opacity: 1,
      stagger: 0.2,
      ease: "power1.inOut"
  });

// Animação inicial quando a página carrega
gsap.fromTo(".introducao", {
  clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
  opacity: 0
}, {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  opacity: 1,
  duration: 2.5,
  ease: "power2.out",
  onComplete: () => {
    document.querySelector('.introducao').style.clipPath = 'none'; // Limpa o clip-path após a animação
  }
});

  // Animação do círculo SVG
  gsap.to(".img-circulo", {
      duration: 1,
      delay: 2, // Ajustado para começar depois dos ícones das redes sociais
      opacity: .5,
      scale: 1, // Supondo uma animação de escala para o SVG
      ease: "back.out(1.7)"
  });


  // Animação de onda para o texto h1
  gsap.from(".introducao-texto h1 span", {
    duration: 0.6,
    opacity: 0,
    ease: "power1.inOut",
    y: -20,
    stagger: {
      each: 0.1,
      from: "start",
      yoyo: true,
      repeat: 0  // Configurado para não repetir
    },
    delay: 2 // Começar após a conclusão da animação do círculo SVG
  });
};


  const sections = document.querySelectorAll('section, footer');
  sections.forEach(section => {
    gsap.from(section.querySelectorAll('h2, p, img, h3, ul, button, #contact-form, #send-button'), {
      scrollTrigger: {
        trigger: section,
        start: "top 70%", // Começa um pouco depois dos círculos
        end: "bottom 100%",
        toggleActions: "play none none none",
        markers: false
      },
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: 0.2,
      ease: "power1.out"
    });
  });
  
  // Animação para o círculo lilás claro
  gsap.from(".circle-lilas-claro", {
    scrollTrigger: {
      trigger: ".voce",
      start: "top 90%", // Ajuste conforme necessário
      end: "top 50%",
      // scrub: true,
      toggleActions: "play none none none" // Não reage ao scroll up
    },
    opacity: 0,
    duration: 0.7
  });

  // Animação para o círculo lilás escuro
  gsap.from(".circle-lilas-escuro", {
    scrollTrigger: {
      trigger: ".voce",
      start: "top 90%",
      end: "top 50%",
      // scrub: true,
      toggleActions: "play none none none" // Não reage ao scroll up
    },
    opacity: 0,
    duration: 0.7
  });



  const circles = document.querySelectorAll('.grade circle');

  gsap.from(circles, {
    scrollTrigger: {
      trigger: '.grade',
      start: "top center", // Inicia quando o topo do SVG chegar ao centro da viewport
      end: "bottom center",  // Termina quando o fundo do SVG sair do topo da viewport
      scrub: true,        // Suaviza a animação com o scroll
      toggleActions: "restart pause reverse pause"
    },
    scale: 0,            // Inicia os círculos de um ponto de escala zero
    opacity: 0,          // Inicia os círculos totalmente transparentes
    stagger: 0.05,       // Cada círculo começa a animação 0.05 segundos após o anterior
    duration: 0.5,       // Duração da animação para cada círculo
    ease: "elastic.out(1, 0.3)"  // Elastic easing para um efeito "pop"
  });




