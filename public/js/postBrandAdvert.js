import { quill } from "./forms/quill.js";

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
        const fileType = this.files[0].type 
        const fileSize = this.files[0].size
        if(fileType  !== 'image/jpeg' && fileType !== 'image/jpg' && fileType !== 'image/png'){
            alert("Wrong file type, Choose a JPEG or PNG file")
            this.files[0] = []
            file.value = ""
        }else if(this.files[0].size > 5000000){
           alert("File is too large, Choose a file below less than 5MB")
           this.value = ""
           this.files[0] = []
       }else{
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
    } else {
        imagePreview.innerHTML = '<p>No image selected</p>';
    }
});
const videoFile = document.getElementById("videoFile")
if(videoFile){
    videoFile.addEventListener("change", function(){
        if(this.files[0]){
            console.log(this.files[0].size)

            if(this.files[0].size > 5000000){
                alert("File is too large, Choose a file below less than 5MB")
                this.value = ""
                this.files[0] = []
            }
        }
    })
}
const imageFile = document.querySelectorAll('input[name="imageFile[]"]')

imageFile.forEach(image =>{
 image.addEventListener("change", function(){
     const fileType = this.files[0].type 

     if(fileType  !== 'image/jpeg' && fileType !== 'image/jpg' && fileType !== 'image/png'){
         alert("Wrong file type, Choose a JPEG or PNG file")
         image.files[0] = []
         image.value = ""
     }
 })
})
const removebutton = removeImageContainer.querySelector("button")
removebutton.addEventListener("click", function(){
    imagePreview.style.display = "none"
    removeImageContainer.style.display = "none"
    dzbutton.style.display = "flex"
})

const category = document.getElementById("category")

const subCategories = document.getElementById("subCats")

// GEt All AVailabel CAtegories 
fetch(`/allCategories`, {
    method:"POST",
    body:JSON.stringify({email:"amaslink@gmail.com"}),
    headers:{
        "Content-type" : "application/JSON"
    }
}).then(res => res.json())
.then(data => {
    if(data){
    if(data.success){
        const Cats = data.categories

        for(let i=0; i<Cats.length; i++){
            const categoryMain = Cats[i]
            category.innerHTML += `<option value='${categoryMain.category_name}'>${categoryMain.category_name}</option>`
        }
    }
}else{
    console.log("Could Not Fetch CAtegories")
}
})


// get Avaliabel Sub Categories  
fetch(`/allSubCategories`, {
    method:"POST",
    body:JSON.stringify({email:"amaslink@gmail.com"}),
    headers:{
        "Content-type" : "application/JSON"
    }
}).then(res => res.json())
.then(data => {
    if(data){
        if(data.success){
        const Cats = data.categories

        for(let i=0; i<Cats.length; i++){
            const categoryMain = Cats[i]
            subCategories.innerHTML += `<option value='${categoryMain.category_name}'>${categoryMain.category_name}</option>`
        }
    }
    }else{
        subCategories.innerHTML = `<i>Could not Fetch SubCategories</i>`
    }
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
    

    newData.append('description', JSON.stringify(quill.getContents().ops));

    if(!error){
            fetch(`/postBrandAdvert`, {
        method: "POST",
        body: newData, // Send FormData directly
        // No need to set Content-Type header
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        if(data.success){
            // alert(data.success)
            // DeleteCookie("sessionId")
            // DeleteCookie("paymentId")
            // window.location.href = "/dashboard"
            window.location.href = data.url

            
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
