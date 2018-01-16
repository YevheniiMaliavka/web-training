const inBox = document.querySelector('.in-box');
const box = document.querySelector('.box');
inBox.addEventListener('click', (e) => {
    e.target.classList.toggle('in-box-animation');
    box.classList.toggle('box-animation');
});
