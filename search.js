// https://www.omdbapi.com/?apikey=eeef1900&s=fast title: FAST
// http://www.omdbapi.com/?i=tt3896198&apikey=eeef1900


const searchResults = document.querySelector(".search__results");
const inputObject = document.querySelector(".nav__bottom--input");
const searchValue = document.querySelector(".search__bar--left--value");

async function inputListener(event) {
    let title = inputObject.value;
    localStorage.setItem("title", title);
    try {
      if (event.keyCode === 13) {
        const OMDbAPI = await fetch(
          `https://www.omdbapi.com/?apikey=eeef1900&s=${title}`
        );
        const OMDbAPIData = await OMDbAPI.json();
  
        searchResults.innerHTML = OMDbAPIData.Search.map((result) =>
          resultHTML(result)
        ).join("");
        searchValue.innerHTML = `"${title}"`;
      }
    } catch (err) {
      searchResults.innerHTML = notFound();
      searchValue.innerHTML = ``;
    }
    localStorage.clear()
}

async function hitAPI() {
  let title = localStorage.getItem("title");
  const OMDbAPI = await fetch(
    `https://www.omdbapi.com/?apikey=eeef1900&s=${title}`
  );
  const OMDbAPIData = await OMDbAPI.json();
  const searchResults = document.querySelector(".search__results");
  try {
    if(title === null){
        searchResults.innerHTML = notChosen();
        searchValue.innerHTML = ``;
    }
    else{
    searchResults.innerHTML = OMDbAPIData.Search.map((result) =>
    resultHTML(result)
    ).join("");
    searchValue.innerHTML = `"${title}"`;
    }
  } catch (err) {
    searchResults.innerHTML = notFound();
    searchValue.innerHTML = ``;
  }
  localStorage.clear()
}

hitAPI()

async function filterAPI(filter){
    const title = localStorage.getItem('title')
    const OMDbAPI = await fetch(`https://www.omdbapi.com/?apikey=eeef1900&s=${title}`);
    const OMDbAPIData = await OMDbAPI.json();

    if(inputObject.value === title){
        let title = inputObject.value
        const OMDbAPI = await fetch(`https://www.omdbapi.com/?apikey=eeef1900&s=${title}`);
        const OMDbAPIData = await OMDbAPI.json();
    }

    if(filter.value === 'NEW_TO_OLD'){
        OMDbAPIData.Search.sort((a,b) => (b.Year) - (a.Year));
        console.log('sorted new to old')
    }
    else if (filter.value === 'OLD_TO_NEW'){
      OMDbAPIData.Search.sort((a,b) => (a.Year) - (b.Year));
      console.log('old to new')
    }

    searchResults.innerHTML = OMDbAPIData.Search.map((result) => resultHTML(result)).join("");
}


function resultHTML(result) {
  if (result.Poster === "N/A") {
    return `<div class="search__result">
        <figure>
        <img src="./assets/noimgavailable.jpg" alt="" class="search__result--poster">
        </figure>
        <h3 class="result__title">
             ${result.Title}
        </h3>
        <h3 class="result__type ">
           Type: <span style="text-transform: capitalize;">${result.Type}</span>
        </h3>
        <h3 class="result__date">
           Release Date: ${result.Year}
        </h3>
    </div>`;
  } else {
    return `
    <div class="search__result">
        <figure>
        <img src="${result.Poster}" alt="" class="search__result--poster">
        </figure>
        <h3 class="result__title">
             ${result.Title}
        </h3>
        <h3 class="result__type ">
           Type: <span style="text-transform: capitalize;">${result.Type}</span>
        </h3>
        <h3 class="result__date">
           Release Date: ${result.Year}
        </h3>
    </div>`;
  }
}

function notFound() {
  return `
                          <div class="search__result--failed">
    <h1 class="search__result--failed">
        Couldn't find your search.
    </h1>
</div>`;
}

function notChosen(){
    return `
                            <div class="search__result--notchosen">
    <h1 class="search__result--notchosen--h1">
        Type in the name of your movie!
    </h1>
</div>`;
}

function leftPage(){
    localStorage.clear()
}

function openMenu(){
  document.body.classList += "menu--open"
}

function closeMenu(){
  document.body.classList.remove('menu--open')
}