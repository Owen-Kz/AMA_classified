const { countries, currencies } = require('country-data');
const getExchangeRateToUSD = require('./getExchangeRate');
const updateExchangeRates = require('./updateExchangeRates');

const getCurrencyFromCountryCode = async (code) => {
  const country = countries[code];
  const currency = country.currencies[0] ? country.currencies[0] : "USD"
  const callingCodes = country.countryCallingCodes[0]
  const countryName = country.name
  const ExchangeRate = await getExchangeRateToUSD(currency)


  

await updateExchangeRates(countryName, code, ExchangeRate, currency)
  


  // console.log(ExchangeRate)
  
  return country ? currency : 'USD';
}



module.exports = getCurrencyFromCountryCode