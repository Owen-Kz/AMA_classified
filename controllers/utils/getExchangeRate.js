const axios = require("axios");

const getExchangeRateFromUSD = async (currencyCode) => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API}/latest/USD`);
    return response.data.conversion_rates[currencyCode]; // e.g., NGN
  } catch (error) {
    console.error(`Failed to fetch exchange rate:`, error.message);
    return null;
  }
};

module.exports = getExchangeRateFromUSD;
