





import MenuMobile from './modules/menu-mobile.js';
import { initStaticAnimations } from './modules/animations.js';
import { SubMenu } from './modules/subMenu.js';
import servicesData from '../services.json'; // Importa o JSON com os dados de serviços
import { ProgramasMulheresLoader } from './modules/programasMulheresLoader.js';
import { ProgramasEquipesLoader } from './modules/programasEquipesLoader.js';


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
document.addEventListener('DOMContentLoaded', () => {
  const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]');
  menuMobile.init();
  const subMenu = new SubMenu('#menu');
  initStaticAnimations();

  setupLoaders();
});

function setupLoaders() {
  const pageType = window.location.pathname.includes('programa-mulheres.html') ? 'programaMulheres' : 'programaEquipes'; // Ajusta para usar as chaves corretas do JSON
  
  // Certifique-se de passar os dados do JSON corretos para cada loader
  let serviceLoader;
  if (pageType === 'programaMulheres') {
      serviceLoader = new ProgramasMulheresLoader(servicesData[pageType]); // Passa os dados da chave correta do JSON
  } else {
      serviceLoader = new ProgramasEquipesLoader(servicesData[pageType]); // Passa os dados da chave correta do JSON
  }
  
  setupServiceLinks(serviceLoader, pageType);

  const serviceId = window.location.hash.substring(1);
  if (serviceId) {
      serviceLoader.loadService(serviceId);
  }

  window.addEventListener('hashchange', () => {
      const newServiceId = window.location.hash.substring(1);
      if (newServiceId) {
          serviceLoader.loadService(newServiceId);
      }
  });
}

function setupServiceLinks(serviceLoader, pageType) {
  const pageSelector = pageType === 'programaMulheres' ? 'programa-mulheres.html' : 'programa-equipes.html';
  const serviceLinks = document.querySelectorAll(`a[href*="${pageSelector}"]`);

  serviceLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const serviceId = link.hash.substring(1);
          if (window.location.pathname.includes(pageSelector)) {
              serviceLoader.loadService(serviceId);
          } else {
              window.location.href = `${pageSelector}#${serviceId}`;
          }
      });
  });
}