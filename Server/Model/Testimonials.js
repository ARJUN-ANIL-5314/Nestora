
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

  author: {
    type: String,
  },
  image: {
    type: String,
  },
  text:{
    type:String
  },
  rating:{
   type:Number,
  }
});

const Reviews = mongoose.model('reviews', ReviewSchema);

module.exports = Reviews;