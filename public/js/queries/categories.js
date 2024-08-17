const categoriesContainer = document.getElementById("productCategory")

fetch(`/allCategories`, {
    method:"POST",
    body:JSON.stringify({email:"amaslink@gmail.com"}),
    headers:{
        "Content-type" : "application/JSON"
    }
}).then(res => res.json())
.then(data => {
    if(data.success){
        const Cats = data.categories

       
        for(let i=0; i<Cats.length; i++){
            const category = Cats[i]
            categoriesContainer.innerHTML += `<li>
                        <div class="icon_container"><i class="bi bi-tags"></i></div>
                        <div class="text_container">${category.category_name}</div>
                    </li>`
        }
    }else{
        categoriesContainer.innerHTML = `<div>Could Not Get Categories</div>`
    }

})