const footerContainer = document.getElementById("footerContainer")

footerContainer.innerHTML = `        <div class="footer">
            <div class="footer_top">
                <div class="footer_top_left">
                    <h3>About Us</h3>
                    <ul>
                        <li class="logo_container"><img src="/assets/logo.png" alt=""></li>
                        <li><p>AMASLINK is fast-growing free online classifieds with advanced security system. We provide a simple hassle-free solution to sell and buy almost anything, anytime,anywhere.</p></li>
                        <li><a href="mailTo:Support@amaslink.com">Support@amaslink.com</a></li>
                    </ul>

                    <h3>Subscribe to our News Letter</h3>
                    <form action="#">
                        <input type="text" placeholder="What's your name?" required>
                        <input type="email" placeholder="Email" required>
                        <button>Subsribe</button>
                    </form>
                </div>
                <div class="footer_top_middle">
                    <h3>Latest Ads</h3>
                    <div class="latest_ads_Container">
                        <div class="ad"><img src="/uploads/dummy.jpg" alt=""></div>
                        <div class="ad"><img src="/uploads/dummy.jpg" alt=""></div>
                        <div class="ad"><img src="/uploads/dummy.jpg" alt=""></div>
                        <div class="ad"><img src="/uploads/dummy.jpg" alt=""></div>
                        <div class="ad"><img src="/uploads/dummy.jpg" alt=""></div>
                        <div class="ad"><img src="/uploads/dummy.jpg" alt=""></div>
                        <div class="ad"><img src="/uploads/dummy.jpg" alt=""></div>

                    </div>
                 
                </div>
                <div class="footer_top_right">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>Listings</li>
                        <li>Login</li>
                        <li>Register</li>
                        <li>How To Post Ads</li>
                    </ul>
                    <h3>Recent Posts</h3>
                    <ul>
                        <li>Post Title</li>
                        <li>Date</li>
                    </ul>

                </div>
            </div>
            <div class="footer_bottom">

            </div>
        </div>`