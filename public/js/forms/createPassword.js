const registerForm = document.getElementById("creatPasswordForm")
const GetCookie = function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null; // Cookie not found
}

const email = GetCookie("_user")
const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")

registerForm.addEventListener("submit", function(e){
    e.preventDefault();

    if(password1.value != password2.value) {
        alert("Passwords do not match")
    }else{
    const data = {
        password:password1.value,
        email:email      
    }

    fetch(`/create-password`, {
        method:"POST", 
        body: JSON.stringify(data),
        headers:{
            "Content-type":"application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data.success){
            window.location.href = "/login"
           
        }else{
            alert(data.error)

        }
    })
}
})