const { configDotenv } = require("dotenv");

const CarryAction = async (req,res) =>{
    if(req.cookies._t){

        const action = req.params.do 
        const itemId = req.params.id 
    
        const response = await fetch(`${process.env.ENDPOINT}/y/productInfo/${itemId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.params)
        });
    
        const responseData = await response.json(); 
        const productName = responseData.productDetails.title
        const description = responseData.productDetails.description 
        const ItemStatus = responseData.productDetails.status
        const price = responseData.productDetails.price
        const ProductFiles =  responseData.productFiles
        const subCategories = responseData.subCategories
        
        let mainDescription = ""
        let mainPrice = ""


        // Find productSubCategories 

        if(description != ""){
            mainDescription = description
        }else{
            mainDescription = "Briefly describe this item"
        }

        if(price < 0 || price === null || !price || price == null){
            mainPrice = 0
        }else{
            mainPrice = price
        }

        if(action === "edit"){
            if(ItemStatus === "approved"){
        res.render("editItem", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, itemTitle:productName, itemID:responseData.productDetails.id, itemDescription:mainDescription, itemPrice:mainPrice, purpose:responseData.productDetails.purpose, condition:responseData.productDetails.condition, country:responseData.productDetails.country, category:responseData.productDetails.category})
    }else{
        res.redirect("/mylistings")
    }
        }else if(action === "boost"){
            // res.render("boost", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, itemTitle:productName, itemID:responseData.productDetails.id})
            res.render("comingSoon")

        }else if(action === "delete"){
            const item_id = responseData.productDetails.id
    
            if(req.cookies._t){
                try{
                    const userId = req.user.id
                    const data = {
                        userId: userId, 
                        itemId: item_id
                    }
             
                    const response = await fetch(`${process.env.ENDPOINT}/y/DeleteItem`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                
                    const responseData = await response.json(); 
                    if(responseData.success){
                        // res.json({success:responseData.success})
                        res.redirect("/mylistings")
                    }else{
                        res.json({error:responseData.error})
                    }
            }catch(error){
                res.json({error:error})
            }
        
            }else{
                res.json({error:"NotLoggedIn"})
            }

            // res.render("deleteItem", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, itemTitle:productName, itemID:responseData.productDetails.id})
      

        }else if(action === "soldout"){
            if(ItemStatus === "approved"){
            res.render("soldout", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, itemTitle:productName, itemID:responseData.productDetails.id})
            }else{
                res.redirect("/mylistings")
            }
        }

    }else{
        res.redirect("/login")
    }
    

    
}


module.exports = CarryAction