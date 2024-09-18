const staticAdvertsContainer = document.getElementById("staticAdvertContainer")


fetch(`/staticAdverts`,{
    method:"POST",
    header:{
        "Content-type":"application/JSON"
    }
}).then(res =>res.json())
.then(data=>{
    if(data){
        if(data.success){
            const staticAdverts = data.adverts
       
         
            if(staticAdverts){
                const advert = staticAdverts
      
    
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
                                     <a href="/brand/${advert.title}/${advert.item_id}">    <img src="${file.file_url}" alt="${advert.title}"/></a>
                                   `;
                            }
                                                
                    
                }else{
                    ImageContainer = ` 
                     <a href="/brand/${advert.title}/${advert.item_id}">  <img src="/uploads/AMAS.png" alt="${advert.title}"/></a>`
                }
                
                staticAdvertsContainer.innerHTML += `
               
                    ${ImageContainer}

                        
                   `
            }
        })
            

      

        }
    }else{

        staticAdvertsContainer.innerHTML += `<a href="/adintro"><img src="/uploads/AMAS.png" alt="No  Static ADvert available"/></a>`
    }
    }
})