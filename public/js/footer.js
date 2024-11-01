const footerContainer = document.getElementById("footerContainer")
const date = new Date().getFullYear();

footerContainer.innerHTML = `        <div class="footer">
            <div class="footer_top">
                <div class="footer_top_left">
                    <h3>About Us</h3>
                    <ul>
                        <li class="logo_container"><img src="/plugins/images/logo-light-text.png" alt="Amaslink Logo"></li>
                        <li><p>AMASLINK is fast-growing free online classifieds with advanced security system. We provide a simple hassle-free solution to sell and buy almost anything, anytime,anywhere.</p></li>
                        <li><a href="mailTo:Support@amaslink.com">Support@amaslink.com</a></li>
                    </ul>

                    <h3>Subscribe to our News Letter</h3>
                    <form id="newletterForm">
                        <input type="text" placeholder="What's your name?" required id="nameField">
                        <input type="email" placeholder="Email" required id="emailField">
                        <button>Subscribe</button>
                    </form>
                </div>
                <div class="footer_top_middle">
                    <h3>Latest Ads</h3>
                    <div class="latest_ads_Container">
                    

                    </div>
                 
                </div>
                <div class="footer_top_right">
                    <ul>
                    <h3>Quick Links</h3>
                        <li><a href="/listings">Listings</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="https://amaslink.tawk.help/article/how-to-post-ads-on-amaslink">How To Post Ads</a></li>
                    </ul>
                    <ul>
                    <h3>Recent Posts</h3>
                        <li><a href="https://amaslink.tawk.help/category/amaslink-blog">Blog Posts</a></li>
                        
                    </ul>

                </div>
            </div>
            <div class="footer_bottom">
            
                    ${date} © Amaslink - all rights reserved
                
            </div>
        </div>`
    
const newletterForm = document.getElementById("newletterForm")

newletterForm.addEventListener("submit", function(e){
    e.preventDefault()
    const nameField = document.getElementById("nameField")
    const emailField = document.getElementById("emailField")

    fetch(`/newsLetter/subscribe`, {
        method:"POST", 
        body:JSON.stringify({email:emailField.value, name:nameField.value}),
        headers:{
            "Content-type":"application/JSON"
        }
    }).then(res => res.json())
    .then(data=>{
        if(data.success){
            alert(data.success)
        }else{
            alert(data.error)
        }
    })
})

const AdsContainer = document.querySelector(".latest_ads_Container")

fetch(`/listings?page=1`, {
    method:"POST"
}).then(res=>res.json())
.then(async (data) =>{
    if(data.success){
        const ListingsList = data.listings
        for(i=0; i<9; i++){
          
            let image = ""
        if(ListingsList[i].is_recent_item === "yes"){
            image = ListingsList[i].image1
        }else{
            image = `/uploads/${ListingsList[i].image1}`
        }

            AdsContainer.innerHTML += `
            <a href='/l/${ListingsList[i].title}/${ListingsList[i].id}'><div class="ad">
            
            <img src="${image}" alt="Image">
            </div></a>`
        }
    }else{
        console.log(data.error)
    }
})