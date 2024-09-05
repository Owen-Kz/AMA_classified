const GetCookie = function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null; // Cookie not found
}

const admin_nav = `<ul id="sidebarnav" >
                        <!-- User Profile-->
                        <li class="sidebar-item pt-2">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/superadmin"
                                aria-expanded="false">
                                <i class="bi bi-speedometer2" aria-hidden="true"></i>
                                <span class="hide-menu">Dashboard</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/s/profile"
                                aria-expanded="false">
                                <!-- <i class="fas fa-hands" aria-hidden="true"></i> -->
                                <i class="bi bi-person-lines-fill"></i>
                                <span class="hide-menu">View / Edit Profile</span>
                            </a>
                        </li>
                                  <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/members"
                                aria-expanded="false" >
                                <i class="bi bi-people" aria-hidden="true"></i>
                                <span class="hide-menu">Members List</span>
                            </a>
                        </li>
                               <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/s/announcements"
                                aria-expanded="false" >
                                <i class="bi bi-megaphone" aria-hidden="true"></i>
                                <span class="hide-menu">Announcements</span>
                            </a>
                        </li>
                                <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/s/subscribers"
                                aria-expanded="false" >
                                <i class="bi bi-people" aria-hidden="true"></i>
                                <span class="hide-menu">Subscribed Users</span>
                            </a>
                        </li>
                                <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/email"
                                aria-expanded="false" >
                                <i class="bi bi-envelope" aria-hidden="true"></i>
                                <span class="hide-menu">Send Bulk Email</span>
                            </a>
                        </li>
                        
                                <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/s/forum"
                                aria-expanded="false" >
                                <i class="bi bi-people" aria-hidden="true"></i>
                                <span class="hide-menu">Forums</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="https://dashboad.tawk.to"
                                aria-expanded="false" >
                                <i class="bi bi-people" aria-hidden="true"></i>
                                <span class="hide-menu">Blog and Correspondence</span>
                            </a>
                        </li>
                                 <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/messages"
                                aria-expanded="false" >
                                <i class="bi bi-chat-right" aria-hidden="true"></i>
                                <span class="hide-menu">Messages</span>
                            </a>
                        </li>
                     
          <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/s/all"
                                aria-expanded="false" >
                                <i class="bi bi-list-columns-reverse" aria-hidden="true"></i>
                                <span class="hide-menu">All Listings</span>
                            </a>
                        </li>
                                  <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/s/brands"
                                aria-expanded="false" >
                                <i class="bi bi-list-columns-reverse" aria-hidden="true"></i>
                                <span class="hide-menu">Brand Adverts</span>
                            </a>
                        </li>
                                  <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/s/fullpage"
                                aria-expanded="false" >
                                <i class="bi bi-list-columns-reverse" aria-hidden="true"></i>
                                <span class="hide-menu">Full Page Advert</span>
                            </a>
                        </li>
                                <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/s/pending"
                                aria-expanded="false" >
                                <i class="bi bi-hourglass-split" aria-hidden="true"></i>
                                <span class="hide-menu">Pending Listings</span>
                            </a>
                        </li>

                                                                                <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/mylistings"
                                aria-expanded="false" >
                                <i class="bi bi-list-columns-reverse" aria-hidden="true"></i>
                                <span class="hide-menu">My Listings</span>
                            </a>
                        </li>

                                <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/s/transactions"
                                aria-expanded="false" >
                                <i class="bi bi-people" aria-hidden="true"></i>
                                <span class="hide-menu">Recent Transactions</span>
                            </a>
                        </li>
                
                                                                                <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/"
                                aria-expanded="false" >
                                <i class="bi bi-house" aria-hidden="true"></i>
                                <span class="hide-menu">Back To Home</span>
                            </a>
                        </li>
                        <li class="text-center p-20 upgrade-btn">
                            <a href="/superadmin/logout"
                                class="btn d-grid btn-danger text-white">
                                Logout</a>
                        </li>
                    </ul>  `
const editor_nav = `<ul id="sidebarnav">
                        <!-- User Profile-->
                        <li class="sidebar-item pt-2">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/dashboard"
                                aria-expanded="false">
                                <i class="bi bi-speedometer2" aria-hidden="true"></i>
                                <span class="hide-menu">Dashboard</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/profile"
                                aria-expanded="false">
                                <!-- <i class="fas fa-hands" aria-hidden="true"></i> -->
                                <i class="bi bi-person-lines-fill"></i>
                                <span class="hide-menu">View / Edit Profile</span>
                            </a>
                        </li>
                               <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/announcements"
                                aria-expanded="false" >
                                <i class="bi bi-megaphone" aria-hidden="true"></i>
                                <span class="hide-menu">Announcements</span>
                            </a>
                        </li>
                            
                                 <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/messages"
                                aria-expanded="false" >
                                <i class="bi bi-chat-right" aria-hidden="true"></i>
                                <span class="hide-menu">Messages</span>
                            </a>
                        </li>
                                                         <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="https://amaslink.tawk.help/category/frequently-asked-questions"
                                aria-expanded="false" target=_blank>
                                <i class="bi bi-newspaper" aria-hidden="true"></i>
                                <span class="hide-menu">FAQs</span>
                            </a>
                        </li>
                            <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/bookmarks"
                                aria-expanded="false" >
                                <i class="bi bi-bookmark-fill" aria-hidden="true"></i>
                                <span class="hide-menu">Bookmarks</span>
                            </a>
                        </li>
                                                                                <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/mylistings"
                                aria-expanded="false" >
                                <i class="bi bi-list-columns-reverse" aria-hidden="true"></i>
                                <span class="hide-menu">My Listings</span>
                            </a>
                        </li>

                                  <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/adintro"
                                aria-expanded="false" >
                                <i class="bi bi-badge-ad-fill" aria-hidden="true"></i>
                                <span class="hide-menu">Post AD</span>
                            </a>
                        </li>

                             <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/contact"
                                aria-expanded="false" >
                                <i class="bi bi-person-rolodex" aria-hidden="true"></i>
                                <span class="hide-menu">Contact</span>
                            </a>
                        </li>
                                                                                <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/"
                                aria-expanded="false" >
                                <i class="bi bi-house" aria-hidden="true"></i>
                                <span class="hide-menu">Back To Home</span>
                            </a>
                        </li>
                        <li class="text-center p-20 upgrade-btn">
                            <a href="/logout"
                                class="btn d-grid btn-danger text-white">
                                Logout</a>
                        </li>
                    </ul> `;


 const navbar_container = document.getElementById("sidebar_nav")
 navbar_container.innerHTML = editor_nav

const isAdminToken = GetCookie("_ama")
const isAupser = GetCookie("_superID")

if(isAdminToken && isAupser){
    

navbar_container.innerHTML = admin_nav
}
