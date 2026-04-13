const PreviewProductDetails = require("./previewProductDetails")

const previewItem =  async (req,res) =>{

   try{
    if(req.user){
        const productId = req.params.id 
        const productDetails = await PreviewProductDetails(productId) ? await PreviewProductDetails(productId)  : {title:"No Title"}

    res.render("preview.ejs", {title:productDetails.title, email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.render("login")
    }
   }catch(error){
    console.log(error)
    res.json({error:error})
   }
  
}

module.exports = previewItem