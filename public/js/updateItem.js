import { GetProductFiles } from "./queries/getProductFiles.js";
import { productDetails } from "./queries/productDetails.js";

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

// Get the current URL pathname
const pathname = window.location.pathname;

// Split the pathname by slashes to get the individual segments
const segments = pathname.split('/');

// Get the parent directory name (second to last segment)
const ItemId = segments[3]
const titleContainer = document.getElementById("titleContainer")

const productInfo = await productDetails(ItemId, titleContainer.value)

const Description = productInfo.description 
const thumbnail = productInfo.image1
const submissionType = productInfo.is_recent_item

quill.setContents(JSON.parse(Description))

if(thumbnail) {
    imagePreview.style.display = "flex"
    removeImageContainer.style.display = "block"
    dzbutton.style.display = "none"
    const img = document.createElement('img');
    

    if(submissionType === "yes"){
    img.src = thumbnail;
    }else {
        img.src = `/uploads/${thumbnail}`
    }
    imagePreview.innerHTML = '';
    imagePreview.appendChild(img);
    imagePreview.innerHTML += `<input name='oldThumbnail' value="${img.src}" hidden>`
    imageInput.removeAttribute("required")
}
const ProductFIles = await GetProductFiles(ItemId)
// liet out all available items 
const imagesList = document.getElementById("imagesList")
const videoContainer  = document.getElementById("videoList")
const videoURL = document.getElementById("videoURL")

for(let i=0; i<ProductFIles.length; i++){

    if(ProductFIles[i].file_type === "image_file" && ProductFIles[i].file_status === "new_submission"){
    imagesList.innerHTML += ` <span><a href=${ProductFIles[i].file_url}>${ProductFIles[i].file_url}</a> <span><br>`
    }else if(ProductFIles[i].file_type === "image_file"){
        imagesList.innerHTML += ` <span><a href=/uploads${ProductFIles[i].file_url}>/uploads/${ProductFIles[i].file_url}</a> <span><br>`
    }
    if(ProductFIles[i].file_type === "video_file"){
        videoContainer.innerHTML = `<span><a href=${ProductFIles[i].file_url}>${ProductFIles[i].file_url}</a> <span><br>`
        videoContainer.innerHTML = `<input name="oldVIdeoFile" value="${ProductFIles[i].file_url}" hidden readonly>`
    }
    if(ProductFIles[i].file_type === "video_url"){
        videoURL.value = ProductFIles[i].file_url
    }
}

for(let z=0; z< (1); z++){
    imagesList.innerHTML += ` <input type="file" accept=".jpg, .png, .jpeg" class="form-control" name="imageFile[]" hidden>`
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
    if(imageInput.hasAttribute("required")){
    }else{
    imageInput.setAttribute("required", true)
    }
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
            fetch(`/updateAdvert`, {
        method: "POST",
        body: newData, // Send FormData directly
        // No need to set Content-Type header
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        if(data.success){
            alert(data.success)
            // DeleteCookie("sessionId")
            // DeleteCookie("paymentId")
            window.location.href = "/mylistings"
            // window.location.href = data.url

            
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
