// Variables globales
let desc;
let circle;
let picture;
const sentence = [
    "[A young french developer]", 
    "[HTML, JS, CSS]",
    "[Tailwind, React, Vue]"
];
let indexSentence = 0;
let animationDuration = 8000;
let lastScrollTime = 0;
let isScrolling = false;

// Fonction principale d'initialisation
document.addEventListener("DOMContentLoaded", function() {
    desc = document.querySelector('#desc');
    circle = document.querySelector('.circle');
    picture = document.querySelector('.picture');
    if (!desc || !circle) return; // Vérification de l'existence des éléments

    // Initialisation des événements
    initEvents();

    // Typage initial avec un délai de 2 secondes
    setTimeout(() => {
        typing(sentence[indexSentence], 100);
    }, 2000);
});

// Initialisation des événements
function initEvents() {
    const url = document.querySelector('.url');
    const checkbox = document.querySelector('#checkbox');

    if (url) {
        url.addEventListener("mouseover", handleMouseOver);
        url.addEventListener("mouseout", handleMouseOut);
    }
    if (checkbox) {
        checkbox.addEventListener('click', handleCheckboxClick);
    }
    document.addEventListener('wheel', handleWheel);
    window.addEventListener('mousemove', moveCircle);
}

// Gestion de l'événement mouseover pour afficher l'image de profil
function handleMouseOver() {
    if (!picture) return;
    picture.style.opacity = "100%";
}

// Gestion de l'événement mouseout pour masquer l'image de profil
function handleMouseOut() {
    if (!picture) return;
    picture.style.opacity = "0%";
}

// Gestion de l'événement click sur la case à cocher pour afficher ou masquer le curseur animé
function handleCheckboxClick() {
    if (!circle) return;
    const checkbox = document.querySelector('#checkbox');
    circle.style.display = checkbox.checked ? "none" : "block";
}

// Gestion de l'événement de défilement de la souris pour ajuster la durée d'animation
function handleWheel(e) {
    if (!circle) return;
    const now = performance.now();
    const deltaY = e.deltaY !== undefined ? e.deltaY : -e.wheelDeltaY;
    let scrollDirection = deltaY > 0 ? 1 : -1;
    animationDuration = calculateAnimationDuration(scrollDirection);
    circle.style.animationDuration = animationDuration + "ms";
    isScrolling = true;
    lastScrollTime = now;
}

// Calcul de la durée d'animation en fonction de la direction du défilement
function calculateAnimationDuration(scrollDirection) {
    let newDuration = animationDuration;
    if (scrollDirection === 1) {
        newDuration *= 0.9;
    } else if (scrollDirection === -1) {
        newDuration = Math.max(newDuration * (1 + Math.abs(deltaY) / 1000), 2000);
    }
    return Math.min(Math.max(newDuration, 2000), 8000);
}

// Gestion de l'événement de déplacement de la souris pour déplacer le curseur animé
function moveCircle(e) {
    if (!circle) return;
    let posX = (e.pageX - 30) + 'px';
    let posY = (e.pageY - 25) + 'px';
    circle.style.left = posX;
    circle.style.top = posY;
}

// Fonction pour afficher le texte avec effet de dactylographie
function typing(txt, speed) {
    let i = 0;
    desc.classList.remove('anime');
    let type = setInterval(() => {
        if (i >= txt.length) {
            clearInterval(type);
            desc.classList.add('anime');
            setTimeout(() => {
                desc.classList.remove('anime');
                deleteTyping(100);
            }, 2000);
        } else {
            desc.innerHTML += txt.charAt(i);
            i++;
        }
    }, speed);
}

// Fonction pour supprimer le texte avec effet de dactylographie
function deleteTyping(speed) {
    let i = desc.innerHTML.length;
    let del = setInterval(() => {
        if (i <= 0) {
            clearInterval(del);
            desc.classList.add('anime');
            setTimeout(() => {
                desc.classList.remove('anime');
                indexSentence = (indexSentence + 1) % sentence.length;
                typing(sentence[indexSentence], 100);
            }, 2000);
        } else {
            desc.innerHTML = desc.innerHTML.slice(0, -1);
            i--;
        }
    }, speed);
}