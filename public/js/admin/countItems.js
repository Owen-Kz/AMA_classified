const listingsCountContainer = document.querySelectorAll(".totalCount")
const awaitingApprovalCount = document.querySelectorAll(".awaitingApprovalCount")
const allUsersCount = document.querySelectorAll(".allUsersCount")
const activeCount = document.querySelectorAll(".activeCount")


if(activeCount){
    fetch(`/admin/countAdminListings`, {
        method:"GET"
    }).then(res=>res.json())
    .then(data=>{
        if(data){
            activeCount.forEach(container =>{
                container.innerText = data.active
            })
            if(allUsersCount){
                allUsersCount.forEach(container =>{
                    container.innerText = data.allUsers
                })
            }
            if(awaitingApprovalCount){
                awaitingApprovalCount.forEach(container =>{
                    container.innerText = data.awaitingApproval
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