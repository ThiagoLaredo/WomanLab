
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
import { SubMenu } from './modules/subMenu.js';
import { ProgramasMulheresLoader } from './modules/programasMulheresLoader.js';
import { ProgramasEquipesLoader } from './modules/programasEquipesLoader.js';
import mulheresData from '../programaMulheres.json';
import equipesData from '../programaEquipes.json';

// Função para configurar os links dos serviços
function setupServiceLinks(serviceLoader, page) {
    const serviceLinks = document.querySelectorAll(`a[href*="${page}"]`);
    serviceLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const serviceId = link.hash.substring(1); // Obtém o hash da URL (ID do serviço)

            if (window.location.pathname.includes(page)) {
                console.log('Already on the correct page, loading service dynamically:', serviceId);
                serviceLoader.loadService(serviceId);
            } else {
                console.log('Redirecting to page with hash:', page, serviceId);
                window.location.href = `${page}#${serviceId}`;
            }
        });
    });
}

// Função principal de inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");

    // Inicializa o menu mobile
    const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]');
    menuMobile.init();

    // Inicializa o submenu
    const subMenu = new SubMenu('#menu');

    // Obtém o pathname da URL atual
    const pathname = window.location.pathname.toLowerCase();

    if (pathname.endsWith('programa-mulheres.html')) {
        console.log('Initializing loader for "programa-mulheres.html".');
        const loader = new ProgramasMulheresLoader(mulheresData);
        setupServiceLinks(loader, 'programa-mulheres.html');
        handleInitialLoad(loader);
    } else if (pathname.endsWith('programa-equipes.html')) {
        console.log('Initializing loader for "programa-equipes.html".');
        const loader = new ProgramasEquipesLoader(equipesData);
        setupServiceLinks(loader, 'programa-equipes.html');
        handleInitialLoad(loader);
    } else {
        console.error('Página desconhecida. Não foi possível determinar o loader.');
    }
});

// Função para carregar o serviço inicial com base no hash da URL
function handleInitialLoad(loader) {
    const serviceId = window.location.hash.substring(1);
    if (serviceId) {
        console.log('Carregando serviço com ID:', serviceId);
        loader.loadService(serviceId);
    } else {
        console.info('Nenhum Service ID encontrado na URL. Carregando conteúdo padrão...');
    }

    // Adiciona um listener para o evento de mudança de hash
    window.addEventListener('hashchange', () => {
        const newServiceId = window.location.hash.substring(1);
        if (newServiceId) {
            console.log('Hash changed, carregando novo serviço com ID:', newServiceId);
            loader.loadService(newServiceId);
        } else {
            console.warn('Service ID is undefined or null on hash change');
        }
    });
}
