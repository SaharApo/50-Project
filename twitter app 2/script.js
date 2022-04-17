const form = document.getElementById("form")
const input = document.getElementById("input")
const msg = document.getElementById("msg")
const posts = document.getElementById("posts")

let data = {};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("btn click")
    formValidation();
    acceptData();
})

const formValidation = () => {
    if(input.value === ""){
        msg.innerHTML = "Post cannot be empty"
        console.log("failed")
    } else {
        console.log("success")
        msg.innerHTML = ""
    }
};

let acceptData = () => {
    data["text"] = input.value
    console.log(data)
    createPost()
}

let createPost = () => {
    posts.innerHTML += `
    <div>
       <p>${data.text}</p>
       <span class="options">
          <i onclick="editPost(this)" class="fas fa-edit"></i>
          <i onclick="deletePost(this)" class="fas fa-trash-alt"></i>
       </span>
    </div>
`;
    input.value = "";
}


let deletePost = (e) => {
    e.parentElement.parentElement.remove()
}

let editPost = (e) => {
    input.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove()
}