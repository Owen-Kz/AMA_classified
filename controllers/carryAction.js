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

        res.render("editItem", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, itemTitle:productName, itemID:responseData.productDetails.id, itemDescription:mainDescription, itemPrice:mainPrice})

        }else if(action === "boost"){
            res.render("boost", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, itemTitle:productName, itemID:responseData.productDetails.id})

        }else if(action === "delete"){
            res.render("deleteItem", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, itemTitle:productName, itemID:responseData.productDetails.id})

        }else if(action === "soldout"){
            res.render("soldout", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, itemTitle:productName, itemID:responseData.productDetails.id})
        }

    }else{
        res.redirect("/login")
    }

    
}


module.exports = CarryAction