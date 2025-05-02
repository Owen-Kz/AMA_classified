const { countries, currencies } = require('country-data');
const getExchangeRateToUSD = require('./getExchangeRate');
const updateExchangeRates = require('./updateExchangeRates');

const getCurrencyFromCountryCode = async (code) => {
  const country = countries[code];
  const currency = country ? country.currencies[0] : "USD"
  const callingCodes = country ? country.countryCallingCodes[0] : "+1"
  const countryName = country ? country.name : "USA"
  const ExchangeRate = await getExchangeRateToUSD(currency)


  

await updateExchangeRates(countryName, code, ExchangeRate, currency)
  


  // console.log(ExchangeRate)
  
  return country ? currency : 'USD';
}



module.exports = getCurrencyFromCountryCode