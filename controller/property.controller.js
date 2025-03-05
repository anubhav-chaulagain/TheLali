const Property = require('../models/Property');
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "your-cloud-name",
  api_key: "your-api-key",
  api_secret: "your-api-secret",
});

async function insertPropertyDataToDatabase(req, res) {
    // console.log("Received files: ",req.files);
    const ownerEmail = req.userData.email;
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
            ownerEmail,
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

const { getDatabase, ref, get } = require("firebase/database");

async function getProperties(req, res) {
  try {
    const db = getDatabase();
    const propertiesRef = ref(db, "properties"); // Assuming "properties" is the node in your database
    const snapshot = await get(propertiesRef);

    if (!snapshot.exists()) {
      return res.render("properties", { properties: [] }); // Pass an empty array if no data exists
    }

    const properties = snapshot.val();
    const propertyList = Object.keys(properties).map((key) => ({
      id: key, // Firebase keys as unique IDs
      ...properties[key],
    }));

    console.log("Feteched p: ");
    
    console.log(propertyList);
    
    res.render("mainPage", { properties: propertyList }); // Send data to the EJS template
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Error fetching properties");
  }
}

async function showPropertyDetails(req, res) {
  try {
    const db = getDatabase();
    const propertyId = req.params.id; // Get ID from URL
    const propertyRef = ref(db, `properties/${propertyId}`); // Reference to the specific property
    const snapshot = await get(propertyRef);

    if (!snapshot.exists()) {
      return res.status(404).send("Property not found");
    }

    const property = snapshot.val();
    console.log("Fetched Property:", property);

    res.render("propertyDetails", { property }); // Render the EJS template with the property data
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).send("Error fetching property");
  }
}

async function getFilteredProperties(req, res) {
  try {
    const db = getDatabase();
    const propertiesRef = ref(db, "properties");
    const snapshot = await get(propertiesRef);

    if (!snapshot.exists()) {
      return res.render("mainPage", { properties: [] });
    }

    const properties = snapshot.val();
    let propertyList = Object.keys(properties).map((key) => ({
      id: key,
      ...properties[key],
    }));

    // Get filter parameters from the query string
    const { filterType, filterLocation } = req.query;

    // Apply filters if they are provided
    if (filterType) {
      propertyList = propertyList.filter((property) => property.category === filterType.toLowerCase());
    }
    if (filterLocation) {
      propertyList = propertyList.filter((property) => property.city === filterLocation);
    }

    console.log("Filtered Properties:", propertyList);

    res.render("mainPage", { properties: propertyList });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Error fetching properties");
  }
}

module.exports = { insertPropertyDataToDatabase: insertPropertyDataToDatabase,
    getProperties: getProperties,
    showPropertyDetails: showPropertyDetails,
    getFilteredProperties: getFilteredProperties
 };
