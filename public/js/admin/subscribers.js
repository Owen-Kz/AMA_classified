import { GetCookie } from "../routes/setCookie.js"

const userID = GetCookie("_superID")
const superId = GetCookie("_superID")
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate(); // Numeric day of the month
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
  
    return `${day} ${monthName}, ${year}`;
  }
if(superId){

const subscribersContainer = document.getElementById("subscribersContainer")

const paginationContainer = document.getElementById("pagination");

function booksNavigation(totalPagessubscribers, currentPage) {
    const booksNavContainer = document.getElementById("pagination");
    let Previous = "";
    let AfterPrevious = "";
    let EndPage = "";
    let TotalPagesCount = "";
    let nextPageContainer = "";
    let OtherPages = "";
  
    if (totalPagessubscribers > 0) {
      if (currentPage > 1) {
        Previous = `
         <a href="?page=${currentPage - 1}" class="pagination_item"><li>Prev</li></a>
        `;
      }
  
      const maxPagesToShow = 5;
      const halfMax = Math.floor(maxPagesToShow / 2);
      const startPage = Math.max(currentPage - halfMax, 1);
      const endPage = Math.min(currentPage + halfMax, totalPagessubscribers);
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
  
      if (endPage < totalPagessubscribers) {
        if (endPage < totalPagessubscribers - 1) {
          EndPage = `
           <a href="#" class="pagination_item "><li>...</li></a>`;
        }
        TotalPagesCount = `
        <a href="?page=${totalPagessubscribers}" class="pagination_item "><li>${totalPagessubscribers}</li></a>
        `;
      }
  
      if (currentPage < totalPagessubscribers) {
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
      <span id="bookPageInfo">Page ${currentPage} of ${totalPagessubscribers}</span>`;
  }

    function NewPage(page){
    // get a list of subscribers by this user 
    fetch(`/subscribers`, {
        method:"POST",
        body:JSON.stringify({uid:superId, page:page}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res=>res.json())
    .then(async (data)=>{
    subscribersContainer.innerHTML = ""
        if(data.success){
            // const subscribersList = data.subscribers
            const totalPages = data.totalPagessubscribers
            const currentPage = data.currentPage
            if(paginationContainer){ 
                booksNavigation(totalPages, currentPage)
            }
            
            const subscribers = data.subscribers
            for(let i=0; i<subscribers.length; i++){
                const subscribersData = subscribers[i]
      
      
                
            
                subscribersContainer.innerHTML +=`     <tr id=${subscribersData.id} title=${subscribersData.title}>
                                        <td style="text-wrap:wrap; display:flex">
                                        <b>${subscribersData.name}</b></td>
                                  

                                       <td>
                                    ${subscribersData.email}
                                        
                                    </td>
                                       <td>
                                    ${formatTimestamp(subscribersData.created_at)}
                                        
                                    </td>
                                      </tr>`
                            

            }
        }else{
            subscribersContainer.innerHTML = "<tr><td>No subscribers Available at the moment </td></tr>"
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

