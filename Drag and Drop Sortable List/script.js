const sortablelist = document.querySelector(".sortable-list");
const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        //adding dragging class to item after a delay
       setTimeout(() =>  item.classList.add("dragging"), 0);
    });
    //removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"))
});

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItems = sortablelist.querySelector('.dragging');

    // getting all items except current dragging and making array of them
    const siblings = [...sortablelist.querySelectorAll(".item:not(.dragging)")];


    // finding the siblings after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
       return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    //inseting the dragging item before the found sibling
    sortablelist.insertBefore(draggingItems, nextSibling);
}

sortablelist.addEventListener("dragover", initSortableList);
sortablelist.addEventListener("dragenter", e => e.preventDefault());



