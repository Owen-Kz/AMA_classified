const url = new URL(window.location.href);
const pathname = url.pathname; // '/l/Videography/7231'
const segments = pathname.split('/').filter(Boolean);

// const productTitle= segments[1]; // 'Videography'
const id = segments[1];       // '7231'

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

function GetProductDetails(productId) {
    fetch(`/details/${productId}`, {
        method: "GET"
    }).then(res => res.json())
    .then(async (data) => {
        if (data.success) {
            const productDetails = data.details;
            const sellerID = productDetails.user_id

            const sellerDetails = await GetSellerDetails(sellerID)
            if(sellerDetails){
                let image = ""
                if(sellerDetails.pp !== null){
                    image = `<img src="${sellerDetails.pp}" alt="profile_photo">`
                }else{
                    image =   `<img src="/plugins/images/users1.jpg" alt="profile_photo">`
                }
            if(sellerDetails.u_name){
                SellerDetailsContainer.innerHTML = `
                <div class="seller_profile_top">
                    <div class="seller_profile_top_left">
                        <div class="avatar_container">
                           ${image}
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
                   <button><a href="/seller/${sellerDetails.id}">View Profile</a></button>
                  
                <button class="btn"><a href="/messages/${sellerDetails.id}?s=${sellerDetails.id}">Message Seller</a></button>
                 </div>
                 <!-- end seller profile bottom  -->` 
            }else{
                SellerDetailsContainer.innerHTML = `<div class="seller_profile_top">Seller Information is Unavailable at the moment</div>`
            }
        }else{
            SellerDetailsContainer.innerHTML = `<div class="seller_profile_top">Seller Information is Unavailable at the moment</div>`
            
        }
            const productTitle = productDetails.title
            const priceMain = productDetails.price
            purposeContainer.innerText = productDetails.purpose;
            locationContainer.innerText = productDetails.country;
            conditionContainer.innerText = productDetails.condition;
            // for product description 
            if(productDetails.is_recent_item === "yes"){
                // Parse the Quill content from the JSON data
                const quillContent = JSON.parse(productDetails.description);

                function renderQuillAsHTML(divId, deltaContent) {
                    // Create a Quill instance in a temporary div
                    const tempDiv = document.createElement('div');
                    const quill = new Quill(tempDiv, {
                        theme: 'snow',
                        modules: { toolbar: false },
                        readOnly: true,
                    });

                    // Set the content as Quill Delta and extract the HTML
                    quill.setContents(deltaContent);

                    // Get the innerHTML from the Quill editor
                    const htmlContent = tempDiv.innerHTML;

                       // Render the extracted HTML into the specified div
                descriptionContainer.innerHTML =  htmlContent
                }

                // Render the Quill content as HTML in the "content" div
                renderQuillAsHTML('content', quillContent);

                
            }else{
                descriptionContainer.innerHTML = `<p>${productDetails.description}</p>`
            }

            const titleContainer = document.querySelector(".product_title")
            titleContainer.innerText = productTitle
            if(priceMain && priceMain != null){
                priceContainer.innerText = `$ ${productDetails.price.toLocaleString()}`
            }else{
                priceContainer.innerText = `Contact Seller For Price`
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
            if(prodFiles.length > 0){
            const head = document.getElementById("head")
            head.innerHTML += ` 
             <meta property="og:title" content="${productTitle}'s Profile" />
    
              <meta property="og:image" content="${prodFiles[0].file_url}" />`
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
                    }else if(file.file_type === "video_file"){
                        imageSlideShowContainer.innerHTML += `<a href="#">
                        <div class="slide slide-four" style="background-color:var(--AmasLlnkColor);">
                          
                            <video controls width="100%">
                            <source src="${file.file_url}" type="video/webm" />

                            <source src="${file.file_url}" type="video/mp4" />

                           
                            </video>
                        </div>
                    </a>`;
                    }else if(file.file_type === "video_url"){

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
                    }else if(file.file_type === "video_file"){
                    const SmallVideoPreview = document.getElementById("smalllVideoPreview")
                    
                       SmallVideoPreview.innerHTML += `
                        <div class="small_image_container">
                        <video controls width="100%">
                            <source src="${file.file_url}" type="video/webm" />

                            <source src="${file.file_url}" type="video/mp4" />

                       
                            <a href="${file.file_url}">WEBM</a>
                            or
                            <a href="${file.file_url}">MP4</a>
                            video.
                            </video>
                     </div>
                    `;
                    }else if(file.file_type === "video_url"){
                        
                    }
                    
                }
            }
        }else{
            imageSlideShowContainer.innerHTML = `<a href="#">
            <div class="slide slide-four" style="background-color:var(--AmasLlnkColor); background-image: url(/uploads/AMAS.png);">
                <img src="/uploads/AMAS.png" alt="${productTitle}">
            </div>
        </a>`;
                SmalPreviews.innerHTML += `<a href="#">
                <div class="small_image_container">
            <img src="/uploads/AMAS.png" alt="${productTitle}">
        </div>
            </a>`;
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



if(id){

    GetProductDetails(id)

}else{
    alert("Invalid ID")
    window.location.href = '/'
}

