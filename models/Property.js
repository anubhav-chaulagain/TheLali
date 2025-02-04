const { getDatabase, ref, set } = require("firebase/database");

// const { initializeApp } = require("firebase/app");
// // const { getAnalytics } = require("firebase/analytics");
// const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
// const { getDatabase, ref, set } = require("firebase/database");
// const admin = require("firebase-admin");
// const serviceAccount = require("../config/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://thelali-5163a-default-rtdb.firebaseio.com",
// });

// const firebaseConfig = {
//   apiKey: "AIzaSyClUIw9MuThkqyonfJlKXWghrsgb8iz7kY",
//   authDomain: "thelali-5163a.firebaseapp.com",
//   databaseURL: "https://thelali-5163a-default-rtdb.firebaseio.com",
//   projectId: "thelali-5163a",
//   storageBucket: "thelali-5163a.firebasestorage.app",
//   messagingSenderId: "593215870274",
//   appId: "1:593215870274:web:2e6864e3e6d6d4e5d8e4db",
//   measurementId: "G-H7HH01TPE9",
// };

// const firebase = initializeApp(firebaseConfig);
// const database = getDatabase(firebase);

class Property {
  constructor(
    title,
    category,
    purpose,
    type,
    address,
    city,
    cityArea,
    municipality,
    ward,
    videoUrl,
    bedroom,
    kitchen,
    bathroom,
    livingRoom,
    parking,
    totalFloors,
    builtYear,
    furnishing,
    plotNumber,
    description,
    price,
    priceInWords,
    negoOptions,
    area,
    buildarea,
    roadtype,
    facedirection,
    roadaccess
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
  }

  async addProperty() {
    try {
      const requiredFields = [
        'title', 'category', 'purpose', 'type', 'address', 'city', 'cityArea', 
        'municipality', 'ward', 'videoUrl', 'bedroom', 'kitchen', 'bathroom', 
        'livingRoom', 'parking', 'totalFloors', 'builtYear', 'furnishing', 
        'plotNumber', 'description', 'price', 'priceInWords', 'negoOptions', 
        'area', 'buildarea', 'roadtype', 'facedirection', 'roadaccess'
      ];

      for (const field of requiredFields) {
        if (this[field] === undefined) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      const db = getDatabase();
      await set(ref(db, "property"), {
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
        createdAt: new Date().toISOString(),
      });
      console.log("User data saved in Realtime Database successfully!");
    } catch (error) {
      console.log(
        "Error during property creation or saving data:",
        error.code,
        error.message
      );
    }
    return { success: true, message: "", errorFields: [] };
  }
}

module.exports = Property;
