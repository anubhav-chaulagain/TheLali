const { getDatabase, ref, push, set } = require("firebase/database");

class Property {
  constructor(
    title, category, purpose, type, address, city, cityArea, municipality, ward,
    videoUrl, bedroom, kitchen, bathroom, livingRoom, parking, totalFloors,
    builtYear, furnishing, plotNumber, description, price, priceInWords,
    negoOptions, area, buildarea, roadtype, facedirection, roadaccess, imagesUploader
  ) {
    this.title = title;
    this.category = category;
    this.purpose = purpose;
    this.type = type;
    this.address = address;
    this.city = city;
    this.cityArea = cityArea;
    this.municipality = municipality;
    this.ward = ward;
    this.videoUrl = videoUrl;
    this.bedroom = bedroom;
    this.kitchen = kitchen;
    this.bathroom = bathroom;
    this.livingRoom = livingRoom;
    this.parking = parking;
    this.totalFloors = totalFloors;
    this.builtYear = builtYear;
    this.furnishing = furnishing;
    this.plotNumber = plotNumber;
    this.description = description;
    this.price = price;
    this.priceInWords = priceInWords;
    this.negoOptions = negoOptions;
    this.area = area;
    this.buildarea = buildarea;
    this.roadtype = roadtype;
    this.facedirection = facedirection;
    this.roadaccess = roadaccess;
    this.imagesUploader = imagesUploader; // Array of image URLs
  }

  async addProperty() {
    try {
      const db = getDatabase();
      const newPropertyRef = push(ref(db, "properties"));
      await set(newPropertyRef, {
        title: this.title,
        category: this.category,
        purpose: this.purpose,
        type: this.type,
        address: this.address,
        city: this.city,
        cityArea: this.cityArea,
        municipality: this.municipality,
        ward: this.ward,
        videoUrl: this.videoUrl,
        bedroom: this.bedroom,
        kitchen: this.kitchen,
        bathroom: this.bathroom,
        livingRoom: this.livingRoom,
        parking: this.parking,
        totalFloors: this.totalFloors,
        builtYear: this.builtYear,
        furnishing: this.furnishing,
        plotNumber: this.plotNumber,
        description: this.description,
        price: this.price,
        priceInWords: this.priceInWords,
        negoOptions: this.negoOptions,
        area: this.area,
        buildarea: this.buildarea,
        roadtype: this.roadtype,
        facedirection: this.facedirection,
        roadaccess: this.roadaccess,
        images: this.imagesUploader, // Store images in Firebase
        createdAt: new Date().toISOString(),
      });

      console.log("Property data saved in Realtime Database successfully!");
      return { success: true };
    } catch (error) {
      console.log("Error saving property:", error);
      return { success: false, message: error.message };
    }
  }
}

module.exports = Property;
