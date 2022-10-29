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
        { type: "Feature", name: "Dynamic Calendar", image: "dynamic-calender.png", link: "Dynamic%20Calender" },
        { type: "Feature", name: "Loading Dots", image: "Loading-Dots.png", link: "Loading%20Dots" },
        { type: "Feature", name: "Random Password Generator 2", image: "Random-Password-Generator-2.png", link: "Random%20Password%20Generator%202" }, // 29/10
        { type: "Feature", name: "Liquid Navigation Menu Indicator", image: "Liquid-Navigation.png", link: "liquid%20navigation%20mobile" },
        { type: "Feature", name: "Responsive juice Website", image: "ResponsiveJuiceWebsite.png", link: "responsive%20juice%20website%20main" },
        { type: "Game", name: "Insect Catch", image: "insect-catch-game.png", link: "Insect%20Catch%20Game" },
        { type: "App", name: "Movie App", image: "movie-app.png", link: "Movie%20App" },
        { type: "App", name: "Todo List", image: "todo-list.png", link: "Todo%20List" },
        { type: "App", name: "Pokedex", image: "pokedex.png", link: "Pokedex" },
        { type: "App", name: "Notes App", image: "notes-app.png", link: "Notes%20App" },
        { type: "Feature", name: "Custom Range Slider", image: "custom-range-slider.png", link: "Custom%20Range%20Slider" },
        { type: "Feature", name: "Theme clock", image: "theme-clock.png", link: "Theme%20clock" },
        { type: "Feature", name: "3D Background Boxes", image: "3d-background-boxes.png", link: "3D%20Background%20Boxes" },
        { type: "Feature", name: "Animated Navigation", image: "animated-navigation.png", link: "Animated%20Navigation" },
        { type: "Feature", name: "Auto Text Effect", image: "auto-text-effect.png", link: "Auto%20Text%20Effect" },
        { type: "App", name: "Hoverboard", image: "hoverboard.png", link: "Hoverboard" },
        { type: "Feature", name: "Background Slider", image: "background-slider.png", link: "Background%20Slider" },
        { type: "Feature", name: "Blurry loading", image: "blurry-loading.png", link: "Blurry%20loading" },
        { type: "Feature", name: "Button Ripple Effect", image: "button-ripple-effect.png", link: "Button%20Ripple%20Effect" },
        { type: "Feature", name: "Conten Placeholder", image: "content-placeholder.png", link: "Conten%20Placeholder" },
        { type: "Feature", name: "Dad Joke", image: "dad-jokes.png", link: "Dad%20Joke" },
        { type: "Feature", name: "Double Heart Click", image: "double-click-heart.png", link: "Double%20Heart%20Click" },
        { type: "Feature", name: "Double Vartical Slider", image: "double-vertical-slider.png", link: "Double%20Vartical%20Slider" },
        { type: "Feature", name: "Drag N Drop", image: "drag-n-drop.png", link: "Drag%20N%20Drop" },
        { type: "App", name: "Drawing App", image: "drawing-app.png", link: "Drawing%20App" },
        { type: "App", name: "Drink Water", image: "drink-water.png", link: "/Drink%20Water" },
        { type: "Feature", name: "Event KeyCodes", image: "event-keycodes.png", link: "Event%20KeyCodes" },
        { type: "Feature", name: "Expanding Cards", image: "expanding-cards.png", link: "Expanding%20Cards" },
        { type: "Feature", name: "FAQ Collapse", image: "faq-collapse.png", link: "FAQ%20Collapse" },
        { type: "Feature", name: "Feedback UI Design", image: "feedback-ui-design.png", link: "Feedback%20UI%20Design" },
        { type: "Feature", name: "Form Wave Animation", image: "form-wave.png", link: "Form%20Wave%20Animation" },
        { type: "App", name: "Github Profiles", image: "github-profiles.png", link: "Github%20Profiles" },
        { type: "Feature", name: "Good, Cheap, Fast Checkbox", image: "good-cheap-fast.png", link: "Good,%20Cheap,%20Fast%20Checkbox" },
        { type: "Feature", name: "Hidden Search Widget", image: "hidden-search-widget.png", link: "Hidden%20Search%20Widget" },
        { type: "Feature", name: "image Carousel", image: "image-carousel.png", link: "image%20Carousel" },
        { type: "Feature", name: "Incrementing Counter", image: "incrementing-counter.png", link: "Incrementing%20Counter" },
        { type: "Feature", name: "Kinetic Loader", image: "kinetic-loader.png", link: "Kinetic%20Loader" },
        { type: "Feature", name: "Live User Filter", image: "live-user-filter.png", link: "Live%20User%20Filter" },
        { type: "Feature", name: "Mobile Tab Navigation", image: "mobile-tab-navigation.png", link: "Mobile%20Tab%20Navigation" },
        { type: "Feature", name: "Netflix Navigation", image: "netflix-mobile-navigation.png", link: "Netflix%20Navigation" },
        { type: "Feature", name: "Password Generator", image: "password-generator.png", link: "Password%20Generator" },
        { type: "Feature", name: "Password Strength Backround", image: "password-strength-background.png", link: "Password%20Strength%20Backround" },
        { type: "Feature", name: "Progress Steps", image: "progress-steps.png", link: "Progress%20Steps" },
        { type: "App", name: "Quiz UI", image: "quiz-app.png", link: "Quiz%20UI" },
        { type: "App", name: "Random Choice Picker", image: "random-choice-picker.png", link: "Random%20Choice%20Picker" },
        { type: "Feature", name: "Random Image Feed", image: "random-image-feed.png", link: "Random%20Image%20Feed" },
        { type: "Feature", name: "Rotating Navigation", image: "rotating-navigation-animation.png", link: "Rotating%20Navigation" },
        { type: "Feature", name: "Scroll Animation", image: "scroll-animation.png", link: "Scroll%20Animation" },
        { type: "App", name: "Sound Board", image: "sound-board.png", link: "Sound%20Board" },
        { type: "Feature", name: "Split Landing page", image: "split-landing-page.png", link: "Split%20Landing%20page" },
        { type: "Feature", name: "Sticky Navbar", image: "sticky-navbar.png", link: "Sticky%20Navbar" },
        { type: "Feature", name: "Testimonial Box Switcher", image: "testimonial-box-switcher.png", link: "Testimonial%20Box%20Switcher" },
        { type: "Feature", name: "Toast Notification", image: "toast-notification.png", link: "Toast%20Notification" },
        { type: "Feature", name: "verify Account Ui", image: "verify-account-ui.png", link: "verify%20Account%20Ui" }
];


for(let i = 0; i < projects.length; i++) {
    const platform = projects[i].type
    const website_name = projects[i].name
    const img = projects[i].image
    const link_to = projects[i].link

    const modal = document.createElement('article')
    modal.classList.add('project__card');
    modal.innerHTML = `
                     <img src="../Mini%20Portfolio/asset/img/project/${img}" alt="" class="projects__img">

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
/*=============== number Of Project LIGHT THEME ===============*/

const updateNumber = () => {
    // passing slider value as counter text
    document.getElementById('project__num').innerHTML = projects.length;
}

updateNumber();