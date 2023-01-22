const palettes = document.querySelector('.container')

var colors = [ "#FFC0CB", "#0000FF", "#6A5ACD", "#B8860B", "#228B22", "#BDB76B", "#483D8B", "#FFFF00", "#00FFFF", "#808080", "#000080", "#708090", "#D8BFD8" ,"#FAF0E6","#8FBC8F", "#008000", "#A0522D", "#8A2BE2", "#B22222", "#FF7F50", "#87CEEB", "#ADFF2F", "#F5F5DC", "#4682B4", "#E0FFFF", "#FFE4E1", "#4B0082", "#0000CD", "#006400", "#F0FFFF", "#5F9EA0", "#A9A9A9", "#7CFC00", "#E6E6FA", "#FFA500", "#00CED1", "#7B68EE", "#A52A2A", "#FF00FF", "#DAA520", "#20B2AA", "#FF4500", "#FF0000", "#32CD32", "#FFF8DC", "#EE82EE", "#000000", "#00FFFF", "#8B0000", "#556B2F"]



function createColorCard{
    const cardHTML = `
        <div class="color-main">
            <div class="color" id="color_picker"></div>
            <div class="code" id="color_code">#dfsfd</div>
        </div>
        `
    palettes.innerHTML = cardHTML;
}

createUserCard()