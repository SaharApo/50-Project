const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");


// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];

const renderCalendar = () => {
    // let firstDayofMonth = new Date(currYear, currMonth, 1).getDate(), // getting first date of the month
    //     lastDateofMonth = new Date(currYear, currMonth +1, 0).getDate(), // getting last date of the month
    //     lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    // let liTag = "";

    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";


    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    };


    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        //adding active class to li id the current day,month and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }

    currentDate.innerText =`${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => { //adding click event on both icons
        //if clicked icon is previous icon then decrement current month cu 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 :currMonth + 1;

        if(currMonth < 0 || currMonth > 11){ //if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year with the new date year
            currMonth =date.getMonth(); // updating month year with the new date month
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});