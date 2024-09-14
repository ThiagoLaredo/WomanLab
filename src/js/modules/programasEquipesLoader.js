export class ProgramasEquipesLoader {
    constructor(data) {
        this.data = data; // Recebe os dados específicos para "equipes"
    }

    loadService(serviceId) {
        const serviceData = this.data.find(s => s.id === serviceId);
        if (serviceData) {
            this.displayService(serviceData);
            this.updateUrlHash(serviceId);
        } else {
            console.error('Service not found:', serviceId);
        }
    }

    displayService(serviceData) {
        document.getElementById('equipesTitle').textContent = serviceData.title;
        document.getElementById('equipesDescription').textContent = serviceData.description;
        document.getElementById('equipesStepsTitle').textContent = serviceData.stepsTitle;
        document.getElementById('equipesSteps').innerHTML = serviceData.steps.map(step => `<li>${step}</li>`).join('');
        document.getElementById('equipesImage').src = serviceData.image;
        document.getElementById('equipesImage').alt = `Imagem do serviço ${serviceData.title}`;
    }

    updateUrlHash(serviceId) {
        window.location.hash = serviceId;
    }
}
