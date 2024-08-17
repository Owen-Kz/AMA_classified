const listingsContainer = document.getElementById("listingsContainer")
const paginationContainer = document.getElementById("pagination");
const maxLength = 200;


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
  
      for (let i = startPage; i <= 10; i++) {
        let active = (i == currentPage ? 'active' : '');
        OtherPages += `
         <a href="?page=${i}" class="pagination_item ${active}"><li>${i}</li></a>
        `;
      }
  
      if (endPage <= totalPagesListings) {
        if (endPage > totalPagesListings - 1) {
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
    for(let i=0; i<40; i++){
        listingsContainer.innerHTML += `         <!-- start single_item  -->
              <div class="product_item loadingItem">
                    <div class="image_container" style="background:transparent;">
                      
                    </div>
                    <div class="actions" style="background:transparent;">
                        <div class="viewsCount" style="background:transparent;">
                          
                        </div>

                        <div class="save_item" style="background:transparent;">

                        </div>
                    </div>
                    <!-- start product info  -->
                     <div class="product_info" style="background:transparent;">
                        <div class="product_name" style="background:transparent;">
                           
                        </div>
                        <div class="location" style="background:transparent;"></div>
                     </div>
                     <!-- end product info  -->
                </div>
                <!-- div.End_single_item  -->`
    }
fetch(`/listings?page=${page}`, {
    method:"POST"
}).then(res=>res.json())
.then(data =>{
    listingsContainer.innerHTML = ""

    if(data.success){
        const ListingsList = data.listings
        const totalPages = data.totalPages
        const currentPage = data.currentPage
        if(paginationContainer){ 
            booksNavigation(totalPages, currentPage)
        }
 
        for(let i =0; i < ListingsList.length; i++){
            let country = ""
            let ItemPrice = ""
            let currency = "$"

            if(ListingsList[i].country === null){
                country = "N/A"
            }else{
                country = ListingsList[i].country
            }
            
            if(ListingsList[i].price == null){
            ItemPrice = ``
            }else{
                ItemPrice = `${currency} ${ListingsList[i].price}`
            }

            listingsContainer.innerHTML += `          <!-- start single_item  -->
               <a href="/l/${ListingsList[i].title}/${ListingsList[i].id}"> <div class="product_item">
                    <div class="image_container">
                        <img class="productImage" src="/uploads/${ListingsList[i].image1}" alt="Product image">
                       
                    </div>
                    <div class="actions">
                        <div class="viewsCount">
                            <i class="bi bi-eye"></i>
                            <span>0</span>
                        </div>

                        <div class="save_item">
                          
                            <i class="bi bi-bookmark-heart"></i>

                        </div>
                    </div>
                    <!-- start product info  -->
                     <div class="product_info">
                        <div class="product_name" style="color:var(--AmasLinkColor);">
                           ${ItemPrice}
                        </div>
                        <div class="product_name">
                            ${ListingsList[i].title}
                        </div>
                         <div class="product_description limited-text">
                            ${ListingsList[i].description}
                        </div>
                        <div class="location"><i class="bi bi-map-fill"></i>${country}</div>
                     </div>
                     <!-- end product info  -->
                </div>
                </a> 
                <!-- div.End_single_item  -->`
        }
        const limitedTextElements = document.getElementsByClassName("limited-text")

        // Loop through each element and truncate if necessary
    if(limitedTextElements){
      for (var i = 0; i < limitedTextElements.length; i++) {
          var limitedText = limitedTextElements[i];
          if (limitedText.textContent.length > maxLength) {
              limitedText.textContent = limitedText.textContent.substring(0, maxLength) + "...";
          }
      }
      }

    }else{
        listingsContainer.innerHTML = `<div>Cannot Retrieve Data At the moment. Please Refresh</div>`
        console.log(data.error)
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