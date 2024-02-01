let desc;
let circle;
let sentence =
["[A young french developer]", 
"[HTML, JS, CSS]",
"[Tailwind, React, Vue]"];

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        typing("[A young french developer]", 100)
    }, 2000);
    desc = document.querySelector('#desc');
    const url = document.querySelector('.url');
    const picture = document.querySelector('.picture');
    url.addEventListener("mouseover", function() {
        picture.style.opacity = "100%";
    });
    url.addEventListener("mouseout", function() {
        picture.style.opacity = "0%";
    });
    const checkbox = document.querySelector('#checkbox');
    checkbox.addEventListener('click', ()=>{
        if(checkbox.checked) {
            circle.style.display = "none";
        } else {
            circle.style.display = "block"
        }
    })
});

function moveCircle(e) {
    circle = document.querySelector('.circle');
    circle.style.animationDuration = '8s';
    let posX = (e.pageX - 30)  + 'px';
    let posY = (e.pageY - 25) + 'px';
    circle.style.left = posX;
    circle.style.top = posY;
}

let animationDuration = 8000;
let lastScrollTime = 0;
let isScrolling = false;

document.addEventListener('wheel', (e) => {
    const now = performance.now();
    const deltaY = e.deltaY !== undefined ? e.deltaY : -e.wheelDeltaY;
    let scrollDirection = deltaY > 0 ? 1 : -1;
    if (scrollDirection === 1) {
        animationDuration *= 0.9;
    } else if (scrollDirection === -1) {
        animationDuration = Math.max(animationDuration * (1 + Math.abs(deltaY) / 1000), 2000);
    }
    animationDuration = Math.min(animationDuration, 8000);
    animationDuration = Math.max(animationDuration, 2000);
    circle.style.animationDuration = animationDuration + "ms";
    isScrolling = true;
    lastScrollTime = now;
});

window.addEventListener('mousemove', moveCircle);

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

let indexSentence = 1;

function deleteTyping(speed){
    let i = desc.innerHTML.length;
    let del = setInterval(() => {
        if(i <= 0) {
            clearInterval(del)
            desc.classList.add('anime')
            setTimeout(() => {
                desc.classList.remove('anime')
                if(indexSentence == sentence.length) {
                    indexSentence = 0;
                }
                typing(sentence[indexSentence], 100)
                indexSentence++
            }, 2000);
        } else {
            desc.innerHTML = desc.innerHTML.slice(0, -1);
            i--;
        }
    }, speed);
}

