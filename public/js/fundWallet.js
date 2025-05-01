// ACtions From function 
const modalContainer = document.getElementById("modalContainer")
const modalFrame = document.getElementById("modalFrame")
const closeFrame = document.getElementById("closeFrame")
const cancelButton = document.getElementById("cancelButton")
const fundForm = document.getElementById("fundForm")
if(closeFrame){
    closeFrame.addEventListener("click", function(){
        modalContainer.style.display = "none"
    })
}

if(cancelButton){
    cancelButton.addEventListener("click", function(){
        modalContainer.style.display = "none"
    })
}


function openModal(){
 modalContainer.style.display = "flex"
}

const submitButton = document.getElementById("submitButton")


submitButton.addEventListener("click", function(e){
    e.preventDefault()
    const amount = document.getElementById("amount")
    if(amount.value < 5){
        return alert("Miinimum amount is $5")
    }
    if(amount.value > 0){
        const data = {
            amount: amount.value
        }
        fetch(`/api/fundwallet`, {
            method:"POST",
            headers:{
                "Content-type" : "application/JSON"
            },
            body:JSON.stringify(data)
        }).then(res =>res.json())
        .then(data =>{
            if(data.success){
                window.location.href = data.url
            }else{
                alert(data.error)
            }
        })
    }else{
        return alert("Amount should not be empty")
    }
})