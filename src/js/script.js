import MenuMobile from './modules/menu-mobile.js';
import { initStaticAnimations } from './modules/animations.js';
import { SubMenu } from './modules/subMenu.js';
import { ServiceLoader } from './modules/ServiceLoader.js';

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

// Função para inicializar o carregador de serviços
function initializeServiceLoader(data) {
  serviceLoader = new ServiceLoader(data); // Cria uma nova instância de ServiceLoader

  const serviceId = window.location.hash.substring(1); // Captura o ID do serviço do hash da URL
  if (serviceId) {
    serviceLoader.loadService(serviceId);
  } else {
    console.info('Nenhum Service ID encontrado na URL. Carregando conteúdo padrão...');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM completamente carregado.");

  const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]', '[data-menu="instagram"]');
  menuMobile.init();

  const subMenu = new SubMenu('#menu');

  // Use fetch para carregar o JSON
  fetch('./services.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      initializeServiceLoader(data); // Inicializa o carregador de serviços com os dados carregados
    })
    .catch(error => {
      console.error('Erro ao carregar o JSON:', error);
    });

  // Ouve por mudanças no hash da URL para atualizar o conteúdo dinamicamente
  window.addEventListener('hashchange', () => {
    const newServiceId = window.location.hash.substring(1);
    if (newServiceId && serviceLoader) {
      console.log('Hash mudou, carregando novo serviço com ID:', newServiceId);
      serviceLoader.loadService(newServiceId);
    }
  });

  // Inicializa as animações para o conteúdo estático
  initStaticAnimations();
});
