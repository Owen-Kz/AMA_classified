const url = new URL(window.location.href);
const pathname = url.pathname; // '/l/Videography/7231'
const segments = pathname.split('/').filter(Boolean);

const productTitle= segments[1]; // 'Videography'
const id = segments[2];       // '7231'


const locationContainer = document.getElementById("locationContainer")
const descriptionContainer = document.getElementById("descriptionContainer")

const productCategory = document.getElementById("productCategory")
const imageSlideShowContainer = document.getElementById("imageSlideShowContainer")
const SmalPreviews = document.getElementById("small_image_previews")



function GetProductDetails(productId, productTitle) {

    fetch(`/details/brand/${productTitle}/${productId}`, {
        method: "GET"
    }).then(res => res.json())
    .then(async (data) => {
        if (data.success) {
            const productDetails = data.details;
           const brandUrl = document.getElementById("brandUrl")
           if(brandUrl !== "N/A"){
            
           brandUrl.setAttribute("href", productDetails.url)
           brandUrl.setAttribute("target", "_blank")
           }else{
            brandUrl.setAttribute("style", "display:none;")
           }

    
            const productTitle = productDetails.title

            locationContainer.innerText = productDetails.country;
         
            // for product description 

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

        

            const titleContainer = document.querySelector(".product_title")
            titleContainer.innerText = productTitle
     
            const category = productDetails.category;
         
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

      

            // Set the content for the slide show 
            if(prodFiles.length > 0){
            
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
            // window.location.href = "/";
        }
    });
}



if(productTitle && id){
   
    GetProductDetails(id, productTitle)

}else{
    window.location.href = '/'
}

