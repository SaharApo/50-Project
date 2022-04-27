const ratings = document.querySelectorAll('.ratings');
const sendBtn = document.querySelector('#btn');
const panel = document.querySelector('#panel');
let selectedRating = 'Satisfied'


panel.addEventListener('click', (e) => {
    if(e.target.parentNode.classList.contains('rating')) {
        removeActiveClasses()
        e.target.parentNode.classList.add('active');
        selectedRating = e.target.nextElementSibling.innerHTML
        console.log(selectedRating)
    }
})


function removeActiveClasses() {
    for (let i =0; i < ratings.length; i++) {
        ratings[i].classList.remove('active')
    }
}