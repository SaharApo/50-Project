const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector('.input-box input'),
passIndicator = document.querySelector('.pass-indicator'),
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => { // looping through each option checkbox
       if(option.checked) { // if checkbox is checked
           // if checkbox id isn't exc-duplicate && space
           if(option.id !== "exc-duplicate" && option.id !== "spaces"){
               // adding particular key value from character object to staticPassword
               staticPassword += characters[option.id];
           } else if(option.id === "spaces") { // if checkbox id is spaces
               staticPassword += `   ${staticPassword}     `; // adding space at the beginning & end of staticPassword
           } else { // else pass true value to excludeDuplicate
               excludeDuplicate = true;
           }
       }
    });

    for (let i = 0; i < passLength; i++) {
        // getting random character from static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){ // id excludeDuplicate is true
            // if randomPassword doesn't contains the current random charcter or randomChar is equal
            // to space " " then add random character to randomPassword
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { // else add random character to randomPassword
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword; // passing random password to password input value
}
    const updatePassIndicator = () => {
        passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
    }

const updateSlider = () => {
    // passing slider value as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => { //after 1500 ms, changing tick icon back to copy
        copyIcon.innerText = "copy_all";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);