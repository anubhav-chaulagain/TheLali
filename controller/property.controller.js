const Property = require('../models/Property');

async function insertPropertyDataToDatabase(req, res) {
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
        req.body.roadaccess
    );

    const outcome = await property.addProperty();
    if(!outcome.success) {
        return console.log(outcome.message);
        
    }
    res.redirect('/main');
}

module.exports = {insertPropertyDataToDatabase:insertPropertyDataToDatabase}    