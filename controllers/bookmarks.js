const dotenv = require("dotenv").config();
const fs = require('fs');
const axios = require('axios');
const path = require("path");

const bookmarks = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Ensure page is an integer
    const items_per_page = 20; // Number of items per page
    const OFFSET = (page - 1) * items_per_page;

    const data = {
        page: req.query.page || 1,
        user_id: req.user.id
    };

    try {
        const response = await fetch(`${process.env.ENDPOINT}/y/myBookmarks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.success) {
            const AllListings = responseData.listings;
            const totalPagesCount = responseData.totalCount;
            const withPictures = [];
            const withoutPictures = [];

            const parentDirectory = path.resolve(__dirname, '..');
            const DirectoryForImageUploads = path.join(parentDirectory, 'public', 'uploads', 'cover_images', 'listings');

            const checkImageExists = async (imageFile) => {
                const localImagePath = path.join(DirectoryForImageUploads, imageFile);

                if (fs.existsSync(localImagePath)) {
                    return true;
                }

                try {
                    const response = await axios.head(imageFile);
                    if (response.status === 200) {
                        return true;
                    }
                } catch (error) {
                    return false;
                }

                return false;
            };

            // Process listings in batches until the `withPictures` array is filled
            let currentOffset = 0;
            
            while (withPictures.length < items_per_page && currentOffset < AllListings.length) {
                const batch = AllListings.slice(currentOffset, currentOffset + items_per_page);

                for (let i = 0; i < batch.length; i++) {
                    const imageFile = batch[i].image1;

                    if (await checkImageExists(imageFile)) {
                        withPictures.push(batch[i]);
                    } else {
                        withoutPictures.push(batch[i]);
                    }

                    if (withPictures.length === items_per_page) {
                        break;
                    }
                }

                currentOffset += items_per_page;
            }

            const combinedArray = [...withPictures, ...withoutPictures];

            // Pagination logic: Take the appropriate slice of the combined array
            const paginatedListings = combinedArray.slice(0, items_per_page);

            return res.json({
                success: responseData.success,
                listings: paginatedListings,
                currentPage: page,
                totalPages: Math.ceil(totalPagesCount / 1),
            });
        } else {
            return res.json({ error: responseData.error });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }
};

module.exports = bookmarks;
