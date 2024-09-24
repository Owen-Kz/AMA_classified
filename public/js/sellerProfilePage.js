import { NewPage } from "./queries/sellerListings.js"

async function GetSellerDetails(uid){
    return fetch(`/seller/profile/details/`, {
        method:"POST",
        body:JSON.stringify({u_id:uid}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data.success){
            return data.sellerDetails
        }else{
            return null
        }
    })
}

const sellerId = document.getElementById("sellerId")
const profileCard = document.getElementById("profileCard")
function GetParameters(href){
    // Get the URL string
    const urlString = href;
    
    // Create a URL object
    const url = new URL(urlString);
    
    // Get the search parameters from the URL
    const searchParams = new URLSearchParams(url.search);
    return searchParams
    
}
if(sellerId && sellerId.value !=""){
const SellerInfo = await GetSellerDetails(sellerId.value)
if(SellerInfo){

    const page = GetParameters(window.location.href).get("page")
    

    if(page && page >0){
        NewPage(page, sellerId.value)
    }else{
        NewPage(1, sellerId.value)
    
    }
    let image = ""
    if(SellerInfo.pp !== null){
        image = `<img src="${SellerInfo.pp}" alt="profile_photo">`
    }else{
        image =   `<img src="/plugins/images/users1.jpg" alt="profile_photo">`
    }
    profileCard.innerHTML = ` <div class="profile_left">
            <div class="image_container">
               
            </div>
            <div class="buttonsContainer">
                <button class="btn"><a href="/messages/${SellerInfo.id}?s=${SellerInfo.id}">Message Seller</a></button>
            </div>
        </div>
        <div class="profile_right">
            <ul>
                <li>
                    <div class="header_text">Firstname</div>
                    <div class="content_text"><b>${SellerInfo.name} ${SellerInfo.l_name} (${SellerInfo.u_name})</b></div>
                </li>
        
                <li>
                    <div class="header_text">Email</div>
                    <div class="content_text"><b>${SellerInfo.email}</b></div>
                </li>

                <li>
                    <div class="header_text">Country</div>
                    <div class="content_text"><b>${SellerInfo.country}</b></div>
                </li>

                <li>
                    <div class="header_text">Phonenumber</div>
                    <div class="content_text"><b>${SellerInfo.phone}</b></div>
                </li>



            </ul>
        </div>`
}
}