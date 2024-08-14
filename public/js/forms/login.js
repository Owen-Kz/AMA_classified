const registerForm = document.getElementById("loginForm")

registerForm.addEventListener("submit", function(e){
    e.preventDefault();
 
    const data = {
        user:username.value,
        pass:password.value,
      
    }
    fetch(`/login`, {
        method:"POST", 
        body: JSON.stringify(data),
        headers:{
            "Content-type":"application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{
        alert(data.message)
    })
})