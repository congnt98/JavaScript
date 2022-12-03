const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    toolBtns = document.querySelectorAll(".tool"),
    handleColor = document.querySelectorAll(".colors #option"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider");



let preMouseX, preMouseY, snaphot,
    selectedTool = "brush",
    isDrawing = false,
    selectedColor = "#000",
    brushWidth = 5;



window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawRect = (e) => {
    if (!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, preMouseX - e.offsetX, preMouseY - e.offsetY)
    }
    ctx.fillRect(e.offsetX, e.offsetY, preMouseX - e.offsetX, preMouseY - e.offsetY)


}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((preMouseX - e.offsetX), 2) + Math.pow((preMouseY - e.offsetY), 2));
    ctx.arc(preMouseX, preMouseY, radius, 0, 2 * Math.PI, false);


    fillColor.checked ? ctx.fill() : ctx.stroke();
}


const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(preMouseX, preMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(preMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDrawing = (e) => {
    isDrawing = true;
    preMouseX = e.offsetX;
    preMouseY = e.offsetY;
    snaphot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
}

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snaphot, 0, 0);

    if (selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    }
    else if (selectedTool === "triangle") {
        drawTriangle(e);
    }
}

sizeSlider.addEventListener("change", () => {
    brushWidth = sizeSlider.value
})

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    })
})


handleColor.forEach(color => {
    color.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        color.classList.add("selected");
        selectedTool = btn.id;
    })
})


canvas.addEventListener("mousedown", startDrawing)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", () => isDrawing = false);
