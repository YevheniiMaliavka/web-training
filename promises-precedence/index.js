

let globalString = '?one'

const removeQuestionMarks = () => new Promise((resolve) => {
   setTimeout(() =>  {
        globalString=globalString.replace('?', '-');
        resolve();
    }, 1000);
});

const display = () => {
    console.log(globalString);
}

async function foo(){
    await removeQuestionMarks()
}

const main = async() => {
    await foo();
    display();
}

main();