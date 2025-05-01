const { countries } = require('country-data');

const getCallingCodeFromCountryCode = async (code) => {
  const country = countries[code];

  const callingCodes = country.countryCallingCodes[0]



  // console.log(ExchangeRate)
  
  return country ? callingCodes : '+1';
}



module.exports = getCallingCodeFromCountryCode