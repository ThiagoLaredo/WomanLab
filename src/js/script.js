import MenuMobile from './modules/menu-mobile.js';
import { initStaticAnimations } from './modules/animations.js';
import { SubMenu } from './modules/subMenu.js';
import { ServiceLoader } from './modules/ServiceLoader.js';
import servicesData from '../services.json';

import "../css/global.css";
import "../css/header.css";
import "../css/introducao.css";
import "../css/introducao-pg-interna.css";
import "../css/sobre.css";
import "../css/sobre-2.css";
import "../css/processo.css";
import "../css/bio.css";
import "../css/frase.css";
import "../css/para-mulheres.css";
import "../css/para-equipes.css";
import "../css/programas-mulheres.css";
import "../css/programas-equipes.css";
import "../css/manifesto.css";
import "../css/depoimentos.css";
import "../css/footer.css";
import "../css/text-typing.css";
import "../css/menu-mobile.css";
import "../css/cores.css";
import "../css/componentes.css";
import "../css/embreve.css";

let serviceLoader; // Variável global para armazenar a instância de ServiceLoader

function setupServiceLinks(serviceLoader) {
  const serviceLinks = document.querySelectorAll('a[href*="programa-mulheres.html"], a[href*="programa-equipes.html"]');
  serviceLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault(); // Impede o comportamento padrão do link
          const serviceId = link.hash.substring(1); // Obtém o hash da URL (ID do serviço)

          // Redireciona ou carrega o serviço dinamicamente
          if (window.location.pathname.includes(link.getAttribute('href').split('#')[0])) {
              // Se já estamos na página adequada, apenas carrega o serviço dinamicamente
              serviceLoader.loadService(serviceId);
          } else {
              // Caso contrário, redireciona para a página com o hash apropriado
              window.location.href = `${link.getAttribute('href').split('#')[0]}#${serviceId}`;
          }
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM completamente carregado.");

  const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]');
  menuMobile.init();

  const subMenu = new SubMenu('#menu');

  // Cria uma instância de ServiceLoader com os dados importados
  const serviceLoader = new ServiceLoader(servicesData);
  setupServiceLinks(serviceLoader); // Configura os links dos serviços

  const serviceId = window.location.hash.substring(1);
  if (serviceId) {
      serviceLoader.loadService(serviceId);
  }

  window.addEventListener('hashchange', () => {
      const newServiceId = window.location.hash.substring(1);
      if (newServiceId && serviceLoader) {
          console.log('Hash mudou, carregando novo serviço com ID:', newServiceId);
          serviceLoader.loadService(newServiceId);
      }
  });
});

// Inicializa as animações após o carregamento completo dos recursos
window.addEventListener('load', () => {
  initStaticAnimations(); // Assumindo que esta função já está definida
});