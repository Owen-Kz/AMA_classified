const CreateAnnoucements = async (req,res) =>{
    if(req.cookies._ama && req.cookies._superID){
        const {topic, description} = req.body

        const data = {
            topic: topic,
            description:description,
            token:req.cookies._ama
        }
try{
        const response = await fetch(`${process.env.ENDPOINT}/y/admin/createAnnouncement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json(); 
        if(responseData.success){
            return res.json({success:responseData.success})
        }else{
            return res.json({error:responseData.error})
        }
    }catch(error){
        return res.json({error:error.message})
    }
    }else{
        return res.json({error:"Unauthorized Access Token"})
    }
}

module.exports = CreateAnnoucements