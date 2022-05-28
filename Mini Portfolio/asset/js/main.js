/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        
        tabContents.forEach(tc =>{ /* tc = tabcontent */
            tc.classList.remove('filters__active')
        })
        target.classList.add('filters__active')
        
        tabs.forEach(t => { /* t = tab */
            t.classList.remove('filter-tab-active')
        })
        tab.classList.add('filter-tab-active')
    })
})

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//We obtain the current theme that the interface has by validation the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

//We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark mode
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())

})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal('.profile__border')
sr.reveal('.profile__name', {delay: 500})
sr.reveal('.profile__profession', {delay: 600})
sr.reveal('.profile__social', {delay: 700})
sr.reveal('.profile__info-group', {interval:100, delay: 700})
sr.reveal('.profile__buttons', {delay: 800})
sr.reveal('.filters__content', {delay: 900})
sr.reveal('.filters', {delay: 1000})

/*=============== Add Project  ===============*/
const projectsModal = document.getElementById('projects')
const projects = [
        { type: "Game", name: "Insect Catch", image: "insect-catch-game.png", link: "Insect%20Catch%20Game" },
        { type: "App", name: "Movie App", image: "movie-app.png", link: "Movie%20App" },
        { type: "Feature", name: "Custom Range Slider", image: "custom-range-slider.png", link: "Custom%20Range%20Slider" }
    ];

for(let i = 0; i < projects.length; i++) {
    const platform = projects[i].type
    const website_name = projects[i].name
    const img = projects[i].image
    const link_to = projects[i].link

    const modal = document.createElement('article')
    modal.classList.add('project__card');
    modal.innerHTML = `
                     <img src="asset/img/project/${img}" alt="" class="projects__img">

                     <div class="projects__modal">
                            <div>
                                <span class="projects__subtitle">${platform}</span>
                                <h3 class="projects__title">${website_name} </h3>
                                <a href="../${link_to}" class="projects__button button button__small">
                                    <i class="ri-link"></i>
                                </a>
                            </div>
                         </div>
                `

    projectsModal.appendChild(modal)

}

//
// function create(){
// for(let i = 0; i < projects; i++) {
//     const modal = document.createElement('article')
//     modal.innerHTML = `
//                  <article class="project__card">
//                       <img src="asset/img/project/${projects[2]}" alt="" class="projects__img">
//
//                        <div class="projects__modal">
//                            <div>
//                                <span class="projects__subtitle">${projects[0}</span>
//                                 <h3 class="projects__title">${projects[1]}</h3>
//                                 <a href="../${projects[3]}" class="projects__button button button__small"><i class="ri-link"></i></a>
//                             </div>
//                       </div>
//                  </article>
//                   `
//                    }
//     projectsModal.appendChild(modal)
// }

// <img src="asset/img/project/${img}" alt="" class="projects__img">
//
//     <div class="projects__modal">
//         <div>
//             <span class="projects__subtitle">${platform}</span>
//             <h3 class="projects__title">${website_name} </h3>
//             <a href="../${link_to}" class="projects__button button button__small">
//                 <i class="ri-link"></i>
//             </a>
//         </div>
//     </div>
//     `