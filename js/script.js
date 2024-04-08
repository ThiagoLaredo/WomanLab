// import ScrollSuave from './modules/scroll-suave.js';
import MenuMobile from './modules/menu-mobile.js';
import ScrollAnima from './modules/scroll-anima.js';
import HeaderScroll from './modules/header-scroll.js';
import MySwiper from './modules/mySwiper.js';
import ConsoleTextEffect from './modules/text-effect.js';

// const scrollAnima = new ScrollAnima('[data-anime="scroll"]');
// scrollAnima.init();

const scrollAnima = new ScrollAnima('.swiper-slide');
scrollAnima.init();

const headerScroll = new HeaderScroll('.header');
headerScroll.init();

const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]' );
menuMobile.init();

new MySwiper();

const targetElement = document.getElementById('typing');


