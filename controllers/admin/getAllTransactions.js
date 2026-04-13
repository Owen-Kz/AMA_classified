const { configDotenv } = require("dotenv");

const getTransactions = async (req,res) =>{
    if(req.cookies._ama && req.cookies._superID){
        try{
        const data ={
            uid: req.cookies._superID,
            token: req.cookies._ama
        }
            const response = await fetch(`${process.env.ENDPOINT}/y/admin/getTransactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
          
            if(responseData){
                if(responseData.success){
                    return res.json({success:"Transactions",TransactionsList:responseData.transactions})
                }else{
                    return res.json({error:responseData.error})
                }
            }else{
                return res.json({error:"Could Not Fetch Data"})
            }
            
        }catch(error){
            return res.json({error:error})
        }
    }else{
        return res.json({error:"User Not LoggedIn or Not Administrator"})
    }
}


module.exports = getTransactions