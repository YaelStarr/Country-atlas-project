const baseUrl = 'https://restcountries.com/v3.1';


//https://restcountries.com/v3.1/{service}?fields={field},{field},{field}https://restcountries.com/v3.1/all?fields=name,capital,currencies

const getCountry = async (country = "Israel") => {
    try {
        //const res = await axios.get(`${baseUrl}/name/${country}/`);
        const res = await axios.get(`${baseUrl}/name/${country}?fields=name,capital,currencies,flags,population,region,cca3,languages,latlng,maps,borders`);
        console.log("res"+res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};


const getStateByCode = async (country = "Israel") => {
    try {
        const res = await axios.get(`${baseUrl}/alpha/${country}?fields=name,capital,currencies,flags,population,region,cca3,languages,latlng,maps,borders`);
        console.log("res"+res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const getAllStates = async () => {
    try {
       ;
        const res = await axios.get(`${baseUrl}/all?fields=name`);
        console.log("res"+res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};


export { getCountry, getStateByCode, getAllStates };

