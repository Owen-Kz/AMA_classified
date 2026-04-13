const listingsCountContainer = document.querySelectorAll(".totalCount")
const soldoutCount = document.querySelectorAll(".soldOutCount")
const pendingCount = document.querySelectorAll(".pendingCount")
const activeCount = document.querySelectorAll(".activeCount")


if(activeCount){
    fetch(`/countMyListings`, {
        method:"GET"
    }).then(res=>res.json())
    .then(data=>{
        if(data){
            activeCount.forEach(container =>{
                container.innerText = data.active
            })
            if(pendingCount){
                pendingCount.forEach(container =>{
                    container.innerText = data.pending
                })
            }
            if(soldoutCount){
                soldoutCount.forEach(container =>{
                    container.innerText = data.soldout
                })
            }
            if(listingsCountContainer){
                listingsCountContainer.forEach(container =>{
                    container.innerText = data.total
                })
            }
        }
    })
}