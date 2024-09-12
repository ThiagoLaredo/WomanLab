

export function loadServiceContent() {
  // Obter o identificador do serviço da URL
  let serviceId = window.location.hash.substring(1);
  console.log("Hash da URL:", serviceId);

  // Verificar a página atual
  const isProgramaMulheresPage = window.location.pathname.includes('programa-mulheres.html');
  const isProgramaEquipesPage = window.location.pathname.includes('programa-equipes.html');
  console.log("Página de Mulheres:", isProgramaMulheresPage, "Página de Equipes:", isProgramaEquipesPage);

  // Se não houver hash na URL, defina um hash padrão e redirecione
  if (!serviceId) {
    if (isProgramaMulheresPage) {
      serviceId = 'programa-deep'; // Hash padrão para programa-mulheres
    } else if (isProgramaEquipesPage) {
      serviceId = 'programa-spt-basico'; // Hash padrão para programa-equipes
    }
    window.location.hash = serviceId; // Adiciona o hash na URL
    console.log("Novo Hash Definido:", serviceId);
  }

  // Fazer fetch dos dados do arquivo JSON
  fetch('services.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar JSON: ${response.status} - ${response.statusText}`);
      }
      console.log('JSON carregado com sucesso.');
      return response.json();
    })
    .then(data => {
      console.log('Dados JSON:', data);
      const service = data.services.find(s => s.id === serviceId);
      console.log('Serviço encontrado:', service);

      if (service) {
        // Selecionar o elemento `div` usando o ID dynamic-content
        const dynamicContent = document.getElementById('dynamic-content');
        console.log('Elemento dynamic-content:', dynamicContent);

        if (dynamicContent) {
          dynamicContent.innerHTML = ''; // Limpar o conteúdo existente

          if (isProgramaEquipesPage) {
            console.log('Atualizando conteúdo para programa-equipes.html');

            dynamicContent.innerHTML = `
              <div class="seguranca-psicologica-programa">
                <h2>${service.title}</h2>
                <p>${service.description}</p>
                <h3>${service.stepsTitle}</h3>
                <ul>
                  ${service.steps.map(step => `<li>${step}</li>`).join('')}
                </ul>
              </div>
              <img class="svg-seguranca-psicologica-programa" src="${service.image}" alt="Imagem do serviço">
            `;

          } else if (isProgramaMulheresPage) {
            console.log('Atualizando conteúdo para programa-mulheres.html');

            dynamicContent.innerHTML = `
              <div class="programa__sobre">
                <div class="programa__texto">
                  <div class="pg-servico-titulo">
                    <img class="pg-servico-icone" src="${service.icon}" alt="Ícone do serviço">
                    <h2>${service.title}</h2>
                  </div>
                  <ul>
                    ${service.description.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
                <div class="programa__duracao">
                  <p id="text-to-highlight">${service.duration}</p>
                  <div class="highlight"></div>
                </div>
              </div>
              <div class="programa__conteudo">
                ${serviceId === 'programa-deep' ? `
                  <img class="programa__conteudo__img" src="${service.contentImage}" alt="Imagem do conteúdo">
                  <ol class="programa__conteudo__lista">
                    ${service.contentSteps.map(step => `<li>${step}</li>`).join('')}
                  </ol>
                ` : `
                  <div class="programa__circles">
                    ${service.contentCircles.map(circle => `<div class="programa__circle">${circle}</div>`).join('')}
                  </div>
                  <ol class="programa__conteudo__lista">
                    ${service.contentSteps.map(step => `<li>${step}</li>`).join('')}
                  </ol>
                `}
              </div>
            `;
          }
        } else {
          console.warn("Elemento 'dynamic-content' não encontrado.");
        }
      } else {
        console.error('Serviço não encontrado:', serviceId);
      }
    })
    .catch(error => console.error('Erro ao carregar serviços:', error));
}


