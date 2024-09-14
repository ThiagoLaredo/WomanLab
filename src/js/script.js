
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
import MenuMobile from './modules/menu-mobile.js';
import { initStaticAnimations } from './modules/animations.js';
import { SubMenu } from './modules/subMenu.js';
import { ProgramasMulheresLoader } from './modules/programasMulheresLoader.js';
import { ProgramasEquipesLoader } from './modules/programasEquipesLoader.js';

// Importando diretamente os arquivos JSON
import mulheresData from '../programaMulheres.json';
import equipesData from '../programaEquipes.json';

document.addEventListener('DOMContentLoaded', () => {
    const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]');
    menuMobile.init();
    const subMenu = new SubMenu('#menu');
    initStaticAnimations();

    const pathname = window.location.pathname;
    const isProgramaMulheresPage = pathname.includes('programa-mulheres.html');
    const isProgramaEquipesPage = pathname.includes('programa-equipes.html');

    if (isProgramaMulheresPage) {
        setupMulheresLoader(mulheresData);
    } else if (isProgramaEquipesPage) {
        setupEquipesLoader(equipesData);
    } else {
        console.error('Página desconhecida. Não foi possível determinar o loader.');
    }
});

function setupMulheresLoader(data) {
    const loader = new ProgramasMulheresLoader(data);
    setupServiceLinks(loader, 'programa-mulheres.html');

    const serviceId = window.location.hash.substring(1);
    if (serviceId) {
        loader.loadService(serviceId);
    }

    window.addEventListener('hashchange', () => {
        const newServiceId = window.location.hash.substring(1);
        if (newServiceId) {
            loader.loadService(newServiceId);
        }
    });
}

function setupEquipesLoader(data) {
    const loader = new ProgramasEquipesLoader(data);
    setupServiceLinks(loader, 'programa-equipes.html');

    const serviceId = window.location.hash.substring(1);
    if (serviceId) {
        loader.loadService(serviceId);
    }

    window.addEventListener('hashchange', () => {
        const newServiceId = window.location.hash.substring(1);
        if (newServiceId) {
            loader.loadService(newServiceId);
        }
    });
}

function setupServiceLinks(loader, pageSelector) {
    const serviceLinks = document.querySelectorAll(`a[href*="${pageSelector}"]`);

    serviceLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const serviceId = link.hash.substring(1);
            if (window.location.pathname.includes(pageSelector)) {
                loader.loadService(serviceId);
            } else {
                window.location.href = `${pageSelector}#${serviceId}`;
            }
        });
    });
}
