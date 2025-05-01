const ChargeWalletBalance = async (token, sessionId, amount) =>{
    try{
        const response = await fetch(`${process.env.ENDPOINT}/y/ChargeWallet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token, sessionId:sessionId, amount:amount})
        });

        const responseData = await response.json();
        console.log(responseData)
        if (responseData.success) {
            return {success:responseData.success}
        }else{
            return {error:responseData.error}
        }
    }catch(error){
        return {error:error.message}
    }
}


module.exports = ChargeWalletBalance