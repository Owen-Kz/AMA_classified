const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const path = require("path")
const fs = require('fs');

const siteMap = async (req, res) => {
    try {
        res.header('Content-Type', 'application/xml');
        res.header('Content-Encoding', 'gzip');

        const smStream = new SitemapStream({ hostname: 'https://amaslink.com' });
        const pipeline = smStream.pipe(createGzip());

        // Add dynamic URLs
        smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/register', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/login', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/listings', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/dashboard', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/privacy', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/faq', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/referrals', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/adintro', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/categories', changefreq: 'daily', priority: 1.0 });


        





     
        smStream.end();

        streamToPromise(pipeline).then(sm => {
           // Define the correct path to the public directory in the parent folder

           const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml.gz');
           
        fs.writeFileSync(sitemapPath, sm);
        });

        pipeline.pipe(res).on('error', (err) => { throw err; });
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}

module.exports = siteMap
