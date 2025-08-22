const CategoryModel = require('../Model/mySchema');
const Reviews = require('../Model/Testimonials')



// Category api

exports.Category = async (req, res) => {
    try {
      const data = await CategoryModel.find();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error :fetching categories", error); 
      res.status(500).json({ message: "Server error: failed to fetch categories", error: error.message });
    }
  };
  
//  Reviews api 

exports.Review = async (req ,res) => {
  try{
    const data = await Reviews.find()
    res.status(200).json(data)
  }catch(error){
    console.error("Error :fetching Reviews",error);
    res.status(500).json({message:"Server error: failed to fetch Reviews", error: error.message})
  }
}

