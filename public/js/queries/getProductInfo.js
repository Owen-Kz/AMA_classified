const url = new URL(window.location.href);
const pathname = url.pathname; // '/l/Videography/7231'
const segments = pathname.split('/').filter(Boolean);

const productTitle= segments[1]; // 'Videography'
const id = segments[2];       // '7231'

const priceContainer = document.getElementById("priceContainer")
const locationContainer = document.getElementById("locationContainer")
const conditionContainer = document.getElementById("conditionContainer")
const descriptionContainer = document.getElementById("descriptionContainer")
const purposeContainer = document.getElementById("purposeContainer")
const SubCategories = document.getElementById("SubCatContainer")
const productCategory = document.getElementById("productCategory")
const imageSlideShowContainer = document.getElementById("imageSlideShowContainer")
const SmalPreviews = document.getElementById("small_image_previews")
const SellerDetailsContainer = document.getElementById("sellerDetailsContainer")
async function GetSellerDetails(uid){
    return fetch(`/seller/profile/details/`, {
        method:"POST",
        body:JSON.stringify({u_id:uid}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data.success){
            return data.sellerDetails
        }else{
            return null
        }
    })
}

function GetProductDetails(productId, productTitle) {
    fetch(`/details/${productTitle}/${productId}`, {
        method: "GET"
    }).then(res => res.json())
    .then(async (data) => {
        if (data.success) {
            const productDetails = data.details;
            const sellerID = productDetails.user_id

            const sellerDetails = await GetSellerDetails(sellerID)
       
            if(sellerDetails.u_name){
                SellerDetailsContainer.innerHTML = `
                <div class="seller_profile_top">
                    <div class="seller_profile_top_left">
                        <div class="avatar_container">
                            <img src="/assets/logo.png" alt="profileImage">
                        </div>
                    </div>
                    <div class="seller_profile_top_right">
                        <ul>
                            <li>
                                <span class="icon_container">
                                    <i class="bi bi-person"></i>
                                </span>
                                <span class="text_container">${sellerDetails.u_name}</span>
                            </li>
                            <li>
                                <span class="icon_container">
                                    <i class="bi bi-envelope"></i>
                                </span>
                                <span class="text_container">${sellerDetails.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Start Sellert profile bottom -->
                 <div class="seller_profile_bottom">
                    <button>View Profile</button>
                    <button>Message Seller</button>
                 </div>
                 <!-- end seller profile bottom  -->`
            }else{
                SellerDetailsContainer.innerHTML = `<div class="seller_profile_top">Seller Information is Unavailable at the moment</div>`
            }
            const productTitle = productDetails.title
            const priceMain = productDetails.price
            purposeContainer.innerText = productDetails.purpose;
            locationContainer.innerText = productDetails.country;
            conditionContainer.innerText = productDetails.condition;
            
            if(priceMain && priceMain != null){
                priceContainer.innerText = `$ ${productDetails.price.toLocaleString()}`
            }else{
                priceContainer.innerText = `Price is Not Applicable`
            }
            const category = productDetails.category;
            const subCats = data.SubCategories;
            const prodFiles = data.productFiles;

            if (productCategory) {
                if (category && category != 'null' && category != "") {
                    productCategory.innerHTML = `<li>
                        <div class="icon_container"><i class="categoryIcon"></i></div>
                        <div class="text_container">${category}</div>
                    </li>`;
                } else {
                    productCategory.innerHTML = `<span>No Category has been added for this Item</span>`;
                }
            }

            if (subCats.length > 0) {
                for (let i = 0; i < subCats.length; i++) {
                    const Cat = subCats[i];
                    SubCategories.innerHTML += `<li>
                        <div class="icon_container"><i class="bi bi-tags"></i></div>
                        <div class="text_container">${Cat.category_name}</div>
                    </li>`;
                }
            } else {
                SubCategories.innerHTML = `<li>
                    <div class="icon_container"><i class="categoryIcon"></i></div>
                    <div class="text_container">No Sub Category Available</div>
                </li>`;
            }

            // Set the content for the slide show 
            
            if (imageSlideShowContainer) {
                for (let b = 0; b < prodFiles.length; b++) {
                    const file = prodFiles[b];
                    if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "old_submission") {
                        imageSlideShowContainer.innerHTML += `<a href="/uploads/${file.file_url}" target="_blank">
                            <div class="slide slide-four" style="background-color: var(--AmasLlnkColor); background-image: url(/uploads/${file.file_url});">
                                <img src="/uploads/${file.file_url}" alt="${productTitle}">
                            </div>
                        </a>`;
                    } else if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "new_submission") {
                        imageSlideShowContainer.innerHTML += `<a href="#">
                            <div class="slide slide-four" style="background-color:var(--AmasLlnkColor); background-image: url(${file.file_url});">
                                <img src="${file.file_url}" alt="${productTitle}">
                            </div>
                        </a>`;
                    }
                    
                }
            }

            if(SmalPreviews){
                for (let b = 0; b < prodFiles.length; b++) {
                    const file = prodFiles[b];
                    if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "old_submission") {
                        SmalPreviews.innerHTML += `<a href="/uploads/${file.file_url}" target="_blank">
                               <div class="small_image_container">
                       <img src="/uploads/${file.file_url}" alt="${productTitle}">
                    </div>
                        </a>`;
                    } else if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "new_submission") {
                        SmalPreviews.innerHTML += `<a href="#">
                          <div class="small_image_container">
                       <img src="${file.file_url}" alt="${productTitle}">
                    </div>
                        </a>`;
                    }
                }
            }

            // Check if the slides exist before initializing the slideshow
            const slides = document.querySelectorAll('.ads-slide .slide');
            if (slides.length > 0) {
                initializeSlideshow();
            } else {
                console.error("Slides are not available.");
            }
            setTimeout(() => {
                initializeSlideshow();
            }, 500);  // Adjust the delay as needed
        } else {
            alert(data.error);
            window.location.href = "/";
        }
    });
}



if(productTitle && id){
    console.log(productTitle, id)
    GetProductDetails(id, productTitle)

}else{
    window.location.href = '/'
}

