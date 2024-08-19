const registerForm = document.getElementById("loginForm")

registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("Login")
 
    const data = {
        user:user.value,
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
        if(data.success){
            // window.location.href = "/dashboard"
            window.location.reload()
        }else{
            alert(data.message)

        }
    })
})