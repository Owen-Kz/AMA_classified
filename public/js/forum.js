// const { GetCookie } = require("./routes/setCookie")
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

const ForumListContainer = document.getElementById("emailListContainer")
const annoceumentBOdy = document.getElementById("email-content")



fetch(`/getForums`, {
    method:"POST", 
    headers:{
        "Content-type":"application/JSON"
    },
    body:JSON.stringify({email:"amaslink@gmail.com"})
}).then(res=>res.json())
.then(data=>{
    if(data){
    if(data.success){
        const Forum = data.forums
      
        if(Forum.length > 0){
        for(let i=0; i<Forum.length; i++){
        
            ForumListContainer.innerHTML += ` <div class="email-item">
            <p class="content" style="display:none;" id="${Forum[i].id}">${Forum[i].topic} </p>
                                      <div class="email-subject">${Forum[i].topic}</div>
                                      <div class="email-recipient"><i class="bi bi-calendar"></i>${formatTimestamp(Forum[i].created_at)}</div>
                                    </div>`
        }
        const content = document.querySelectorAll(".email-item")
        

        // Loop through each element and truncate if necessary
    if(content){
    //   for (var i = 0; i < content.length; i++) {
   async function GetComments(forumId){
        return fetch(`/getForumComments`, {
            method:"POST",
            body:JSON.stringify({id:forumId}),
            headers:{
                "Content-Type" : "application/JSON"
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data){
            if(data.success){
                return data.comments
            }else{
                return []
            }
        }else{
            return []
        }
        })
    }
    content.forEach(element => {
        
          var thisContent = element;
          var contentValue = element.querySelector(".content")
          
         thisContent.addEventListener("click", async function(){
              
                ForumListContainer.classList.toggle('small');
                annoceumentBOdy.classList.toggle("wide")
     
            
            const ForumComments = await GetComments(contentValue.id)
            let ForumCommentsBody = ""

            if(ForumComments.length > 0){
            for(let i=0; i<ForumComments.length; i++){
                ForumCommentsBody += `  <div class="friend-drawer friend-drawer--onhover" data-id="${ForumComments[i].id}" data-user-id="${ForumComments[i].commenter_id}">
                       
                            <h6 style="margin:0px; padding:0px;">${ForumComments[i].comment}</h6>
                            <p class="text-muted">${ForumComments[i].commenter_name}</p>
                         
                          <span class="time text-muted small">${formatTimestamp(ForumComments[i].created_at)}</span>
                           </div>
                        </div>
                        <hr>`
            }
        }else{
            ForumCommentsBody = `<div>No Comments to Display Yet</div>`
        }
        
            annoceumentBOdy.innerHTML = ""
            annoceumentBOdy.innerHTML = `<div id="email1" class="email-details">
                       <h3>${contentValue.innerText}</h3>
                       <div class="commentsList">
                           ${ForumCommentsBody}
                       </div>
                       </div>
                       <div>
                       <form class="leaveCommentForm">

                       <div class="form_control">
                        <input type="hidden" value="${contentValue.id}" name="topic_id">
                       <textarea name="comment" id="forumComment" placeholder="Leave a Comment" required></textarea>
                       </div>
                        <div class="form_control" style="margin-top:10px;">
                        
                       <button class="btn d-grid btn-danger text-white">Comment</button>
                       </div>
                       </form>
                       
                       `
                        const CommentFOrm = document.querySelector(".leaveCommentForm")
                CommentFOrm.addEventListener("submit", function(e){
                    e.preventDefault()
                   
                    const input = CommentFOrm.querySelector("input")
                    const textArea = CommentFOrm.querySelector("textarea")
                    fetch(`/createComment`, {
                        method:"POST", 
                        body:JSON.stringify({id:input.value, comment:textArea.value}),
                        headers:{
                            "Content-Type" : "application/JSON"
                        }
                    }).then(res=>res.json())
                    .then(data=>{
                        if(data){
                            console.log(data)
                            if(data.success){
                                alert("Commented Added Succesfully")
                                window.location.reload()
                            }else{
                                alert("Could Not place commetn please Try again later")
                            }
                        }else{
                            alert("Internal SErver Error")
                        }
                    })
                })
         })
    });

    //   }
      }
    }else{
        ForumListContainer.innerHTML = `<div class="email-item">No Forum To Display yet</div>`
    }
    }else{
        console.log(data.error)
    }
}else{
    console.log("Could Not Fetch")
}
})


const CreateForum = document.getElementById("CreateForum")
CreateForum.addEventListener("submit", function(e){
    e.preventDefault()
    const title = CreateForum.querySelector("input")
    fetch(`/createForum`, {
        method:"POST",
        body:JSON.stringify({topic:title.value}),
        headers:{
            "Content-type":"application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data){
            if(data.success){ 
                alert(data.success)
                window.location.reload()
            }else{
                alert(data.error)
            }
        }else{
            alert("Could not create forum at the moment, try agin later")
        }
    })
})



const expandForum = document.querySelectorAll(".expand-forum")

expandForum.forEach(expandForum =>{
expandForum.addEventListener("click", function(){
    ForumListContainer.classList.toggle('small');
    annoceumentBOdy.classList.toggle("wide")
})
})