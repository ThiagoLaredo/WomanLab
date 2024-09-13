import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export const initAnimations = () => {
  // Assegurar que tudo começa invisível para a animação
  gsap.set([".header", "[data-menu='logo']", "#menu > li", ".social-icons-header a", ".img-circulo", ".introducao-texto h1"], { opacity: 0 });

  // Verificação de existência do elemento com a classe .programa__badge
  const programaBadge = document.querySelector(".programa__badge");
  if (programaBadge) {
    // Define a opacidade inicial para 0 se o elemento existir
    gsap.set(programaBadge, { opacity: 0 });
    
    // Aplica a animação ao elemento se ele existir
    gsap.to(programaBadge, {
      duration: 1,
      delay: 0.5,
      opacity: 1,
      ease: "power1.inOut"
    });
  }

  // Embrulhar cada letra do h1 em um span para animação
  const h1 = document.querySelector('.wave-text');
  if (h1) {
    h1.innerHTML = h1.textContent.split('').map(letter => `<span>${letter}</span>`).join('');
    gsap.set(h1, { opacity: 1 });
  }

  // Animação do cabeçalho para entrada suave
  gsap.to(".header", { duration: 1, opacity: 1, ease: "power1.inOut" });

  // Animação para o logo
  gsap.to("[data-menu='logo']", { duration: 1, delay: 0.5, opacity: 1, ease: "power1.inOut" });

  // Animação dos itens do menu
  const menuItems = document.querySelectorAll("#menu li");
  if (menuItems.length > 0) {
    gsap.to(menuItems, {
      duration: 0.5,
      delay: 1,
      opacity: 1,
      stagger: 0.2,
      ease: "power1.out"
    });
  }

  // Animação dos ícones de redes sociais
  const socialIcons = document.querySelectorAll(".social-icons-header a");
  if (socialIcons.length > 0) {
    gsap.to(socialIcons, {
      duration: 0.5,
      delay: 2,
      opacity: 1,
      stagger: 0.2,
      ease: "power1.inOut"
    });
  }

  // Animação inicial quando a página carrega
  const introducao = document.querySelector(".introducao");
  if (introducao) {
    gsap.fromTo(introducao, {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      opacity: 0
    }, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
      duration: 2.5,
      ease: "power2.out",
      onComplete: () => {
        introducao.style.clipPath = 'none'; // Limpa o clip-path após a animação
      }
    });
  }

  // Animação do círculo SVG
  const imgCirculo = document.querySelector(".img-circulo");
  if (imgCirculo) {
    gsap.to(imgCirculo, {
      duration: 1,
      delay: 2,
      opacity: 0.5,
      scale: 1,
      ease: "back.out(1.7)"
    });
  }

  // Animação de onda para o texto h1
  const waveTextSpans = document.querySelectorAll(".introducao-texto h1 span");
  if (waveTextSpans.length > 0) {
    gsap.from(waveTextSpans, {
      duration: 0.6,
      opacity: 0,
      ease: "power1.inOut",
      y: -20,
      stagger: {
        each: 0.1,
        from: "start",
        yoyo: true,
        repeat: 0
      },
      delay: 2
    });
  }

  // Animação dos elementos com a classe .highlight
  const highlights = document.querySelectorAll(".highlight");
  if (highlights.length > 0) {
    highlights.forEach(element => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top center",
          toggleActions: "play none none none",
          markers: false
        },
        duration: 2,
        width: "100%",
        ease: "none",
        repeat: 0,
        yoyo: false
      });
    });
  } else {
    console.log("Nenhum elemento '.highlight' encontrado.");
  }

  // Animação das seções e elementos de rodapé
  const sections = document.querySelectorAll('section, footer');
  sections.forEach(section => {
    const elementsToAnimate = section.querySelectorAll('h2, p, img, h3, h4, ul, ol, li, .programa__circle, button, #contact-form, #send-button');
    
    if (elementsToAnimate.length > 0) {
      gsap.from(elementsToAnimate, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
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
    }
  });

  // Animações específicas
  const circleLilasClaro = document.querySelector(".circle-lilas-claro");
  if (circleLilasClaro) {
    gsap.from(circleLilasClaro, {
      scrollTrigger: {
        trigger: ".voce",
        start: "top 90%",
        end: "top 50%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      duration: 0.7
    });
  }

  const circleLilasEscuro = document.querySelector(".circle-lilas-escuro");
  if (circleLilasEscuro) {
    gsap.from(circleLilasEscuro, {
      scrollTrigger: {
        trigger: ".voce",
        start: "top 90%",
        end: "top 50%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      duration: 0.7
    });
  }

  // Animação dos círculos da classe grade
  const gradeCircles = document.querySelectorAll('.grade circle');
  if (gradeCircles.length > 0) {
    gsap.from(gradeCircles, {
      scrollTrigger: {
        trigger: '.grade',
        start: "top center",
        end: "bottom center",
        scrub: true,
        toggleActions: "restart pause reverse pause"
      },
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  }
};
