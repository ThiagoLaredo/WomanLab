// // 
// export class SubMenu {
//     constructor(menuSelector) {
//       this.menu = document.querySelector(menuSelector);
//       this.initMenu();
//     }
  
//     initMenu() {
//       this.addSubMenuClass();
//       this.handleMenuEvents();
//     }
  
//     addSubMenuClass() {
//       const menuItems = this.menu.querySelectorAll('li');
//       menuItems.forEach(item => {
//         const submenu = item.querySelector('.submenu');
//         const spanElement = item.querySelector('span');
  
//         if (submenu && spanElement) {
//           item.classList.add('has-submenu');
          
//           // Verificar se a seta já foi adicionada
//           if (!spanElement.querySelector('.submenu-arrow')) {
//             const arrow = document.createElement('span');
//             arrow.classList.add('submenu-arrow');
//             arrow.innerHTML = '▼'; // Ícone de seta para baixo
//             spanElement.appendChild(arrow); // Adiciona a seta ao item do menu
//           }
//         }
//       });
//     }
  
//     handleMenuEvents() {
//       const isMobile = window.matchMedia("(max-width: 768px)").matches;
//       const menuItems = this.menu.querySelectorAll('.has-submenu');
  
//       menuItems.forEach(item => {
//         const submenu = item.querySelector('.submenu');
//         const arrow = item.querySelector('.submenu-arrow');
  
//         if (isMobile) {
//           item.addEventListener('click', (e) => {
//             e.preventDefault();
  
//             if (submenu && arrow) {
//               // Alterna a exibição do submenu no clique
//               const isOpen = submenu.classList.contains('active');
//               if (isOpen) {
//                 submenu.classList.remove('active');
//                 arrow.classList.remove('open');
//               } else {
//                 submenu.classList.add('active');
//                 arrow.classList.add('open');
//               }
//             }
//           });
//         } else {
//           item.addEventListener('mouseenter', () => {
//             if (submenu) submenu.style.display = 'flex';
//           });
//           item.addEventListener('mouseleave', () => {
//             if (submenu) submenu.style.display = 'none';
//           });
//         }
//       });
//     }
//   }
  

  

  