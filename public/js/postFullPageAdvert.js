
const imageInput = document.getElementById('thumbnail');
const imagePreview = document.getElementById('image-preview');
const dzbutton = document.querySelector(".dz-button")
const removeImageContainer = document.querySelector("#removeImageContainer")
imagePreview.style.display = "none"
removeImageContainer.style.display = "none"

const DeleteCookie = function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.reload()
}


dzbutton.addEventListener("click", function() {
    imageInput.click()
})
imageInput.addEventListener('change', function() {
    const file = this.files[0];
    imagePreview.style.display = "flex"
    removeImageContainer.style.display = "block"
    dzbutton.style.display = "none"

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        }
        reader.readAsDataURL(file);
    } else {
        imagePreview.innerHTML = '<p>No image selected</p>';
    }
});

const removebutton = removeImageContainer.querySelector("button")
removebutton.addEventListener("click", function(){
    imagePreview.style.display = "none"
    removeImageContainer.style.display = "none"
    dzbutton.style.display = "flex"
})




// Sumit the Ad 
// const postAdForm = document.getElementById("postAdForm")
const postAdForm = document.getElementById("postAdForm");
const preloader = document.querySelector(".preloader")
postAdForm.addEventListener("submit", function(e) {
    e.preventDefault();
    preloader.removeAttribute("style")
    preloader.setAttribute("style", "display:block; opacity:0.4;")
    const newData = new FormData(postAdForm);

    let error = false

    if(!error){
            fetch(`/postFullpageAdvert`, {
        method: "POST",
        body: newData, // Send FormData directly
        // No need to set Content-Type header
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        if(data.success){
            alert(data.success)
            DeleteCookie("sessionId")
            DeleteCookie("paymentId")
            window.location.href = "/dashboard"
            
        }else{
            preloader.removeAttribute("style")
            preloader.setAttribute("style", "display:none;")
            alert(data.error)
        }
         })
    .catch(error => console.error('Error:', error));
}else{
    alert("Please Check all fields and ensure they are correct")
}
});
