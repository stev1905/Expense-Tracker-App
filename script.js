let button = document.getElementsByClassName('btn btn-primary btn-lg btn-block')[0];

const testFunc = () => {
    console.log('this button works!')
}

button.addEventListener('click', testFunc);