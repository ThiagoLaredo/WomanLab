export class ServiceLoader {
  constructor(data) {
      this.data = data;
  }

  loadService(serviceId) {
      if (!serviceId) {
          console.error('Service ID is undefined or null');
          return;
      }

      const serviceData = this.data.services.find(s => s.id === serviceId);
      if (serviceData) {
          this.displayService(serviceData);
          this.updateUrlHash(serviceId);  // Atualiza a URL com o hash do serviço
      } else {
          console.error('Service not found:', serviceId);
      }
  }

  displayService(serviceData) {
    const isProgramaMulheresPage = window.location.pathname.includes('programa-mulheres.html');
    const isProgramaEquipesPage = window.location.pathname.includes('programa-equipes.html');

    if (isProgramaEquipesPage) {
      // Atualiza o conteúdo da página 'programa-equipes.html'
      document.getElementById('equipesTitle').textContent = serviceData.title;
      document.getElementById('equipesDescription').textContent = serviceData.description;
      document.getElementById('equipesStepsTitle').textContent = serviceData.stepsTitle;
      document.getElementById('equipesSteps').innerHTML = serviceData.steps.map(step => `<li>${step}</li>`).join('');
      document.getElementById('equipesImage').src = serviceData.image;
      document.getElementById('equipesImage').alt = `Imagem do serviço ${serviceData.title}`;
    } else if (isProgramaMulheresPage) {
      // Atualiza o conteúdo da página 'programa-mulheres.html'
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
    window.location.hash = serviceId; // Atualiza a URL com o hash do serviço
  }
}
