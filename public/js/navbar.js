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

const navbarContainer = document.getElementById("navbarContainer")
const topBarContainer = document.getElementById("topBarContainer")

topBarContainer.innerHTML = `        <!-- start top bar  -->
        <div class="topBar">
            <div class="topBarLeft">
                <ul>
                    <li><a href="/login">Login</a></li>
                    |
                    <li><b><a href="/register">Register</a></b></li>
                </ul>
            </div>
            <!-- div.searchContainer  -->
             <div class="searchContainer">
                <form action="#">
                    <select name="searchBy" id="searchBy">
                        <option value="Category">Category</option>
                        <option value="Keywords">Keywords</option>
                        <option value="Country">Country</option>
                    </select>
                    <input type="text" name="q" placeholder="Enter Search Query Here">
                    <button>S</button>
                </form>
             </div>
            <!-- End Search container  -->
        </div>
        <!-- end topbar -->
  `
navbarContainer.innerHTML = `                <!-- Left  -->
                <div class="navbar-left">
                    <div class="image_container">
                        <img src="/assets/logo.png" alt="Amaslink Logo">
                    </div>
                </div>
                <!-- End Left  -->
    
                
                <div class="nav_right">
                    <ul class="nav_list">
                        <li>Home</li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle">Explore <i class="arrow-down"></i></a>
                            <ul class="dropdown-menu">
                              <li><a href="/categories">Categories</a></li>
                              <li><a href="/listings">Listings</a></li>
                              <li><a href="/auctions">Auctions</a></li>
                            </ul>
                          </li>
                        <li>Fortum</li>
                        <li>FAQs</li>
                        <li>Privacy Policy</li>
                        <li>Contact</li>
                        <li>Blog</li>
                        <li><button class="post_add btn-border">Post AD</button></li>
                       
    
                    </ul>
                </div><!-- Right -->
                <!-- End right  -->
    
            `