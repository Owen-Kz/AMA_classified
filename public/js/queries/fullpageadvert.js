const fullpageAd = document.querySelectorAll(".fullpageAd")
const innerFullPage = document.getElementById("innerFullPage")

fullpageAd.forEach(advertContainer =>{
    advertContainer.style.display = "none"
})
fetch(`/fullpageAd`)
.then(res=>res.json())
.then(data =>{
    try{
    if(data.success){
      
        if(data.fullpageAd[0].status === "approved"){
        if(data.fullpageAd.length >0){
            fullpageAd.forEach(advertContainer =>{
                advertContainer.style.display = "flex"
            })
            innerFullPage.innerHTML = `
            <img src=${data.fullpageAd[0].file_url} alt="Full Page Advert"/>`
        }else{
            console.log("no Full Page advert to display")
        }
    }else{
        console.log("Advert Has not been approved")
    }
    }else{
        console.log(data.error)
    }
}catch(error){
    console.error(error)
}
})