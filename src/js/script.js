
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
import MenuMobile from './modules/menu-mobile.js';
import { initStaticAnimations } from './modules/animations.js';
import { SubMenu } from './modules/subMenu.js';
import { ProgramasMulheresLoader } from './modules/programasMulheresLoader.js';
import { ProgramasEquipesLoader } from './modules/programasEquipesLoader.js';

// Função para carregar JSON dinamicamente
async function loadJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Erro ao carregar o JSON:', response.statusText);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar o JSON:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]');
    menuMobile.init();
    const subMenu = new SubMenu('#menu');
    initStaticAnimations();

    // Corrigindo a lógica de verificação de página
    const isProgramaMulheresPage = window.location.pathname.includes('programa-mulheres.html');
    const isProgramaEquipesPage = window.location.pathname.includes('programa-equipes.html');

    if (isProgramaMulheresPage) {
        const data = await loadJsonData('./programaMulheres.json');
        if (data && Array.isArray(data)) {
            setupMulheresLoader(data);
        } else {
            console.error('Data loaded is not an array:', data);
        }
    } else if (isProgramaEquipesPage) {
        const data = await loadJsonData('./programaEquipes.json');
        if (data && Array.isArray(data)) {
            setupEquipesLoader(data);
        } else {
            console.error('Data loaded is not an array:', data);
        }
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
