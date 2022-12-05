var active = document.querySelector(".carousel-item.active")

var list = document.querySelectorAll(".carousel-item")

var clickActive = list.forEach((e) => {
    e.addEventListener('click', () => {
        list.forEach(f => f.classList.remove('active'));
        e.classList.add('active');
    })
})


