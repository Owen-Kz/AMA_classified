import { formatTimestamp } from "../routes/formatDate.js";
import { GetCookie } from "../routes/setCookie.js"

const userID = GetCookie("_superID")
const superId = GetCookie("_superID")

if(superId){

const BrandAdsContainer = document.getElementById("BrandAdsContainer")

const paginationContainer = document.getElementById("pagination");
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



    function NewPage(page){
    // get a list of BrandAds by this user 
    fetch(`/fullpageAd`, {
        method:"GET",
    }).then(res=>res.json())
    .then(async (data)=>{
    BrandAdsContainer.innerHTML = ""
 
        if(data.success){
            // const BrandAdsList = data.BrandAds
      
            const BrandAds = data.fullpageAd
            for(let i=0; i<BrandAds.length; i++){
                const BrandAdsData = BrandAds[i]
             
                const SellerDetails = await GetSellerDetails(BrandAds[i].user_id)
                let Status = ""
             
                let moreActions = ""

                const SellerEmail = SellerDetails.email
                const UploadDate = formatTimestamp(BrandAdsData.date_uploaded)
        
                const ExpiryDate = formatTimestamp(BrandAdsData.expiry_date)

                
                if(BrandAdsData.status === "active"){
                    Status = `<span class="status-text status-green">Active</span>`
                    moreActions = `<option value="reject">Reject</option>`
                }else if(BrandAdsData.status === "rejected"){
                    Status = `<span class="status-text status-red">Rejected</span>`
                    moreActions = `
                    <option value="approve">Approve</option>
                    `

                }else if(BrandAdsData.status === "pending"){
                    Status = `<span class="status-text status-orange">Awaiting Approval</span>`
                    moreActions = `
                    <option value="approved">Approve</option>
                    <option value="reject">Reject</option>`
                }else if(BrandAdsData.status === "sold/expired"){
                    Status = `<span class="status-text status-orange">Sold Out / Expired</span>`
                    moreActions = ``
                    
                }

        
                BrandAdsContainer.innerHTML +=`     <tr id=${BrandAdsData.id} title=${BrandAdsData.file_url}>
                                    <td>
                                    <a href="${BrandAdsData.file_url}">${BrandAdsData.file_url}</a></td>
                                 
                        <td>${SellerEmail}</td>
                        <td>${UploadDate}</td>
                        <td>${ExpiryDate}</td>


                                       <td class="status">
                                        ${Status}
                                       </td>
                            
                                       <td>
                                        <form class="form " action="#">
                                  
                                        <select class="action-box submitAction"  name="do">
                                            <option value="">Actions</option>
                                            <option value="view">View</option>
                                           ${moreActions}
                                           <option value="delete">Delete</option>
                        
                                           
                                        </select>
                                        
                                        </form>
                                    </td>
                                      </tr>`
                            

            }
        }else{
            BrandAdsContainer.innerHTML = "<tr><td>No BrandAds Available yet </td></tr>"
        }
    })

   
}

function GetParameters(href){
    // Get the URL string
    const urlString = href;
    
    // Create a URL object
    const url = new URL(urlString);
    
    // Get the search parameters from the URL
    const searchParams = new URLSearchParams(url.search);
    return searchParams
    
}

const page = GetParameters(window.location.href).get("page")

if(page && page >0){
    NewPage(page)
}else{
    NewPage(1)
}
}else{
    console.log("Could not Get user")
}

// ACtions From function 
document.addEventListener("change", function(event) {
    if (event.target.classList.contains("submitAction")) {
        const title = event.target.closest("tr").title 
        const id = event.target.closest("tr").id
    
        
        const action = event.target.value
       
        if(action === "view"){
            window.location.href = `${title}`
        }else{
            fetch(`/s/${action}/fullpage/${id}`, {
                method:"POST", 
                headers:{
                    "Content-type" : "application/JSON"
                }
            }).then(res=>res.json())
            .then(data=>{
                if(data.success){
                    alert(data.success)
                    window.location.reload()
                }else{
                    alert(data.error)
                }
            })
            // window.location.href = `/s/${action}/item/${id}`
        }
    }
});
