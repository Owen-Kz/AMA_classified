const usersList = document.getElementById("usersList")

fetch("/allUsers", {
    method:"POST"
}).then(res =>res.json())
.then(data =>{
    if(data.success){
        const memebers = data.members
        for(let i=0; i<memebers.length; i++){
            const person = memebers[i]
        usersList.innerHTML += `     <li>
                          <a href="javascript:void(0)" class="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user" id="chat_user_9" data-user-id="9">
                            <span class="position-relative">
                              <img src="https://bootstrapdemos.wrappixel.com/ample/dist/assets/images/profile/user-9.jpg" alt="user1" width="40" height="40" class="rounded-circle">
                            </span>
                            <div class="ms-6 d-inline-block w-75">
                              <h6 class="mb-1 fw-semibold chat-title" data-username="James Anderson">Michael Knight</h6>
                              <span class="fs-2 text-body-color d-block">michael_knight@modernize.com</span>
                            </div>
                          </a>
                        </li>`

                        }
    }else{
        console.log(data.error)
    }
})