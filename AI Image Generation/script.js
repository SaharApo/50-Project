const generateForm = document.querySelector('.generate-form');
const imageGallery = document.querySelector('.image-gallery');

const OPENAI_API_KEY = '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';
let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
       const imgCard = imageGallery.querySelectorAll(".img-card")[index];
       const imgElement = imgCard.querySelector('img');
       const downloadBtn = imgCard.querySelector('.download-btn');

       //Set the image source to the AI-generated image data
       const aiGeneratedImg = `data:image/png;base64,${imgObject.b64_json}`;
       imgElement.src = aiGeneratedImg;

       // when the image is loaded, remove the loading class and set download attribute
       imgElement.onload = () =>{
           imgCard.classList.remove('loading');
           downloadBtn.setAttribute("href", aiGeneratedImg);
           downloadBtn.setAttribute("download", `${new Date().getTime().jpg}`);

       }
    });
}


const generateAiImages = async (userPrompt, userImageQuantity) => {
    try {
        // send a request to the OpenAi API to generate images based on user inputs
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImageQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });

        if (!response.ok) throw new Error('Failed to generate images! Please try again.');
        
        const { data} = await response.json();  // get data from response
        updateImageCard([...data]);
    } catch (error) {
        alert(error.message);
    } finally {
        isImageGenerating = false;
    }
}



const  handleFormSubmission = (e) => {
    e.preventDefault();
    if (isImageGenerating) return;
    isImageGenerating = true;

    // Get user input and image quantity values fro, the form submission
    const userPrompt = e.srcElement[0].value;
    const userImageQuantity = e.srcElement[1].value;

    // Creating HTML markup for image cards with loading state
    const imgCardMarkup = Array.from({length: userImageQuantity}, () =>
        `<div class="img-card loading">
            <img src="images/loader.svg" alt="image">
            <a href="#" class="download-btn">
                <img src="images/download.svg" alt="download icon">
            </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImageQuantity);
}

generateForm.addEventListener('submit', handleFormSubmission);
