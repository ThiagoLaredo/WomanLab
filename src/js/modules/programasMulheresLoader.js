export class ProgramasMulheresLoader {
    constructor(data) {
        this.data = data; // Recebe os dados específicos para "mulheres"
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
        document.getElementById('serviceIcon').src = serviceData.icon;
        document.getElementById('serviceTitle').textContent = serviceData.title;
        document.getElementById('serviceDescription').innerHTML = serviceData.description.map(item => `<li>${item}</li>`).join('');
        document.getElementById('text-to-highlight').innerHTML = serviceData.duration;
        document.getElementById('contentImage').src = serviceData.contentImage;
        document.getElementById('contentImage').alt = `Imagem do conteúdo do serviço ${serviceData.title}`;
        document.getElementById('contentSteps').innerHTML = serviceData.contentSteps.map(step => `<li>${step}</li>`).join('');
    }

    updateUrlHash(serviceId) {
        window.location.hash = serviceId;
    }
}
