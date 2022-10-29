let colors = ["green","yellow","blue","red","pink","indigo"];

function changeColors(){
    let toggle1 = document.querySelector("#toggle_1");
    let toggle2 = document.querySelector("#toggle_2");
    let toggle3 = document.querySelector("#toggle_3");
    let toggle4 = document.querySelector("#toggle_4");
    let toggle5 = document.querySelector("#toggle_5");
    let toggle6 = document.querySelector("#toggle_6");


    let randomColors = shuffle(colors);

    toggle1.className = "toggle toggle_1 w-8 bg-"+colors[0];
    toggle2.className = "toggle w-2 ml-1 bg-"+colors[1];
    toggle3.className = "toggle w-4 bg-"+colors[2];
    toggle4.className = "toggle w-6 ml-1 bg-"+colors[3];
    toggle5.className = "toggle w-6 bg-"+colors[4];
    toggle6.className = "toggle w-4 ml-1 bg-"+colors[5];

    console.log("changeColors",randomColors);
}
function shuffle(array){
    // I took this code from the internet, I am not sure how it works (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
    // This function will get an array and return a shuffle version of it with random order

    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}