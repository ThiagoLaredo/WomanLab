import MenuMobile from './modules/menu-mobile.js';
import HeaderScroll from './modules/header-scroll.js';
import ScrollAnima from './modules/scroll-anima.js';
import MySwiper from './modules/mySwiper.js';
import ConsoleTextEffect from './modules/text-effect.js';
import "../css/global.css";
import "../css/header.css";
import "../css/introducao.css";
import "../css/text-typing.css";
import "../css/institucional.css";
import "../css/parcerias-globais.css";
import "../css/quem-somos.css";
import "../css/o-que-fazemos.css";
import "../css/complaince.css";
import "../css/swiper.css";
import "../css/contato.css";
import "../css/menu-mobile.css";
import "../css/componentes.css";
import "../css/cores.css";

const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]' );
menuMobile.init();

const headerScroll = new HeaderScroll('.header');
headerScroll.init();

const scrollAnima = new ScrollAnima('.swiper-slide');
scrollAnima.init();

new MySwiper();

document.addEventListener('DOMContentLoaded', () => {
  const targetElement = document.getElementById('typing');
  if (targetElement) {
    const textoParaDigitar = 'Somos uma gestora com portfólio de investimentos alternativos, focados em infraestrutura, crédito e operações estruturadas.';
    const velocidadeDeDigitacao = 30; // Velocidade em milissegundos
    new ConsoleTextEffect(targetElement, textoParaDigitar, velocidadeDeDigitacao, () => {
      // Callback para ser executado após a animação de digitação
      if (targetElement) {
        targetElement.style.animation = "fadeInUp 0.5s ease-out";
      } else {
        console.error('Elemento para digitação não encontrado após conclusão da digitação.');
      }
    });
  } else {
    console.error('Elemento targetElement não encontrado no DOM.');
  }
});



