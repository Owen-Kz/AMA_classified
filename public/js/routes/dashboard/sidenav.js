import { GetCookie } from "../setCookie.js";
import { validateLogin } from "../validateLogin.js";

const admin_nav = `<ul id="sidebarnav">
                        <!-- User Profile-->
                        <li class="sidebar-item pt-2">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="../Dashboard/"
                                aria-expanded="false">
                                <i class="far fa-clock" aria-hidden="true"></i>
                                <span class="hide-menu">Dashboard</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="../Authors/"
                                aria-expanded="false">
                                <i class="bi bi-person" aria-hidden="true"></i>
                                <span class="hide-menu">Authors</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="../Inbox/"
                                aria-expanded="false">
                                <!-- <i class="fas fa-hands" aria-hidden="true"></i> -->
                                <i class="fas fa-envelope"></i>
                                <span class="hide-menu">Inbox</span>
                            </a>
                        </li>
                              <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="../Mail/"
                                aria-expanded="false">
                                <!-- <i class="fas fa-hands" aria-hidden="true"></i> -->
                                <i class="fas fa-envelope"></i>
                                <span class="hide-menu">News Letter</span>
                            </a>
                        </li>
                           <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="../EditorInvitations/"
                                aria-expanded="false">
                                <!-- <i class="fas fa-hands" aria-hidden="true"></i> -->
                                <i class="bi bi-person-plus"></i>
                                <span class="hide-menu">Editor Invitations</span>
                            </a>
                        </li>
                            <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="https://asfirj.org/dashboard/"
                                aria-expanded="false" >
                                <i class="bi bi-person" aria-hidden="true"></i>
                                <span class="hide-menu">Author's Dashboard</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="https://asfirj.org/manuscriptPortal/manage" target="_blank"
                                aria-expanded="false">
                                <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                                <span class="hide-menu">Manage Supplements</span>
                            </a>
                        </li>
                  
                        
                        <li class="text-center p-20 upgrade-btn">
                            <a href="../Logout/"
                                class="btn d-grid btn-danger text-white">
                                Logout</a>
                        </li>
                    </ul> `
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
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/faq"
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
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="/contact"
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
                            <a href="../Logout/"
                                class="btn d-grid btn-danger text-white">
                                Logout</a>
                        </li>
                    </ul> `;


 const navbar_container = document.getElementById("sidebar_nav")
 navbar_container.innerHTML = editor_nav

const user = GetCookie("editor")
if(user){
const AccountData = await validateLogin(user)


const userFullname = AccountData.fullname 
const email = AccountData.email 
const accoount_type = AccountData.editorial_level

if(accoount_type === "editor_in_chief" || accoount_type === "editorial_assistant"){
   navbar_container.innerHTML = admin_nav;
}else if(accoount_type === 'sectional_editor' || accoount_type === "associate_editor"){
    navbar_container.innerHTML = editor_nav;
}
}