const updateWalletBalance = async (token, sessionId, amount) =>{
    try{
        const response = await fetch(`${process.env.ENDPOINT}/y/updateAccountBalance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token, sessionId:sessionId, amount:amount})
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


module.exports = updateWalletBalance