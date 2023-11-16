const baseUrl = 'https://restcountries.com/v3.1';


//https://restcountries.com/v3.1/{service}?fields={field},{field},{field}https://restcountries.com/v3.1/all?fields=name,capital,currencies

const getCountry = async (country = "Israel") => {
    try {
        //const res = await axios.get(`${baseUrl}/name/${country}/`);
        const res = await axios.get(`${baseUrl}/name/${country}?fields=name,capital,currencies,flags,population,region,cca3,languages,latlng,maps`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

getCountry();

export { getCountry };





const searchCountry = (event) => {
    const Country = event.target.value;
    console.log(Country);
};
