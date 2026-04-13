import { GetCookie } from "../routes/setCookie.js"

const userID = GetCookie("_superID")
const superId = GetCookie("_superID")

if(superId){
const BrandAdsContainer = document.getElementById("BrandAdsContainer")

const paginationContainer = document.getElementById("pagination");

function booksNavigation(totalPagesBrandAds, currentPage) {
    const booksNavContainer = document.getElementById("pagination");
    let Previous = "";
    let AfterPrevious = "";
    let EndPage = "";
    let TotalPagesCount = "";
    let nextPageContainer = "";
    let OtherPages = "";
  
    if (totalPagesBrandAds > 0) {
      if (currentPage > 1) {
        Previous = `
         <a href="?page=${currentPage - 1}" class="pagination_item"><li>Prev</li></a>
        `;
      }
  
      const maxPagesToShow = 5;
      const halfMax = Math.floor(maxPagesToShow / 2);
      const startPage = Math.max(currentPage - halfMax, 1);
      const endPage = Math.min(currentPage + halfMax, totalPagesBrandAds);
      const nextPage = currentPage + 1;
  
      if (startPage > 1) {
        AfterPrevious = `
        <a href="?page=1" class="pagination_item"><li>1</li></a>
        `;
  
        if (startPage > 2) {
          AfterPrevious += `
           <a href="#" class="pagination_item"><li>..</li></a>
          `;
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        let active = (i == currentPage ? 'active' : '');
        OtherPages += `
         <a href="?page=${i}" class="pagination_item ${active}"><li>${i}</li></a>
        `;
      }
  
      if (endPage < totalPagesBrandAds) {
        if (endPage < totalPagesBrandAds - 1) {
          EndPage = `
           <a href="#" class="pagination_item "><li>...</li></a>`;
        }
        TotalPagesCount = `
        <a href="?page=${totalPagesBrandAds}" class="pagination_item "><li>${totalPagesBrandAds}</li></a>
        `;
      }
  
      if (currentPage < totalPagesBrandAds) {
        nextPageContainer = `
        <a href="?page=${nextPage}" class="pagination_item "><li>Next</li></a>
        `;
      }
    }
  
    booksNavContainer.innerHTML = `
      <ul class="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
        ${Previous}
        ${AfterPrevious}
        ${OtherPages}
        ${EndPage}
        ${TotalPagesCount}
        ${nextPageContainer}
      </ul>
      <span id="bookPageInfo">Page ${currentPage} of ${totalPagesBrandAds}</span>`;
  }
  async function GetProductDetails(productId, productTitle) {
   return fetch(`/details/${productTitle}/${productId}`, {
        method: "GET"
    }).then(res => res.json())
    .then(async (data) => {
        if (data.success) {
            return data.productFiles
        }else{
            return  []
        }
    })
}

    function NewPage(page){
    // get a list of BrandAds by this user 
    fetch(`/allBrands`, {
        method:"POST",
        body:JSON.stringify({uid:superId, page:page}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res=>res.json())
    .then(async (data)=>{
    BrandAdsContainer.innerHTML = ""
 
        if(data.success){
            // const BrandAdsList = data.BrandAds
            const totalPages = data.totalPagesBrandAds
            const currentPage = data.currentPage
            if(paginationContainer){ 
                booksNavigation(totalPages, currentPage)
            }
            
            const BrandAds = data.BrandAds
            for(let i=0; i<BrandAds.length; i++){
                const BrandAdsData = BrandAds[i]
                const imagesArray = await GetProductDetails(BrandAdsData.item_id, BrandAdsData.title)
                let Status = ""
                let AllImages = ""
                let moreActions = ""
                let PaymentStatus = ""

                for (let a = 0; a < imagesArray.length; a++) {
                    const file = imagesArray[a];
                    if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "old_submission") {
                        AllImages += `<div class="image_container">
                                                <img src="/uploads/${imagesArray[a].file_url}" alt="image">
                                            </div>
                        </a>`;
                    } else if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "new_submission") {
                        AllImages += `<div class="image_container">
                                                <img src="${imagesArray[a].file_url}" alt="image">
                                            </div>`;
                    }
                }
                
                if(BrandAdsData.status === "approved"){
                    Status = `<span class="status-text status-green">Approved</span>`
                    moreActions = `<option value="reject">Reject</option>`
                }else if(BrandAdsData.status === "rejected"){
                    Status = `<span class="status-text status-red">Rejected</span>`
                    moreActions = `
                    <option value="approve">Approve</option>`

                }else if(BrandAdsData.status === "pending"){
                    Status = `<span class="status-text status-orange">Awaiting Approval</span>`
                    moreActions = `
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>`
                }else if(BrandAdsData.status === "sold/expired"){
                    Status = `<span class="status-text status-orange">Sold Out / Expired</span>`
                    moreActions = ``
                    
                }

                if(BrandAdsData.payment_status === "approved" || BrandAdsData.payment_status === "confirmed"){
                    PaymentStatus = `<span class="status-text status-green">Payment Confirmed</span>`
                    moreActions = `<option value="reject">Reject</option>`
                }else if(BrandAdsData.payment_status === "failed"){
                    PaymentStatus = `<span class="status-text status-red">Failed</span>`
                

                }else if(BrandAdsData.payment_status === "pending" ||BrandAdsData.payment_status === "in_progress"){
                    PaymentStatus = `<span class="status-text status-orange">Pending</span>`
               
                }else{
                    PaymentStatus = `<span class="status-text">${BrandAdsData.payment_status}</span>`
                }

                BrandAdsContainer.innerHTML +=`     <tr id=${BrandAdsData.item_id} title=${BrandAdsData.title}>
                                        <td style="text-wrap:wrap; display:flex">
                                        <b>${BrandAdsData.title}</b></td>
                                        <td class="imagesRow">
                                       ${AllImages}
                                       </td>
                                       <td>${BrandAdsData.type}</td>


                                       <td class="status">
                                        ${Status}
                                       </td>
                                 <td class="status">
                                        ${PaymentStatus}
                                       </td>
                                       <td>
                                        <form class="form " action="#">
                                  
                                        <select class="action-box submitAction"  name="do">
                                            <option value="">Actions</option>
                                            <option value="view">View</option>
                                           ${moreActions}
                        
                                           
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
            window.location.href = `/brand/${title}/${id}`
        }else{
            fetch(`/s/${action}/brand/${id}`, {
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
