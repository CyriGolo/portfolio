document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        typing("[A young french developer]", 100)
    }, 2000);
    const url = document.querySelector('.url');
    const picture = document.querySelector('.picture');
    url.addEventListener("mouseover", function() {
        picture.style.opacity = "100%";
    });
    url.addEventListener("mouseout", function() {
        picture.style.opacity = "0%";
    });
});

let circle = document.querySelector('.circle');
circle.style.animationDuration = '8s';

function moveCircle(e) {
    let posX = (e.pageX - 35)  + 'px';
    let posY = (e.pageY - 35) + 'px';
    circle.style.left = posX;
    circle.style.top = posY;
}

let animationDuration = 8000; // Durée d'animation initiale de 8 secondes
let lastScrollTime = 0;
let isScrolling = false;

document.addEventListener('wheel', (e) => {
    const now = performance.now();
    const deltaY = e.deltaY !== undefined ? e.deltaY : -e.wheelDeltaY;

    let scrollDirection = deltaY > 0 ? 1 : -1; // 1 pour vers le bas, -1 pour vers le haut

    if (scrollDirection === 1) { // Scroll vers le bas
        animationDuration *= 0.9; // Réduction lente
    } else if (scrollDirection === -1) { // Scroll vers le haut
        animationDuration = Math.max(animationDuration * (1 + Math.abs(deltaY) / 1000), 2000); // Augmentation progressive en fonction de la quantité de défilement, minimum de 2 secondes
    }

    animationDuration = Math.min(animationDuration, 8000); // Maximum de 8 secondes
    animationDuration = Math.max(animationDuration, 2000); // Minimum de 2 secondes

    circle.style.animationDuration = animationDuration + "ms";

    isScrolling = true;
    lastScrollTime = now;
});











window.addEventListener('mousemove', moveCircle);

let desc = document.querySelector('#desc');

function typing(txt, speed){
    let i = 0;
    desc.classList.remove('anime')
    let type = setInterval(() => {
        if(i >= txt.length) {
            clearInterval(type)
            desc.classList.add('anime')
            setTimeout(() => {
                desc.classList.remove('anime')
                deleteTyping(100);
            }, 2000);
        } else {
            desc.innerHTML += txt.charAt(i);
            i++
        }
    }, speed);
}

function deleteTyping(speed){
    let i = desc.innerHTML.length;
    let del = setInterval(() => {
        if(i <= 0) {
            clearInterval(del)
            desc.classList.add('anime')
            setTimeout(() => {
                desc.classList.remove('anime')
                typing("[A young french developer]", 100)
            }, 2000);
        } else {
            desc.innerHTML = desc.innerHTML.slice(0, -1);
            i--;
        }
    }, speed);
}