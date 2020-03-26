import coefficients from "./coefficients";

export const setCurrencyExchange = async () => {
    let response;
    try{
        response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        .then(response => response.json())
        .catch(error => console.log(error));
        coefficients.currencies.dollar.grivna = response[0].sale;
        coefficients.currencies.dollar.euro = response[0].sale / response[1].sale;
        coefficients.currencies.dollar.rubl = response[0].sale / response[2].sale;
        coefficients.currencies.euro.grivna = response[1].sale;
        coefficients.currencies.euro.dollar = response[1].sale / response[0].sale;
        coefficients.currencies.euro.rubl = response[1].sale / response[2].sale;
        coefficients.currencies.grivna.dollar = 1 / response[0].sale;
        coefficients.currencies.grivna.euro = 1 / response[1].sale;
        coefficients.currencies.grivna.rubl = 1 / response[2].sale;
        coefficients.currencies.rubl.grivna = response[2].sale;
        coefficients.currencies.rubl.dollar = 1 / coefficients.currencies.dollar.rubl;
        coefficients.currencies.rubl.euro = 1 / coefficients.currencies.euro.rubl;
    }catch{
        return;
    }
}  

export const convertValues = (inputFrom, ouputFrom, inputTo, selectFrom, selectTo, onConvert) => {
    if(inputFrom.value.trim() === "" || !inputFrom.value.match(/^[0-9]{1,}.{1}[0-9]{1,}$|^[0-9]{1,}$/)){
        inputFrom.classList.toggle("red-border", true);
        ouputFrom.classList.toggle("error-message", true);
        inputTo.value = "";
        event.preventDefault();
        return;
    }
    const value = parseInt(inputFrom.value);
    const from = selectFrom.value;
    const to = selectTo.value;

    onConvert(getValuesConvertedValue(value, from, to));
    inputTo.value = getValuesConvertedValue(value, from, to);
};

export const convertCurrencies = (inputFrom, ouputFrom, inputTo, selectFrom, selectTo, onConvert) => {
    if(inputFrom.value.trim() === "" || !inputFrom.value.match(/^[0-9]{1,}.{1}[0-9]{1,}$|^[0-9]{1,}$/)){
        inputFrom.classList.toggle("red-border", true);
        ouputFrom.classList.toggle("error-message", true);
        inputTo.value = "";
        event.preventDefault();
        return;
    }
    const value = parseFloat(inputFrom.value);
    const from = selectFrom.value;
    const to = selectTo.value;

    onConvert(getCurrenciesConvertedValue(value, from, to));
    inputTo.value = getCurrenciesConvertedValue(value, from, to);
};

export const getValuesConvertedValue = (convertValue, convertFrom, convertTo) => +(convertValue * coefficients.values[convertFrom][convertTo]).toFixed(2);
export const getCurrenciesConvertedValue = (convertValue, convertFrom, convertTo) => +(convertValue * coefficients.currencies[convertFrom][convertTo]).toFixed(2);
