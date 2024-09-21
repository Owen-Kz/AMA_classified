const registerForm = document.getElementById("registerForm")
const PasswordContainer = document.querySelectorAll(".password")
const ViewPassword = document.querySelectorAll(".viewIcon")
const errorContainer = document.getElementById("errorContainer")

ViewPassword.forEach(ViewPassword =>{ 
ViewPassword.addEventListener("click", function(){
    PasswordContainer.forEach(pass =>{
       const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
       pass.setAttribute('type', type);
       ViewPassword.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    })
})
})

const password2 = document.getElementById("confirmPassword")

password.addEventListener("change", function(){
    if(password2.value !== password.value){
        errorContainer.textContent = "Passwords Do not Match"
    }else{
        errorContainer.textContent = ""
    }
})

password2.addEventListener("change", function(){
    if(password2.value !== password.value){
        errorContainer.textContent = "Passwords Do not Match"
    }else{
        errorContainer.textContent = ""
    }
})


registerForm.addEventListener("submit", function(e){
    e.preventDefault();
  
    const data = {
        username:username.value,
        firstname:firstname.value,
        lastname:lastname.value,
        email:email.value,
        phonenumber: phonenumber.value,
        password:password.value,
        country:country.value
    }
    if(password2.value !== password.value){
        errorContainer.textContent = "Passwords Do not Match"
    }else{
    fetch(`/signup`, {
        method:"POST", 
        body: JSON.stringify(data),
        headers:{
            "Content-type":"application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{
        alert(data.message)
        window.location.href = "/login"
    })
}
})