import { getCountry } from "./functions.js";

getCountry();

const contentHolder = document.getElementById("content");

const createColCard = (obj) => {
    const colEl = document.createElement("div");
    colEl.className = "col-md-4 p-1";
    const cardEl = document.createElement("div");
    cardEl.className = "card p-2 shadow d-flex flex-column align-items-center m-5";
    cardEl.innerHTML = `
      <img class="w-100"
      src="${obj.flags.png}" alt="${obj.flags.alt}" />
      <h4 class="display-6 align-self-start">${obj.name.common}</h4>
      <p>population: ${obj.population}</p>
      <p>region: ${obj.region}</p>
      `;
    colEl.append(cardEl);
    return colEl;
};

const addContentToDOM = (holder, content) => holder.append(content);

const render = async (country = 'Israel', holder = content) => {
    const data = await getCountry(country);
    console.log(data);
    holder.innerHTML = "";
    addContentToDOM(holder, createColCard(data[0]));
};


// input and click on search
render();


const searchCountry = (event) => {
    try{
    const country = event.target.value;
    console.log(country);
    render(country, content);
    } catch (error){}
};

// render(contentHolder, products);
searchInput.addEventListener("input", searchCountry);

//this.languages = Object.keys(item.languages);