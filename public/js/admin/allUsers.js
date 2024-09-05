const usersList = document.getElementById("usersList")
/* <span class="position-relative">
<img src="https://bootstrapdemos.wrappixel.com/ample/dist/assets/images/profile/user-9.jpg" alt="user1" width="40" height="40" class="rounded-circle">
</span> */
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
const InfoContainer = document.getElementById("userInfoContainer")
function UpdateUserInfo(id){
  fetch(`/seller/profile/details/`, {
    method:"POST",
    body:JSON.stringify({u_id:id}),
    headers:{
      "Content-type" : "application/JSON"
    }
  }).then(res =>res.json())
  .then(data=>{
    if(data){
      const sellerDetails = data.sellerDetails
     
      InfoContainer.innerHTML = ` <div class="chat-list chat active-chat" data-user-id="1">
                                <div class="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                  <div class="d-flex align-items-center gap-3">
                               
                                    <div>
                                      <h6 class="fs-4 mb-0">
                                      ${sellerDetails.u_name}</h6>
                                      <p class="mb-0">Country: ${sellerDetails.country}</p>
                                      <p class="mb-0">${sellerDetails.email}</p>
                                    </div>
                                  </div>
                                </div>

                                <div class="row" style="display: flex; flex-direction: row; flex-wrap: wrap;">
                                  
                                  <div class="col-4 mb-7">
                                    <p class="mb-1 fs-2">Fullname</p>
                                    <h6 class="fw-semibold mb-0">${sellerDetails.name} ${sellerDetails.l_name}</h6>
                                  </div>
                                  <div class="col-4 mb-7">
                                    <p class="mb-1 fs-2">Phonenumber</p>
                                    <h6 class="fw-semibold mb-0">${sellerDetails.phone}</h6>
                                </div>
                                <div class="col-4 mb-7">
                                  <p class="mb-1 fs-2">Vimeo</p>
                                  <h6 class="fw-semibold mb-0">
                                  ${sellerDetails.vimeo}</h6>
                                </div> 
                                <div class="col-4 mb-7">
                                  <p class="mb-1 fs-2">Youtube</p>
                                  <h6 class="fw-semibold mb-0">
                                  ${sellerDetails.ytube}
                                  </h6>
                                </div>
                              <div class="col-4 mb-7">
                                <p class="mb-1 fs-2">Facebook</p>
                                <h6 class="fw-semibold mb-0">
                                ${sellerDetails.fb}</h6>
                              </div>
                              <div class="col-4 mb-7">
                                <p class="mb-1 fs-2">LinkedIn</p>
                                <h6 class="fw-semibold mb-0">${sellerDetails.linkd}</h6>
                              </div>
                              <div class="col-4 mb-7">
                                <p class="mb-1 fs-2">Date Joined</p>
                                <h6 class="fw-semibold mb-0">${formatTimestamp(sellerDetails.created_at)}</h6>
                              </div>
                                
    
                             
                              </div>
                    
                   
                      

                            </div>`
    }
  })

}
fetch(`/allusers`, {
    method:"POST"
}).then(res => res.json())
.then(data=>{
    if(data.users.length > 0){
        const users = data.users 
        for(i=0; i<users.length; i++){
            usersList.innerHTML += `<li class='userItem'>
                          <span class="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user" id="${users[i].id}" data-user-id="${users[i].id}">
                            <div class="ms-6 d-inline-block w-75">
                              <h6 class="mb-1 fw-semibold chat-title" data-username="${users[i].u_name}">${users[i].u_name}</h6>
                              <span class="fs-2 text-body-color d-block">${users[i].email}</span>
                            </div>
                          </span>
                        </li>`
        }
      const usersItem = document.querySelectorAll(".chat-user")
      
      usersItem.forEach(user =>{
        user.addEventListener("click", () =>{
          UpdateUserInfo(user.id)
        })
      })
    }else{
        usersList.innerHTML = `<li>No Users To DIsplay at the moment</li>`
    }
})