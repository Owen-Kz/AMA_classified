const getSlideShowAdverts = async (req,res) =>{
    try{
        const response = await fetch(`${process.env.ENDPOINT}/y/slideshowAdverts`, {
            method: 'GET',
        
        });

        const responseData = await response.json(); 
        if(responseData.success){

            return res.json({success:"staticAdverts", adverts:responseData.slideshow_advert})
        }else{
            return res.json({error:responseData.error})
        }
    }catch(error){
        return res.json({error:error.message})
    }
}


module.exports = getSlideShowAdverts