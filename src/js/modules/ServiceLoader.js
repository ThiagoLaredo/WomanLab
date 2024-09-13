// import { animateDynamicContent } from './animations.js';

export class ServiceLoader {
  constructor(data) {
    this.data = data; // Carrega os dados do JSON
  }

  loadService(serviceId) {
    if (!serviceId) {
      console.error('Service ID is undefined or null');
      return;
    }

    const serviceData = this.data.services.find(s => s.id === serviceId);
    if (serviceData) {
      this.displayService(serviceData, serviceId);
      this.updateUrlHash(serviceId); // Atualiza a URL com o hash do serviço
    } else {
      console.error('Service not found:', serviceId);
    }
  }

  displayService(serviceData, serviceId) {
    const dynamicContent = document.getElementById('dynamic-content');

    if (!dynamicContent) {
      console.error('Elemento "dynamic-content" não encontrado.');
      return;
    }

    dynamicContent.innerHTML = ''; // Limpa o conteúdo existente

    // Verifica qual página está sendo carregada e seleciona o template correto
    const isProgramaMulheresPage = window.location.pathname.includes('programa-mulheres.html');
    const isProgramaEquipesPage = window.location.pathname.includes('programa-equipes.html');

    if (isProgramaEquipesPage) {
      dynamicContent.innerHTML = `
        <div class="seguranca-psicologica-programa">
          <div class="seguranca-psicologica-conteudo">
            <h2>${serviceData.title}</h2>
            <p>${serviceData.description}</p>
            <h3>${serviceData.stepsTitle}</h3>
            <ul>
              ${serviceData.steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
          <img class="svg-seguranca-psicologica-programa" src="${serviceData.image}" alt="Imagem do serviço">
        </div>  
      `;
    } else if (isProgramaMulheresPage) {
      dynamicContent.innerHTML = `
        <div class="programa__sobre">
          <div class="programa__texto">
            <div class="pg-servico-titulo">
              <img class="pg-servico-icone" src="${serviceData.icon}" alt="Ícone do serviço">
              <h2>${serviceData.title}</h2>
            </div>
            <ul>
              ${serviceData.description.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div class="programa__duracao">
            <p id="text-to-highlight">${serviceData.duration}</p>
            <div class="highlight"></div>
          </div>
        </div>
        <div class="programa__conteudo">
          <img class="programa__conteudo__img" src="${serviceData.contentImage}" alt="Imagem do conteúdo">
          <ol class="programa__conteudo__lista">
            ${serviceData.contentSteps.map(step => `<li><strong>${step.split(':')[0]}</strong>: ${step.split(':')[1]}</li>`).join('')}
          </ol>
        </div>
      `;
    }

    // Reaplica as animações apenas para o conteúdo dinâmico carregado
    // animateDynamicContent();
  }

  updateUrlHash(serviceId) {
    window.location.hash = serviceId; // Atualiza a URL com o hash do serviço
  }
}
