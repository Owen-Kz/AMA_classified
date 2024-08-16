import { GetCookie } from "../routes/setCookie.js"

const userID = GetCookie("_usid")

if(userID){

const listingsContainer = document.getElementById("listingsContainer")

const paginationContainer = document.getElementById("pagination");

function booksNavigation(totalPagesListings, currentPage) {
    const booksNavContainer = document.getElementById("pagination");
    let Previous = "";
    let AfterPrevious = "";
    let EndPage = "";
    let TotalPagesCount = "";
    let nextPageContainer = "";
    let OtherPages = "";
  
    if (totalPagesListings > 0) {
      if (currentPage > 1) {
        Previous = `
         <a href="?page=${currentPage - 1}" class="pagination_item"><li>Prev</li></a>
        `;
      }
  
      const maxPagesToShow = 5;
      const halfMax = Math.floor(maxPagesToShow / 2);
      const startPage = Math.max(currentPage - halfMax, 1);
      const endPage = Math.min(currentPage + halfMax, totalPagesListings);
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
  
      if (endPage < totalPagesListings) {
        if (endPage < totalPagesListings - 1) {
          EndPage = `
           <a href="#" class="pagination_item "><li>...</li></a>`;
        }
        TotalPagesCount = `
        <a href="?page=${totalPagesListings}" class="pagination_item "><li>${totalPagesListings}</li></a>
        `;
      }
  
      if (currentPage < totalPagesListings) {
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
      <span id="bookPageInfo">Page ${currentPage} of ${totalPagesListings}</span>`;
  }
  

    function NewPage(page){
    // get a list of listings by this user 
    fetch(`/userListings`, {
        method:"POST",
        body:JSON.stringify({uid:userID, page:page}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{
    listingsContainer.innerHTML = ""

        if(data.success){
            // const ListingsList = data.listings
            const totalPages = data.totalPagesListing
            const currentPage = data.currentPage
            if(paginationContainer){ 
                booksNavigation(totalPages, currentPage)
            }
            
            const listings = data.mylistings
            for(let i=0; i<listings.length; i++){
                const listingData = listings[i]
                const imagesArray = []
                let Status = ""
                let AllImages = ""

                if(listingData.image1 && listingData.image1 != "AMAS.png" && listingData.image1 != null){
                    imagesArray.push({
                        image:listingData.image1
                    })
                }
                if(listingData.image2 && listingData.image2 != "AMAS.png" && listingData.image2 != null){
                    imagesArray.push({
                        image:listingData.image2
                    })
                }
                if(listingData.image3 && listingData.image3 != "AMAS.png" && listingData.image3 != null){
                    imagesArray.push({
                        image:listingData.image3
                    })
                }
                if(listingData.image3 && listingData.image3 != "AMAS.png" && listingData.image3 != null){
                    imagesArray.push({
                        image:listingData.image3
                    })
                }
                if(listingData.image4 && listingData.image4 != "AMAS.png" && listingData.image4 != null){
                    imagesArray.push({
                        image:listingData.image4
                    })
                }
                if(listingData.image5 && listingData.image5 != "AMAS.png" && listingData.image5 != null){
                    imagesArray.push({
                        image:listingData.image5
                    })
                }

                for(let a=0; a<imagesArray.length; a++){
                    AllImages += ` <div class="image_container">
                                                <img src="/uploads/${imagesArray[a].image}" alt="image">
                                            </div>`
                }
               
                
                if(listingData.status === "approved"){
                    Status = `<span class="status-text status-green">Approved</span>`
                }else if(listingData.status === "rejected"){
                    Status = `<span class="status-text status-red">Rejected</span>`

                }else if(listingData.status === "pending"){
                    Status = `<span class="status-text status-orange">Awaiting Approval</span>`
                }else if(listingData.status === "sold/expired"){
                    Status = `<span class="status-text status-orange">Sold Out / Expired</span>`
                    
                }

                listingsContainer.innerHTML +=`     <tr id=${listingData.id} title=${listingData.title}>
                                        <td style="text-wrap:wrap; display:flex">
                                        <b>${listingData.title}</b></td>
                                        <td class="imagesRow">
                                       ${AllImages}
                                       </td>

                                       <td class="status">
                                        ${Status}
                                       </td>

                                       <td>
                                        <form class="form " action="#">
                                   
                                        <select class="action-box submitAction"  name="do">
                                            <option value="">Actions</option>
                                            <option value="view">View</option>
                                            <option value="edit">Edit</option>
                                            <option value="boost">Boost</option>
                                            <option value="soldout">Mark As Sold</option> 
                                            <option value="delete">Delete</option>
                                           
                                        </select>
                                        
                                        </form>
                                    </td>
                                      </tr>`
                            

            }
        }else{
            listingsContainer.innerHTML = "<tr><td>No Listing Available for this Account </td></tr>"
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
            window.location.href = `/l/${title}/${id}`
        }else{
            window.location.href = `/${action}/item/${id}`
        }
    }
});
