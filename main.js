import { getCountry } from "./functions.js";

getCountry();

const loadCountryInfo = () => {
    console.log("444");
};


//const contentHolder = document.getElementById("content");

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
      <button type="button" id="infoBtn" class="btn btn-primary">more information</button>
      
      `;

      const infoBtn = cardEl.querySelector("#infoBtn");  
      infoBtn.addEventListener("click", () => {
        loadCountryInfo();
      });
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


//const contentMainHolder = document.getElementById("main");

const createMain = (obj) => {
    const section = document.createElement("section");
    section.className = "d-flex justify-content-around col-10 bg-danger";
    const article = document.createElement("article");
    article.className = "col-4 m-5";
    const flagImg = document.createElement("div");
    const map = document.createElement("div");
    article.innerHTML = `
    <h1>${obj.name.common}</h1>
    <h4>population: ${obj.population}</h4>
    <h4>region: ${obj.region}</h4>
    <h4>language: ${Object.values(obj.languages).join(', ')}</h4>
    <h4> capital: ${(obj.capital)}</h4>
    <img class="w-100 mt-5" src="${obj.flags.png}" alt="${obj.flags.alt}" />
    `
    //flagImg.innerHTML = `<img class="w-100" src="${obj.flags.png}" alt="${obj.flags.alt}" />`;
    map.innerHTML = `<iframe  width="100%" height="500px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
    src="https://maps.google.com/maps?q=${obj.latlng[0]},${obj.latlng[1]}&hl=iw&z=14&amp;output=embed">
    </iframe>`;
    
    //section.append(flagImg);
    section.append(article);
    section.append(map);
    return section;
};

const renderAllInfo = async (country = 'Israel', holder = main) => {
    const data = await getCountry(country);
    console.log(data);
    holder.innerHTML = "";
    addContentToDOM(holder, createMain(data[0]));
};


renderAllInfo();










const searchCountry = (event) => {
    try {
        const country = event.target.value;
        console.log(country);
        render(country, content);
    } catch (error) { }
};

// render(contentHolder, products);
searchInput.addEventListener("input", searchCountry);
//infoBtn.addEventListener("click", loadCountryInfo);

//this.languages = Object.keys(item.languages);
//<strong>Languages:</strong> ${Object.values(countryData[0].languages).join(' ')}<br>


// this.render = () => {   
//     let input= document.createElement("input");
//     input.addEventListener("click", checkChange);
//     input.type="checkbox";
//     let article= document.createElement("article");
//     article.addEventListener("dragstart", dragstart);
//     article.addEventListener("dragend", dragend);
//     article.innerHTML += `<h5>${this.title}</h5>
//     <p>${this.dueDates}</p>
//     <label for="${this.id}">is Completed</label><br>`;
//     article.append(input);
//     return article;
// };
// };
// הורדתי כמה שורות לא רלוונטיות
// וקראתי לרנדר ככה:
// container.append(current.render());
