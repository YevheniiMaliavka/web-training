document.querySelector('#box1').addEventListener('mouseover', (e) => {
    const box = e.target;
    box.classList.toggle('hovered');
})