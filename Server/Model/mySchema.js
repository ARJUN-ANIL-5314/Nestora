const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  }
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
