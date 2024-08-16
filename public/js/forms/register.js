const registerForm = document.getElementById("registerForm")

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
    fetch(`/signup`, {
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