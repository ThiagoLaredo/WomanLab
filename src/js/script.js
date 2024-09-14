import MenuMobile from './modules/menu-mobile.js';
import { initStaticAnimations } from './modules/animations.js';
import { SubMenu } from './modules/subMenu.js';
import { ServiceLoader } from './modules/ServiceLoader.js'; // Certifique-se que o caminho está correto
import servicesData from '../services.json'; // Verifique se o caminho está correto

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

// Configura links para carregar conteúdo dinamicamente
function setupServiceLinks(serviceLoader, pageType) {
    const pageSelector = pageType === 'mulheres' ? 'programa-mulheres.html' : 'programa-equipes.html';
    const serviceLinks = document.querySelectorAll(`a[href*="${pageSelector}"]`);

    serviceLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const serviceId = link.hash.substring(1);
            if (window.location.pathname.includes(pageSelector)) {
                serviceLoader.loadService(serviceId, pageType);
            } else {
                window.location.href = `${pageSelector}#${serviceId}`;
            }
        });
    });
}

// Carrega dados específicos para o tipo de página
function loadServiceData(pageType) {
    return servicesData[pageType];
}

document.addEventListener('DOMContentLoaded', () => {
    const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]');
    menuMobile.init();

    const subMenu = new SubMenu('#menu');

    const pageType = window.location.pathname.includes('programa-mulheres.html') ? 'mulheres' : 'equipes';
    const data = loadServiceData(pageType);
    const serviceLoader = new ServiceLoader(data);
    setupServiceLinks(serviceLoader, pageType);

    const serviceId = window.location.hash.substring(1);
    if (serviceId) {
        serviceLoader.loadService(serviceId, pageType);
    }

    window.addEventListener('hashchange', () => {
        const newServiceId = window.location.hash.substring(1);
        if (newServiceId && serviceLoader) {
            serviceLoader.loadService(newServiceId, pageType);
        }
    });
});

// Inicializa as animações após o carregamento completo dos recursos
window.addEventListener('load', () => {
    initStaticAnimations();
});
