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
  const serviceLinks = document.querySelectorAll('a[href*="programa-mulheres.html"]');
  serviceLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault(); // Impede o comportamento padrão do link
          const serviceId = link.hash.substring(1); // Obtém o hash da URL (ID do serviço)

          // Carrega o serviço dinamicamente se já estiver na página correta
          if (window.location.pathname.includes('programa-mulheres.html')) {
              console.log('Already on Programa Mulheres page, loading service dynamically:', serviceId);
              serviceLoader.loadService(serviceId);
          } else {
              // Redireciona para 'programa-mulheres.html' com o hash apropriado
              console.log('Redirecting to Programa Mulheres page with hash:', serviceId);
              window.location.href = `programa-mulheres.html#${serviceId}`;
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
  serviceLoader = new ServiceLoader(servicesData);
  setupServiceLinks(serviceLoader); // Configura os links dos serviços

  const serviceId = window.location.hash.substring(1);
  console.log('Current service ID from hash on page load:', serviceId);
  if (serviceId) {
      console.log('Loading service based on initial hash:', serviceId);
      serviceLoader.loadService(serviceId);
  }

  window.addEventListener('hashchange', () => {
      const newServiceId = window.location.hash.substring(1);
      console.log('Hash changed, new service ID:', newServiceId);
      if (newServiceId && serviceLoader) {
          console.log('Loading new service based on hash change:', newServiceId);
          serviceLoader.loadService(newServiceId);
      }
  });
});

// Inicializa as animações após o carregamento completo dos recursos
window.addEventListener('load', () => {
  console.log('Initializing static animations after full page load');
  initStaticAnimations(); // Assumindo que esta função já está definida
});
