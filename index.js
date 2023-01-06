const inputObject = document.querySelector(".input__input");


function inputListener(event){
    let title = inputObject.value;
    if (event.keyCode === 13 && title.length > 0) {
        localStorage.setItem("title", title);
        window.location.href = `${window.location.origin}/Advanced Projects/JavaScript FinalProject/search.html`;
    }
    else if (event.keyCode === 13 && title.length === 0){
        alert('Type in the movie title')
    }
}

function buttonListener(){
    let title = inputObject.value;
    if(title.length === 0){
        alert('Type in the movie title')
    }
    else{
        localStorage.setItem("title", title);
        window.location.href = `${window.location.origin}/Advanced Projects/JavaScript FinalProject/search.html`;
    }
}

function openMenu(){
    document.body.classList += "menu--open"
}

function closeMenu(){
    document.body.classList.remove('menu--open')
}