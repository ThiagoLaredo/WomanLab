

// export function loadServiceContent() {
//   // Obter o identificador do serviço da URL
//   let serviceId = window.location.hash.substring(1); // Remove o "#" da URL

//   // Verificar a página atual
//   const isProgramaMulheresPage = window.location.pathname.includes('programa-mulheres.html');
//   const isProgramaEquipesPage = window.location.pathname.includes('programa-equipes.html');

//   // Se não houver hash na URL, defina um hash padrão e redirecione
//   if (!serviceId) {
//     if (isProgramaMulheresPage) {
//       serviceId = 'programa-deep'; // Hash padrão para programa-mulheres
//     } else if (isProgramaEquipesPage) {
//       serviceId = 'programa-spt-basico'; // Hash padrão para programa-equipes
//     }
//     window.location.hash = serviceId; // Adiciona o hash na URL
//   }

//   // Fazer fetch dos dados do arquivo JSON
//   fetch('services.json')
//     .then(response => response.json())
//     .then(data => {
//       const service = data.services.find(s => s.id === serviceId);

//       if (service) {
//         if (isProgramaEquipesPage) {
//           // Atualizar conteúdo para a página programa-equipes.html
//           document.querySelector('.pg-seguranca-psicologica h2').textContent = service.title;
//           document.querySelector('.pg-seguranca-psicologica p').textContent = service.description;
//           document.querySelector('.pg-seguranca-psicologica h3').textContent = service.stepsTitle;

//           // Atualizar a lista de etapas
//           const ul = document.querySelector('.pg-seguranca-psicologica ul');
//           ul.innerHTML = ''; // Limpar conteúdo existente
//           service.steps.forEach(step => {
//             const li = document.createElement('li');
//             li.textContent = step;
//             ul.appendChild(li);
//           });

//           // Atualizar a imagem
//           document.querySelector('.svg-seguranca-psicologica-programa').src = service.image;

//         } else if (isProgramaMulheresPage) {
//           // Atualizar conteúdo para a página programa-mulheres.html
//           const dynamicContent = document.getElementById('dynamic-content');
//           dynamicContent.innerHTML = ''; // Limpar o conteúdo existente

//           // Criação de elementos dinâmicos com base no JSON
//           const programContainer = document.createElement('div');
//           programContainer.className = 'programa__sobre';

//           const programText = document.createElement('div');
//           programText.className = 'programa__texto';

//           const serviceTitle = document.createElement('div');
//           serviceTitle.className = 'pg-servico-titulo';
//           serviceTitle.innerHTML = `
//             <img class="pg-servico-icone" src="${service.icon}" alt="Ícone do ${service.title}">
//             <h2>${service.title}</h2>
//           `;

//           const descriptionList = document.createElement('ul');
//           service.description.forEach(item => {
//             const li = document.createElement('li');
//             li.textContent = item;
//             descriptionList.appendChild(li);
//           });

//           programText.appendChild(serviceTitle);
//           programText.appendChild(descriptionList);

//           const duration = document.createElement('div');
//           duration.className = 'programa__duracao';
//           duration.innerHTML = `
//             <p id="text-to-highlight-deep">${service.duration}</p>
//             <div class="highlight"></div>
//           `;

//           programContainer.appendChild(programText);
//           programContainer.appendChild(duration);
//           dynamicContent.appendChild(programContainer);

//           const programContent = document.createElement('div');
//           programContent.className = 'programa__conteudo';

//           if (serviceId === 'programa-deep') {
//             const contentImage = document.createElement('img');
//             contentImage.className = 'programa__conteudo__img';
//             contentImage.src = service.contentImage;
//             programContent.appendChild(contentImage);

//             const contentSteps = document.createElement('ol');
//             contentSteps.className = 'programa__conteudo__lista';
//             service.contentSteps.forEach(step => {
//               const li = document.createElement('li');
//               li.innerHTML = `<strong>${step.split(':')[0]}:</strong> ${step.split(':')[1]}`;
//               contentSteps.appendChild(li);
//             });
//             programContent.appendChild(contentSteps);
//           } else if (serviceId === 'programa-action') {
//             const contentCircles = document.createElement('div');
//             contentCircles.className = 'programa__circles';
//             service.contentCircles.forEach(circle => {
//               const div = document.createElement('div');
//               div.className = 'programa__circle';
//               div.textContent = circle;
//               contentCircles.appendChild(div);
//             });
//             programContent.appendChild(contentCircles);

//             const contentSteps = document.createElement('ol');
//             contentSteps.className = 'programa__conteudo__lista';
//             service.contentSteps.forEach(step => {
//               const li = document.createElement('li');
//               li.innerHTML = `<strong>${step.split(':')[0]}:</strong> ${step.split(':')[1]}`;
//               contentSteps.appendChild(li);
//             });
//             programContent.appendChild(contentSteps);
//           }

//           dynamicContent.appendChild(programContent);
//         }
//       } else {
//         console.error('Serviço não encontrado:', serviceId);
//       }
//     })
//     .catch(error => console.error('Erro ao carregar serviços:', error));
// }

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
      serviceId = 'programa-deep';
    } else if (isProgramaEquipesPage) {
      serviceId = 'programa-spt-basico';
    }
    window.location.hash = serviceId;
    console.log("Novo Hash Definido:", serviceId);
  }

  // Fazer fetch dos dados do arquivo JSON
  fetch('./services.json')
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
        if (isProgramaEquipesPage) {
          console.log('Atualizando conteúdo para programa-equipes.html');

          // Verifique a existência dos elementos
          const h2Element = document.querySelector('.pg-seguranca-psicologica h2');
          const pElement = document.querySelector('.pg-seguranca-psicologica p');
          const h3Element = document.querySelector('.pg-seguranca-psicologica h3');
          const ulElement = document.querySelector('.pg-seguranca-psicologica ul');
          const imgElement = document.querySelector('.svg-seguranca-psicologica-programa');

          console.log('Elementos encontrados:', {
            h2Element,
            pElement,
            h3Element,
            ulElement,
            imgElement
          });

          // Atualizar conteúdo para a página programa-equipes.html
          if (h2Element && pElement && h3Element && ulElement && imgElement) {
            h2Element.textContent = service.title;
            pElement.textContent = service.description;
            h3Element.textContent = service.stepsTitle;

            ulElement.innerHTML = ''; // Limpar conteúdo existente
            service.steps.forEach(step => {
              const li = document.createElement('li');
              li.textContent = step;
              ulElement.appendChild(li);
            });

            imgElement.src = service.image;
          } else {
            console.warn("Alguns elementos do DOM não foram encontrados.");
          }

        } else if (isProgramaMulheresPage) {
          console.log('Atualizando conteúdo para programa-mulheres.html');

          const dynamicContent = document.getElementById('dynamic-content');
          console.log('Elemento dynamic-content:', dynamicContent);

          if (dynamicContent) {
            dynamicContent.innerHTML = ''; // Limpar o conteúdo existente

            const programContainer = document.createElement('div');
            programContainer.className = 'programa__sobre';

            const programText = document.createElement('div');
            programText.className = 'programa__texto';

            const serviceTitle = document.createElement('div');
            serviceTitle.className = 'pg-servico-titulo';
            serviceTitle.innerHTML = `
              <img class="pg-servico-icone" src="${service.icon}" alt="Ícone do ${service.title}">
              <h2>${service.title}</h2>
            `;

            const descriptionList = document.createElement('ul');
            service.description.forEach(item => {
              const li = document.createElement('li');
              li.textContent = item;
              descriptionList.appendChild(li);
            });

            programText.appendChild(serviceTitle);
            programText.appendChild(descriptionList);

            const duration = document.createElement('div');
            duration.className = 'programa__duracao';
            duration.innerHTML = `
              <p id="text-to-highlight-deep">${service.duration}</p>
              <div class="highlight"></div>
            `;

            programContainer.appendChild(programText);
            programContainer.appendChild(duration);
            dynamicContent.appendChild(programContainer);

            const programContent = document.createElement('div');
            programContent.className = 'programa__conteudo';

            if (serviceId === 'programa-deep') {
              const contentImage = document.createElement('img');
              contentImage.className = 'programa__conteudo__img';
              contentImage.src = service.contentImage;
              programContent.appendChild(contentImage);

              const contentSteps = document.createElement('ol');
              contentSteps.className = 'programa__conteudo__lista';
              service.contentSteps.forEach(step => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${step.split(':')[0]}:</strong> ${step.split(':')[1]}`;
                contentSteps.appendChild(li);
              });
              programContent.appendChild(contentSteps);
            } else if (serviceId === 'programa-action') {
              const contentCircles = document.createElement('div');
              contentCircles.className = 'programa__circles';
              service.contentCircles.forEach(circle => {
                const div = document.createElement('div');
                div.className = 'programa__circle';
                div.textContent = circle;
                contentCircles.appendChild(div);
              });
              programContent.appendChild(contentCircles);

              const contentSteps = document.createElement('ol');
              contentSteps.className = 'programa__conteudo__lista';
              service.contentSteps.forEach(step => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${step.split(':')[0]}:</strong> ${step.split(':')[1]}`;
                contentSteps.appendChild(li);
              });
              programContent.appendChild(contentSteps);
            }

            dynamicContent.appendChild(programContent);
          } else {
            console.warn("Elemento 'dynamic-content' não encontrado.");
          }
        }
      } else {
        console.error('Serviço não encontrado:', serviceId);
      }
    })
    .catch(error => console.error('Erro ao carregar serviços:', error));
}

