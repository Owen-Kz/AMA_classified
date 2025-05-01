const updateExchangeRates = async (country, countryCode, exchangeRate, currency) =>{
    try{
        const response = await fetch(`${process.env.ENDPOINT}/y/updateExchangeRate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({country:country, countryCode:countryCode, exchangeRate, currency})
        });

        const responseData = await response.json();
       
        if (responseData.success) {
            return {success:responseData.success}
        }else{
            return {error:responseData.error}
        }
    }catch(error){
        return {error:error.message}
    }
}


module.exports = updateExchangeRates