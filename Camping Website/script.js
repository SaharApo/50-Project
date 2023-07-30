/*================= Show menu ================= */
    const  navMenu = document.getElementById('nav-menu'),
        navOpen = document.getElementById('nav--toggle'),
        navClose = document.getElementById('nav-close');


/*=========== Menu Show ============ */
/* Validate if constant exists */
if (navMenu){
    navOpen.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*=========== Menu Hidden ============ */
/* Validate if constant exists */

if(navMenu){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*================= Remove Mobile Menu ================= */
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu');
    // When we click on the nav_link, we remoe the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*================= Change Background Header ================= */
const bgHeader = () => {
    const header = document.getElementById('header')
    //When we scroll is greater than 50 viewport height, add  bg-header class to header tag
    this.scrollY >= 50 ? header.classList.add('bg-header')
                        : header.classList.remove('bg-header')
    }
    window.addEventListener('scroll', bgHeader)

/*================= GSAP Animation ================= */
gsap.from('.home__img-2', 1.2, {opacity: 0, y: 200, delay: .1})
gsap.from('.home__img-3', 1.2, {opacity: 0, y: 200, delay: .5})
gsap.from('.home__data', 1.2, {opacity: 0, y: -60, delay: 1})
gsap.from('.home__bird-1', 1.2, {opacity: 0, x: -80, delay: 1.1})
gsap.from('.home__bird-2', 1.2, {opacity: 0, x: 80, delay: 1.2})
gsap.from('.home__img-1', 1.2, {opacity: 0, y: 200, delay: 1.2})
gsap.from('.home__img-4', 1.2, {opacity: 0, x: 200, delay: 1.3})



