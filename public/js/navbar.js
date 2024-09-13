// window.addEventListener('scroll', function() {
//     const navbar = document.querySelector('.navbar');
//     if (window.scrollY > 50) { // Adjust the scroll position as needed
//         // navbar.classList.add('scrolled');
//         // navbar.setAttribute("style", "position:absolute; top:0;")
//     } else {
//         // navbar.classList.remove('scrolled');
//         // navbar.setAttribute("style", "position:sticky;")
//     }
// });

// // const { GetCookie } = require("./routes/setCookie")
// <select name="by" id="searchBy">
// <option value="Category">Category</option>
// <option value="Keywords">Keywords</option>
// <option value="Country">Country</option>
// </select>
const navbarContainer = document.querySelectorAll(".navbarContainer")
const topBarContainer = document.getElementById("topBarContainer")
async function ProfileData(){
    return fetch(`/profile/details/informative`, {

    }).then(res =>res.json())
    .then(data =>{
        if(data.userDetails){
            return data.userDetails
        }else{
            return null
        }
    })
}
const userLogged = await ProfileData()
let isLoggedINProfile = ""
if(userLogged.id && userLogged.id != null && userLogged.id !== "" && userLogged.id != "2209102"){
    isLoggedINProfile = ` <ul>
                    <li><a href="/dashboard">Welcome Back, <b> ${userLogged.u_name}</b></a></li>
                     <li><a href="/annoucements"><i class="bi bi-bell"></i><span>Annoucements</span></a></li>
                      <li><a href="/messages"><i class="bi bi-chat-right"></i><span>Messages</span></a></li>
                     <li><a href="/mylistings"><i class="bi bi-list-columns-reverse"></i><span>Listings</span></a></li>
                </ul>`
                
}else{
    isLoggedINProfile = `    <ul>
                    <li><a href="/login">Login</a></li>
                    
                    <li><b><a href="/register">Register</a></b></li>
                    
                </ul>`
}
topBarContainer.innerHTML = `        <!-- start top bar  -->
        <div class="topBar">
            <div class="topBarLeft">
            ${isLoggedINProfile}
            </div>
            
            <div class='mobileNav' id="mobileNav">
            <i class="bi bi-list" aria-hidden="true"></i>
            </div>
        </div>
           <div class='secondaryTopBar'>
           <div class='left'>
               <!-- div.searchContainer  -->
             <div class="searchContainer">
                <form action="/q/listings">
               
                    <input type="text" name="q" placeholder="Search for an item by name, keyword or category" required>
                    <button><i class="bi bi-search" aria-hidden="true"></i></button>
                </form>
             </div>
            <!-- End Search container  -->
            </div>
            <div class="right">
            <a href="/map"><i class="bi bi-map"></i> <span>Map</span></a>
            
            </div>
           </div>
        <!-- end topbar -->
  `

navbarContainer.forEach(container =>{

container.innerHTML = `                <!-- Left  -->
                <div class="navbar-left">
                    <div class="image_container">
                        <img src="/plugins/images/logo.png" alt="Amaslink Logo">
                    </div>
                </div>
                <!-- End Left  -->
    
                
                <div class="nav_right">
                    <ul class="nav_list">
                        <li class="navigationLink"><a href="/">Home</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle">Explore <i class="arrow-down"></i></a>
                            <ul class="dropdown-menu">
                              <li><a href="/categories">Categories</a></li>
                              <li><a href="/listings">Listings</a></li>
                              <li><a href="/auctions">Auctions</a></li>
                            </ul>
                          </li>
                        <li class="navigationLink"><a href="/forum">Forum</a></li>
                        <li class="navigationLink"><a href="https://amaslink.tawk.help/category/frequently-asked-questions">FAQs</a></li>
                        <li class="navigationLink"><a href="/privacy">Privacy Policy</a></li>
                        <li class="navigationLink"><a href="/contact">Contact</a></li>
                        <li class="navigationLink"><a href="https://amaslink.tawk.help/category/amaslink-blog">Blog</a></li>
                        <li class="navigationLink">
                        <a href="/adintro">
                        <button class="post_add btn-border">Post AD</button>
                        </a>
                        </li>
                       
    
                    </ul>
                </div><!-- Right -->
                <!-- End right  -->
    
            `
})


document.getElementById('mobileNav').addEventListener('click', function() {
    var navbar = document.querySelector('.containerForNav');
    navbar.classList.toggle('expanded');
});
