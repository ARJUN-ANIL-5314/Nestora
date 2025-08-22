const jwt = require("jsonwebtoken");
const User = require("../Model/admin_schema");


const userAuth = async (req, res, next) => {
console.log("hey");

  try {
 const authHeader = req.headers.authorization;

 console.log(authHeader);
 const token = authHeader.split(" ")[1];

 console.log("token  :",token);

    // validate the token
    const isAuthorized = await jwt.verify(token, process.env.JWT_SECRET)
    
    const { id } = isAuthorized
    
    
    if (!isAuthorized) {
      throw new Error("UnAthorized person")
    }

    // find the user
    const user = await User.findById(id)
    console.log('user detailes :',user);
    

    req.user = user


    next()

  } catch (err) {
    res.status(404).send("invalid user" + err)
  }

}

module.exports = userAuth 