const registerForm = document.getElementById("verifyCodeForm")
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
registerForm.addEventListener("submit", function(e){
    e.preventDefault();
 
    const data = {
        code:resetToken.value,
        email:email      
    }
    fetch(`/verify-code`, {
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
          
            alert(data.error)

        }
    })
})