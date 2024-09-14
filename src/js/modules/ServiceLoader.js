export class ServiceLoader {
  constructor(data) {
      this.data = data;
      console.log('ServiceLoader initialized with provided data.'); // Log para confirmação da inicialização
  }

  loadService(serviceId) {
      console.log('Attempting to load service with ID:', serviceId); // Log ao tentar carregar um serviço específico
      if (!serviceId) {
          console.error('Service ID is undefined or null');
          return;
      }

      const serviceData = this.data.services.find(s => s.id === serviceId);
      if (serviceData) {
          console.log('Service data found for ID:', serviceId, serviceData); // Log se os dados do serviço foram encontrados
          this.displayService(serviceData);
          this.updateUrlHash(serviceId);  // Atualiza a URL com o hash do serviço
      } else {
          console.error('Service not found for ID:', serviceId);
      }
  }

  displayService(serviceData) {
    console.log('Displaying service data on the page for ID:', serviceData.id); // Log ao iniciar a exibição dos dados do serviço

    const isProgramaMulheresPage = window.location.pathname.includes('programa-mulheres.html');
    const isProgramaEquipesPage = window.location.pathname.includes('programa-equipes.html');

    if (isProgramaEquipesPage) {
      console.log('Identified as Programa Equipes page.'); // Log específico para identificação da página de Equipes
      document.getElementById('equipesTitle').textContent = serviceData.title;
      document.getElementById('equipesDescription').textContent = serviceData.description;
      document.getElementById('equipesStepsTitle').textContent = serviceData.stepsTitle;
      document.getElementById('equipesSteps').innerHTML = serviceData.steps.map(step => `<li>${step}</li>`).join('');
      document.getElementById('equipesImage').src = serviceData.image;
      document.getElementById('equipesImage').alt = `Imagem do serviço ${serviceData.title}`;
    } else if (isProgramaMulheresPage) {
      console.log('Identified as Programa Mulheres page.'); // Log específico para identificação da página de Mulheres
      document.getElementById('serviceIcon').src = serviceData.icon;
      document.getElementById('serviceTitle').textContent = serviceData.title;
      document.getElementById('serviceDescription').innerHTML = serviceData.description.map(item => `<li>${item}</li>`).join('');
      document.getElementById('text-to-highlight').innerHTML = serviceData.duration;
      document.getElementById('contentImage').src = serviceData.contentImage;
      document.getElementById('contentImage').alt = `Imagem do conteúdo do serviço ${serviceData.title}`;
      document.getElementById('contentSteps').innerHTML = serviceData.contentSteps.map(step => `<li>${step}</li>`).join('');
    }
  }

  updateUrlHash(serviceId) {
    console.log('Updating URL hash to:', serviceId); // Log ao atualizar o hash na URL
    window.location.hash = serviceId;
  }
}
