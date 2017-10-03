const images = document.querySelectorAll('.slider-images img');
const buttonPrev = document.querySelector('.slider-controls .button-prev');
const buttonNext = document.querySelector('.slider-controls .button-next');

let currentIndex = 0;

function onButtonClick(action) {
    images[currentIndex].style.display = 'none';
    action();
    images[currentIndex].style.display = 'block';
}

buttonNext.onclick = () => {
    onButtonClick(() => ++currentIndex >= images.length ?
        currentIndex = 0 : currentIndex
    )
}

buttonPrev.onclick = () => {
    onButtonClick(() => --currentIndex < 0 ?
        currentIndex = images.length - 1 : currentIndex
    )
}