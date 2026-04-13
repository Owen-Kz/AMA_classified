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

const annoucementsListContainer = document.getElementById("emailListContainer")
const annoceumentBOdy = document.getElementById("email-content")
const expandForum = document.querySelector(".expand-forum")

expandForum.addEventListener("click", function(){
    annoucementsListContainer.classList.toggle('small');
    annoceumentBOdy.classList.toggle("wide")
})


fetch(`/getAnnouncements`, {
    method:"POST", 
    headers:{
        "Content-type":"application/JSON"
    },
    body:JSON.stringify({email:"amaslink@gmail.com"})
}).then(res=>res.json())
.then(data=>{
    if(data){
    if(data.success){
        const Annoucements = data.announcements
      
        if(Annoucements.length > 0){
        for(let i=0; i<Annoucements.length; i++){
        
            annoucementsListContainer.innerHTML += ` <div class="email-item">
            <p class="content" style="display:none;">${Annoucements[i].content} </p>
                                      <div class="email-subject">${Annoucements[i].title}</div>
                                      <div class="email-recipient"><i class="bi bi-calendar"></i>${formatTimestamp(Annoucements[i].created_at)}</div>
                                    </div>`
        }
        const content = document.querySelectorAll(".email-item")
        

        // Loop through each element and truncate if necessary
    if(content){
    //   for (var i = 0; i < content.length; i++) {
    content.forEach(element => {
        
          var thisContent = element;
          var contentValue = element.querySelector(".content")
         thisContent.addEventListener("click", function(){
            annoucementsListContainer.classList.toggle('small');
            annoceumentBOdy.classList.toggle("wide")
            annoceumentBOdy.innerHTML = ""
            annoceumentBOdy.innerHTML = `<div id="email1" class="email-details">
                       <p>${contentValue.innerText}</p></div>`
         })
    });

    //   }
      }
    }else{
        annoucementsListContainer.innerHTML = `<div class="email-item">No Annoucements To Display yet</div>`
    }
    }else{
        console.log(data.error)
    }
}else{
    console.log("Could Not Fetch")
}
})

const CreateAnnouncements = document.getElementById("CreateAnnouncements")
CreateAnnouncements.addEventListener("submit", function(e){
    e.preventDefault()
    const title = CreateAnnouncements.querySelector("input")
    const content = CreateAnnouncements.querySelector("textarea")
    fetch(`/CreateAnnouncements`, {
        method:"POST",
        body:JSON.stringify({topic:title.value, description:content.value}),
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