const SLideShowAdvertsContainer = document.getElementById("slideAdvertContainer")

{/* <div class="location"><i class="location_icon"></i>${advert.country}</div> */}
SLideShowAdvertsContainer.innerHTML += `
<a href="#">
<div class="slide slide-four" style="background-color: rgb(40, 40, 40); background-image: url(/uploads/AMAS.png);"></div>
</a>`

fetch(`/SlideShowAdverts`,{
    method:"GET",
 
}).then(res =>res.json())
.then(async data=>{
    if(data){
      
        if(data.success){
            const SLideShowAdverts = data.adverts
            if(SLideShowAdverts.length > 0){
    

            
            for(let i=0; i<SLideShowAdverts.length; i++){
                const advert = SLideShowAdverts[i]
    

              await  fetch(`/details/brand/${advert.title}/${advert.item_id}`, {
                    method: "GET"
                }).then(res => res.json())
                .then(async (data) => {
                    if (data.success) {
                        const productDetails = data.details;
                    
           
                const prodFiles = data.productFiles;
                let ImageContainer = ""
                if(prodFiles.length > 0){
                    
                    for(let b=0; b<prodFiles.length; b++){
                
                            const file = prodFiles[b];



                            if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "old_submission") {
                                ImageContainer = `
                                        <img src="/uploads/${file.file_url}" alt="${advert.title}"/>
                                `;
                            } else if ((file.file_type === "image_file" || file.file_type === "" ) && file.file_status === "new_submission") {
                       
                                    
            
                                  
                                   SLideShowAdvertsContainer.innerHTML += `<a href="/brand/${advert.title}/${advert.item_id}">
                <div class="slide slide-four" style="background-color: rgb(40, 40, 40); background-image: url('${file.file_url}');"> </div>
            </a>`; 

            await CreateSlides()
                            }
                        }
                                                
                    
                }else{
        
                    SLideShowAdvertsContainer.innerHTML += `<a href="/brand/${advert.title}/${advert.item_id}">
                    <div class="slide slide-four" style="background-color: rgb(40, 40, 40); background-image: url('/uploads/AMAS.png');"> </div>
                </a>`; 
                }            
            }
        })
            }

        }else{
          
            SLideShowAdvertsContainer.innerHTML += `<a href="/brand/${advert.title}/${advert.item_id}">
            <div class="slide slide-four" style="background-color: rgb(40, 40, 40); background-image: url('/uploads/AMAS.png');"> </div>
        </a>`; 
        }
    }else{
        SLideShowAdvertsContainer.innerHTML += `Nothing To display yet`
    }
    }
})