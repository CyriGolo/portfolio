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

function moveCircle(e) {
    let posX = (e.pageX - 35)  + 'px';
    let posY = (e.pageY - 35) + 'px';
    circle.style.left = posX;
    circle.style.top = posY;
}

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