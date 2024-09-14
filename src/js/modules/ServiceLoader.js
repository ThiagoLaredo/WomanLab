export class ServiceLoader {
  constructor(data) {
      this.data = data;
  }

  loadService(serviceId, pageType) {
      const serviceData = this.data.find(s => s.id === serviceId);
      if (serviceData) {
          this.displayService(serviceData, pageType);
          this.updateUrlHash(serviceId);  // Atualiza a URL com o hash do serviço após carregar
      } else {
          console.error('Service not found:', serviceId);
      }
  }

  displayService(serviceData, pageType) {
      if (pageType === 'mulheres') {
          document.getElementById('serviceIcon').src = serviceData.icon;
          document.getElementById('serviceTitle').textContent = serviceData.title;
          document.getElementById('serviceDescription').innerHTML = serviceData.description.map(item => `<li>${item}</li>`).join('');
          document.getElementById('text-to-highlight').innerHTML = serviceData.duration;
          document.getElementById('contentImage').src = serviceData.contentImage;
          document.getElementById('contentImage').alt = `Imagem do conteúdo do serviço ${serviceData.title}`;
          document.getElementById('contentSteps').innerHTML = serviceData.contentSteps.map(step => `<li>${step}</li>`).join('');
      } else if (pageType === 'equipes') {
          document.getElementById('equipesTitle').textContent = serviceData.title;
          document.getElementById('equipesDescription').textContent = serviceData.description;
          document.getElementById('equipesStepsTitle').textContent = serviceData.stepsTitle;
          document.getElementById('equipesSteps').innerHTML = serviceData.steps.map(step => `<li>${step}</li>`).join('');
          document.getElementById('equipesImage').src = serviceData.image;
          document.getElementById('equipesImage').alt = `Imagem do serviço ${serviceData.title}`;
      }
  }

  updateUrlHash(serviceId) {
    window.location.hash = serviceId; // Atualiza a URL com o hash do serviço
}
}
