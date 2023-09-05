const mongoose = require('mongoose');
const formDataSchema = new mongoose.Schema({
    activeMenu: String,
    fromLocation: String,
    toLocation: String,
    date: String,
    time: String,
    phone: String,
    city: String,
    tourPackage: String,
    returnDate: String,
    days: Number,
    carType: String,
    directions: Object,
    distance: String,
    travelTime: String,
    currentdate: String,
  });
  
  const FormData = mongoose.model('FormData', formDataSchema);

  export default  FormData;