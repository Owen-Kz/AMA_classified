const itemId = document.getElementById("itemId")
const mainTitle = document.getElementById("mainTitle")
const typeTitle = document.getElementById("typeTitle")
const soldItem = document.getElementById("soldItem")
const submitButton = soldItem.querySelector("button")

typeTitle.addEventListener("keyup", function() {
if(typeTitle.value && typeTitle.value != "" && typeTitle != " "){
    submitButton.removeAttribute("disabled")
}
})
soldItem.addEventListener("submit", function(e){
    e.preventDefault()

    if(typeTitle.value){
        if(typeTitle.value !== `Sold Out ${mainTitle.value}`){
            alert("Please Carefully Read the instructions to Proceed")
        }else{
           fetch(`/markAsSold`, {
            method:"POST",
            body:JSON.stringify({item_id:itemId.value}),
            headers:{
                "Content-type":"application/JSON"
            }
           }).then(res=>res.json())
           .then(data=>{
            if(data.success){
                alert(data.success)
                window.location.href = "/mylistings"
            }else{
                alert(data.error)
            }
           })
        }
    }else{
        alert("Values Cannot be empty")
    }
})