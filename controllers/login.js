
const login = async (req,res) =>{

    const response = await fetch(`https://ama-endpoint.onrender.com/y/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });

    const responseData = await response.json(); 
    if(responseData.success){
        return res.json({success:"UserLoggedIn", token:responseData.cookie})
    }else{
        return res.json({error:"CouldNotLogin", message:responseData.message})
    }

}


module.exports = login