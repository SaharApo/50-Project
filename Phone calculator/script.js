const darkTheme = document.getElementById('aaa');
const lightTheme = document.getElementById('bbb');


lightTheme.addEventListener('click', () =>{
    document.body.classList.add('dark-theme');
});

darkTheme.addEventListener('click', () =>{
    document.body.classList.remove('dark-theme')
})