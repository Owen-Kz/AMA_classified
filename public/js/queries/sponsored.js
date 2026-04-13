const sponsoredAdvertsContainer = document.getElementById("sponsoredAdverts")

{/* <div class="location"><i class="location_icon"></i>${advert.country}</div> */}
async function GetProductFiles(productId) {
    return fetch(`/listingFiles/${productId}`, {
         method: "GET"
     }).then(res => res.json())
     .then(data => {
         if(data){
         if (data.success) {
             return data.productFiles
         }else{
             return  []
         }
     }else{
         return []
     }
     })
 }
fetch(`/sponsoredAdverts`,{
    method:"POST",
    header:{
        "Content-type":"application/JSON"
    }
}).then(res =>res.json())
.then(data=>{
    if(data){
        
        if(data.success){
            const sponsoredAdverts = data.adverts
            if(sponsoredAdverts.length > 0){

            
            for(let i=0; i<sponsoredAdverts.length; i++){
                const advert = sponsoredAdverts[i]

                fetch(`/details/brand/${advert.title}/${advert.item_id}`, {
                    method: "GET"
                }).then(res => res.json())
                .then(async (data) => {
                    if (data.success) {
                        const productDetails = data.details;
                    
           
                const prodFiles = data.productFiles;
                let ImageContainer = ""
                if(prodFiles.length > 0){
            
                
                            const file = prodFiles[0];
                            if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "old_submission") {
                                ImageContainer = `
                                        <img src="/uploads/${file.file_url}" alt="${advert.title}"/>
                                `;
                            } else if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "new_submission") {
                               ImageContainer = `
                                        <img src="${file.file_url}" alt="${advert.title}"/>
                                   `;
                            }
                                                
                    
                }else{
                    ImageContainer = `  <img src="/uploads/AMAS.png" alt="${advert.title}"/>`
                }
                
                sponsoredAdvertsContainer.innerHTML += `
                <a href="/brand/${advert.title}/${advert.item_id}">
                <div class="sponsoredAd">
                    <div class="image_container">
                    ${ImageContainer}

                    </div>
                    <div class="actions">
                        <div class="viewsCount">
                            <i class="sponsored_icon"></i>
                            <span>Sponsored</span>
                            
                        </div>

                    </div>
                           <!-- start product info  -->
                           <div class="product_info">
                            <div class="product_name">
                                ${advert.title}
                            </div>
                        
                         </div>
                         <!-- end product info  -->
                </div></a>`
            }
        })
            }

            for(let i=0; i<2; i++){
                sponsoredAdvertsContainer.innerHTML += `
                 <div class="sponsoredAd">
                    <div class="image_container">
                        <!-- <img src="/uploads/dummy.jpg" alt="Product image"> -->
            <img src="/assets/ad_space.png" alt="Vacant Ad Space">

                    </div>
                    <div class="actions">
                        <div class="viewsCount">
                            <i class="sponsored_icon"></i>
                            <span>Sponsored</span>
                            
                        </div>

                    </div>
                           <!-- start product info  -->
                           <div class="product_info">
                            <div class="product_name">
                                
                            </div>
                            <div class="location"></div>
                         </div>
                         <!-- end product info  -->
                </div>`
            }
        }else{
            for(let i=0; i<6; i++){
                sponsoredAdvertsContainer.innerHTML += `
                 <div class="sponsoredAd">
                    <div class="image_container">
                        <!-- <img src="/uploads/dummy.jpg" alt="Product image"> -->
            <img src="/assets/ad_space.png" alt="Vacant Ad Space">

                    </div>
                    <div class="actions">
                        <div class="viewsCount">
                            <i class="sponsored_icon"></i>
                            <span>Sponsored</span>
                            
                        </div>

                    </div>
                           <!-- start product info  -->
                           <div class="product_info">
                            <div class="product_name">
                               
                            </div>
                            <div class="location"></div>
                         </div>
                         <!-- end product info  -->
                </div>`
            }
        }
    }else{
        sponsoredAdvertsContainer.innerHTML += `Nothing To display yet`
    }
    }
})