import { getCountry, getStateByCode, getAllStates } from "./functions.js";
const countriesArr = ["USA", "Israel", "United Kingdom", "France", "Thailand"];


const createColCard = (obj) => {
    const colEl = document.createElement("div");
    colEl.className = "col-md-5 col-lg-4 p-2";
    colEl.setAttribute("data-aos", "fade-up");
    colEl.setAttribute("data-aos-duration", "2000");
    const cardEl = document.createElement("div");
    cardEl.className = "card p-2 shadow d-flex flex-column align-items-center m-sm-3 m-lg-5";
    cardEl.innerHTML = `
      <img class="w-100" height="45%"
      src="${obj.flags.png}" alt="${obj.flags.alt}" />
      <h4 class="display-6 align-self-start">${obj.name.common}</h4>
      <p>population: ${obj.population}</p>
      <p>region: ${obj.region}</p>
      <button type="button" id="infoBtn" class="btn btn-primary">more information</button> 
      `;

    const infoBtn = cardEl.querySelector("#infoBtn");
    infoBtn.addEventListener("click", () => {
        loadCountryInfo(obj);
    });
    colEl.append(cardEl);
    return colEl;
};

const addContentToDOM = (holder, content) => holder.append(content);

const render = async (country = 'Israel', holder = main, clean = true) => {
    const data = await getCountry(country);
    if (clean) holder.innerHTML = "";
    //addContentToDOM(holder, createColCard(data[0]));
    data.map((item) => addContentToDOM(holder, createColCard(item)));
};


const createMain = (obj) => {
    const section = document.createElement("section");
    section.className = "p-4 col-lg-4 col-xs-10 ";
    section.setAttribute("data-aos", "fade-down");
    section.setAttribute("data-aos-duration", "2000");
    const article = document.createElement("article");
    article.className = "col-10 m-4";
    const flagImg = document.createElement("div");
    const borderStates = document.createElement("div");
    borderStates.className = "row d-flex justify-content-center";
    borderStates.id = "border_id";

    article.innerHTML = `
    <h1>${obj.name.common}</h1>
    <h4>population: ${obj.population}</h4>
    <h4>region: ${obj.region}</h4>
    <h4>language: ${Object.values(obj.languages).join(', ')}</h4>
    <h4> capital: ${(obj.capital)}</h4>
    <h4> currencies: ${Object.values(obj.currencies)[0]['name']}, symbol: ${Object.values(obj.currencies)[0]['symbol']}</h4>
    <img class="w-100 mt-5" src="${obj.flags.png}" alt="${obj.flags.alt}" />
    `
    const borders = obj.borders;
    if (borders) {
        borders.forEach(async (element) => {
            const state = await getStateByCode(element);
            const stateName = state.name.common;
            const btn = document.createElement("button");
            btn.className = "btn btn-dark col-11 m-1";
            btn.innerHTML = `${stateName}`;
            borderStates.append(btn);
            btn.addEventListener("click", () => {
                try {
                    render(stateName, main);
                } catch (error) { }
            });
        });
    } else { borderStates.innerHTML += "none" };


    section.append(article);
    section.append(borderStates);
    return section;
};

const createMap = (obj) => {
    const map = document.createElement("div");
    map.className = "map col-lg-5 col-xs-10 p-0"
    map.setAttribute("data-aos", "fade-down");
    map.setAttribute("data-aos-duration", "2000");
    map.innerHTML = `<iframe class="col-12 w-100"  height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
    src="https://maps.google.com/maps?q=${obj.latlng[0]},${obj.latlng[1]}&hl=iw&z=7&amp;output=embed">
    </iframe>`;
    return map;
}


const renderAllInfo = async (country = 'Israel', holder = main) => {
    const data = await getCountry(country);
    holder.innerHTML = "";
    addContentToDOM(holder, createMain(data[0]));
    addContentToDOM(holder, createMap(data[0]));
};


const loadCountryInfo = (data) => {
    renderAllInfo(data.name.common, main);
};



const renderHome = async (countries = countriesArr, holder = main) => {
    holder.innerHTML = "";
    countries.map((country) => render(country, main, false))
};

renderHome();





const searchCountry = (event) => {
    try {
        const country = event.target.value;
        render(country, main);
    } catch (error) { }
};

searchInput.addEventListener("input", searchCountry);

const populateSelect = async () => {
    const countryNames = await getAllStates();
    const select = document.getElementById("countrySelect");
    select.innerHTML = "";

    countryNames.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.text = country.name.common;
        select.appendChild(option);
    });
};

populateSelect();

document.getElementById("countrySelect").addEventListener("change", (event) => {
    const selectedCountry = event.target.value;
    render(selectedCountry, main);
});


const stateLinks = document.querySelectorAll(".state");

stateLinks.forEach((stateLink) => {
    stateLink.addEventListener("click", (event) => {
        const state = countriesArr[(event.currentTarget.id) * 1];
        render(state, main);
    });
});

const home = document.getElementById("home");

home.addEventListener("click", (event) => {renderHome(countriesArr, main)});
