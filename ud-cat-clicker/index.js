function getCatShortInfo(cat, index){
    const itemDiv = document.createElement('div');
    const itemSpan = document.createElement('span');
    itemSpan.innerHTML = cat.name;
    itemDiv.appendChild(itemSpan);
    itemDiv.classList.add('cat-list-item');
    itemDiv.addEventListener('click', () => {
        itemSelected.classList.remove('selected');
        itemDiv.classList.add('selected');
        catContainer.replaceChild(cats[index], catSelected);
        catSelected = cats[index];
        itemSelected = itemDiv;
    })
    return itemDiv;
}

function getCatInfo(cat){
    const div = document.createElement('div');
    const nameDiv = document.createElement('span');
    nameDiv.innerHTML = cat.name + ': ';
    div.appendChild(nameDiv);
    const counterDiv = document.createElement('span');
    counterDiv.innerHTML = cat.counter;
    div.appendChild(counterDiv);
    const image = document.createElement('img');
    image.src = catsDir + cat.image;
    image.className = 'cat-image';
    image.addEventListener('click', () => {
        cat.counter++;
        counterDiv.innerHTML = cat.counter;
    });
    div.appendChild(image);
    return div
}

const catsData = [ 
    { name: 'Mauzi', image: 'mauzi.png',counter: 0 }, 
    { name: 'Mew', image: 'mew.jpg', counter: 0 },
    { name: 'Espeon', image: 'espeon.png', counter: 0 },
    { name: 'Shinx', image: 'shinx.png', counter: 0 },                   
    { name: 'Skitty', image: 'skitty.png', counter: 0 },      
    { name: 'Purrloin', image: 'purrloin.png', counter: 0 },
];

const catsDir = 'assets/';
const listContainer = document.querySelector('.cats-list-container');
const catContainer = document.querySelector('.cat-container');
const cats = catsData.map(getCatInfo);
catsData.map(getCatShortInfo).map(div => listContainer.appendChild(div));
let itemSelected = document.querySelector('.cat-list-item');
let catSelected = cats[0];
itemSelected.classList.add('selected');
catContainer.appendChild(catSelected);
