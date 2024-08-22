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
                    <form action="#">
                        <input type="text" placeholder="What's your name?" required>
                        <input type="email" placeholder="Email" required>
                        <button>Subscribe</button>
                    </form>
                </div>
                <div class="footer_top_middle">
                    <h3>Latest Ads</h3>
                    <div class="latest_ads_Container">
                        <div class="ad"><img src="/uploads/AMAS.png" alt=""></div>
                        <div class="ad"><img src="/uploads/AMAS.png" alt=""></div>
                        <div class="ad"><img src="/uploads/AMAS.png" alt=""></div>
                        <div class="ad"><img src="/uploads/AMAS.png" alt=""></div>
                        <div class="ad"><img src="/uploads/AMAS.png" alt=""></div>
                        <div class="ad"><img src="/uploads/AMAS.png" alt=""></div>
                        <div class="ad"><img src="/uploads/AMAS.png" alt=""></div>

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