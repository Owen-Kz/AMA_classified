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

       categoriesContainer.innerHTML = `<a href="/adIntro" >
       <li style="background:var(--AmasLinkColor); color:white;">
                        <div class="icon_container"><i class="bi bi-link-45deg" style="color:white;"></i></div>
                        <div class="text_container">Post Ad</div>
                    </li>`
        for(let i=0; i<Cats.length; i++){
            const category = Cats[i]
            categoriesContainer.innerHTML += `<a href="/cat?c=${category.category_name}"><li>
                        <div class="icon_container"><i>${category.icon}</i></div>
                        <div class="text_container">${category.category_name}</div>
                    </li>
                  
                    `
        }
    }else{
        categoriesContainer.innerHTML = `<div>Could Not Get Categories</div>`
    }

})