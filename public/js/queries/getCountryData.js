
  async function getCountryData(){
    return fetch(`/getCountryData`, {
        method: "POST"
    }).then(res => res.json())
      .then(data => {
       

          if (data) {
              return data.country;
          } else {
              return null;
          }
      });
  }
  let Currency = "USD"
  let ExchangeRate = "1";
  (async () => {
    const currentExchangeRate = await getCountryData();
    if (currentExchangeRate) {
      Currency = currentExchangeRate.currency;
      ExchangeRate = currentExchangeRate.current_rate;
    
    } else {
    //   alert("Failed to get exchange rate");
    }
  })();
