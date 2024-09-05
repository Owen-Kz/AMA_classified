const signup =  async (req,res) =>{
    const { username, password, country, firstname, lastname, phonenumber, email } = req.body;

    // Prepare the data to send in the POST request
    const data = {
        username: username,
        password: password,
        email: email,
        firstname: firstname, 
        lastname: lastname,
        phonenumber: phonenumber,
        country, country
    };

    try {
        // Make the POST request to another endpoint
        const response = await fetch(`${process.env.ENDPOINT}/y/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const responseData = await response.json();
        // Handle the response from the external endpoint
        if(responseData.error){
            res.json({
                message: responseData.error,
                externalResponse: responseData
            });
            
        }else{
            res.json({
                success: responseData.success,
                message: 'User registered successfully! Check you email to verify and Login',
                externalResponse: responseData
            });
        }
     
    } catch (error) {
        console.log(error)
        // Handle any errors that occur during the request
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
}


module.exports = signup