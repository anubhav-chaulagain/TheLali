const Property = require('../models/Property');
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "your-cloud-name",
  api_key: "your-api-key",
  api_secret: "your-api-secret",
});

async function insertPropertyDataToDatabase(req, res) {
    console.log("Received files: ",req.files);
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send("No images uploaded");
        }

        // Upload images to Cloudinary
        const imageUrls = await Promise.all(
            req.files.map(file => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { resource_type: "image", folder: "properties" }, 
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result.secure_url);
                        }
                    );
                    uploadStream.end(file.buffer);
                });
            })
        );

        // Create property object with Cloudinary image URLs
        const property = new Property(
            req.body.title,
            req.body.category,
            req.body.purpose,
            req.body.type,
            req.body.address,
            req.body.city,
            req.body.cityArea,
            req.body.municipality,
            req.body.ward,
            req.body.videoUrl,
            req.body.bedroom,
            req.body.kitchen,
            req.body.bathroom,
            req.body.livingRoom,
            req.body.parking,
            req.body.totalFloors,
            req.body.builtYear,
            req.body.furnishing,
            req.body.plotNumber,
            req.body.description,
            req.body.price,
            req.body.priceInWords,
            req.body.negoOptions,
            req.body.area,
            req.body.buildarea,
            req.body.roadtype,
            req.body.facedirection,
            req.body.roadaccess,
            imageUrls // Cloudinary image URLs
        );

        // Save property to Firebase
        const outcome = await property.addProperty();
        if (!outcome.success) {
            return res.status(500).send(outcome.message);
        }

        res.redirect('/main');
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).send("Image upload failed");
    }
}

module.exports = { insertPropertyDataToDatabase };
