import MenuMobile from './modules/menu-mobile.js';
// import ConsoleTextEffect from './modules/text-effect.js';
// import FormHandler from './modules/formHandler.js';
import translations from '../translations.json'
import { initAnimations } from './modules/animations.js';


import "../css/global.css";
import "../css/header.css";
import "../css/introducao.css";
import "../css/sobre.css";
import "../css/sobre-2.css";
import "../css/processo.css";
import "../css/bio.css";
import "../css/frase.css";
import "../css/footer.css";
import "../css/text-typing.css";
import "../css/menu-mobile.css";
import "../css/cores.css";
import "../css/componentes.css";
import "../css/embreve.css";



document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");
    
    // Inicialização de componentes
    const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]', '[data-menu="instagram"]');
    menuMobile.init();
  
    // const formHandler = new FormHandler('contact-form');
  
  
    // Verifique se está chegando até aqui
    console.log("Iniciando animações GSAP...");
  
    initAnimations();
  
    console.log("Animações GSAP iniciadas.");
  });
  