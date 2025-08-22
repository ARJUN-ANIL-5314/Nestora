const jwt = require('jsonwebtoken');
const Admin = require('../Model/admin_schema')
const bcrypt = require('bcrypt')




exports.loginUser = async (req, res) => {
    try {
        console.log(" Received Login Request: ", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            console.log("Missing Email or Password");
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user
        const userDB = await Admin.findOne({ email: email.trim() }); 
        console.log("🔹 User from DB:", userDB);

        if (!userDB) {
            console.log(" Admin not found in database");
            return res.status(401).json({ error: "Invalid user" });
        }

        // Check password
        console.log(" Entered Password:", password);
        console.log(" Stored Hashed Password:", userDB.password);

        const isMatch = await bcrypt.compare(password, userDB.password);
        console.log(" Password Match:", isMatch);

        if (!isMatch) {
            console.log("Incorrect Password");
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: userDB._id, email: userDB.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set cookie
        // res.send("Token", token, {
        //     httpOnly: true,
        //     secure: false, 
        //     sameSite: "lax",
        // });

        console.log("Login successful for:", userDB.email);
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error(" Login Error:", error);
        res.status(500).json({ error: "Server error: login failed" });
    }
};
