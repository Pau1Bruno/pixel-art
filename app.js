const board = document.querySelector(".board");
const input = document.querySelector(".dimension");
const color = document.querySelector(".color");
const mode = document.querySelector("#mode");

var size;
var prevColor = color.value;
var isPaint = false;
console.log(mode.selectedIndex)

mode.addEventListener("change", () => {
    console.log(mode.selectedIndex)
    mode.selectedIndex ? color.value = "#ffffff" : color.value = prevColor;
})

function draw(size) {
    board.style.setProperty("--size", size);
    board.setAttribute("draggable", "false");
    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement("div");
        pixel.setAttribute("draggable", "false");
        pixel.classList.add("pixel");
        board.appendChild(pixel);

        pixel.addEventListener("mouseover", () => {
            if (!isPaint) return undefined;
            pixel.style.backgroundColor = color.value;
        })

        pixel.addEventListener('mousedown', (event) => {
            event.preventDefault();
            pixel.style.backgroundColor = color.value;
        })
    }
}

draw(size);

function redraw() {
    board.innerHTML = '';
    draw(size);
}

board.addEventListener("mousedown", () => {
    isPaint = true;
});

board.addEventListener("mouseleave", () => {
    isPaint = false;
});

board.addEventListener("mouseup", () => {
    isPaint = false;
});

// resetBtn.addEventListener('click', reset)

input.addEventListener('keyup', function () {
    size = input.value.replace(/[^0-9]/g, '');
    size = size > 50 ? 50 : size;
    this.value = size;
    redraw();
})
