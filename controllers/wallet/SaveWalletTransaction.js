const saveWalletTransaction = async (sessionId, token, amount) =>{
    try{
        const response = await fetch(`${process.env.ENDPOINT}/y/saveWalletTransaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token,sessionId, amount})
        });

        const responseData = await response.json();

        if (responseData.success) {
            return {success:responseData.success}
        }else{
            return {error:responseData.error}
        }
    }catch(error){
        console.log(error)
        return {error:error.message}
    }
}

module.exports = saveWalletTransaction