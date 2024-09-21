const registerForm = document.getElementById("loginForm")
const PasswordContainer = document.querySelectorAll(".password")
const ViewPassword = document.getElementById("viewIcon")

ViewPassword.addEventListener("click", function(){
    console.log(PasswordContainer)
    PasswordContainer.forEach(pass =>{
       const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
       pass.setAttribute('type', type);
       ViewPassword.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    })
})

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