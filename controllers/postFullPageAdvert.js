const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { configDotenv } = require("dotenv");
const ChargeForItem = require("./chargeForItem");
const cloudinary = require('cloudinary').v2;

// Load environment variables
configDotenv();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Define the upload folder path and ensure it is writable
const folderPath = path.join(__dirname, "../public/userUpload/");
fs.access(folderPath, fs.constants.W_OK, (err) => {
  if (err) {
    console.log(`The folder '${folderPath}' is not writable:`, err);
  } else {
    console.log(`The folder '${folderPath}' is writable`);
  }
});

// Configure multer storage settings and file size limit
const storage = multer.diskStorage({
  destination: folderPath,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const profileFile = uniqueSuffix + fileExtension;
    cb(null, profileFile);
  },
});

// Set file size limit (e.g., 5MB per file)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Optional: You can filter file types here if needed
    cb(null, true);
  }
});


const postFullpageAd = (req, res) => {
    
    if (req.cookies._t && req.cookies._usid) {
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'One or more files exceed the maximum allowed size of 5MB' });
      }
      console.log(err)
      return res.status(500).json({ error: 'File upload failed' });
    }

    try {

      const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;

      // Upload files to Cloudinary and save them to your database or process them
      const uploadToCloudinary = async (file) => {
        return new Promise((resolve, reject) => {
            let uploadOptions = {};
        
   
        
            cloudinary.uploader.upload(file.path, uploadOptions, (error, result) => {
              if (error) {
                // console.error('Upload to Cloudinary failed:', error, file);
                return res.status(500).json({ error: `Failed to upload ${file.originalname}. Invalid file format.` });
              }
            //   console.log('Uploaded to Cloudinary:', result.url);
        
              // Clean up local file
              fs.unlink(file.path, (unlinkErr) => {
                if (unlinkErr) {
                //   console.error('Error deleting local file:', unlinkErr);
                } else {
                //   console.log('Local file deleted successfully.');
                }
              });
        
              resolve(result.url);
            });
          });
      };


  
      const uploadedThumbnailUrl = thumbnail ? await uploadToCloudinary(thumbnail) : null;

      // You can now save the file URLs or other data to your database
 
    //   Send Data to backedn for processing 
    const { advert_type, advert_duration} = req.body;

const data = {
     
          uid:req.cookies._usid,

          advert_type,
          advert_duration,
          thumbnail: thumbnail ? uploadedThumbnailUrl : null,
        }; 
        console.log(advert_duration)

        const response = await fetch(`${process.env.ENDPOINT}/y/postFullpageAd`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success) {
          const itemId = responseData.item_id

         const url = await ChargeForItem(req,res, itemId)

         if(url){
           return res.json({ success: responseData.success, url:url });
         }else{
          console.log(url)
         }
         
          
        } else {
          return res.json({ error: responseData.error });
        }
    //   res.status(200).send({ success: 'Files  uploaded successfully' });   
    } catch (error) { 
        console.log(error)
      return res.json({error:error.message});
    //   res.status(500).send('An error occurred during file upload');
    }
  });   
} else {
    return res.json({ error: "User not Logged In" });
  }
};

module.exports = postFullpageAd;