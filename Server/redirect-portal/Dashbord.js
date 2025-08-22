const Admin = require('../Model/admin_schema');
// const Vendor = require('../Model/vendor_schema');  
// const User = require('../Model/user_schema');      

exports.dashbord = async (req, res) => { 
    try {
        //  Ensure `req.user` exists
        if (!req.user || !req.user.id || !req.user.role) {
            return res.status(400).json({ message: 'Invalid user data' });
        }

        let user;

        if (req.user.role === 'admin') {
            user = await Admin.findById(req.user.id).select('-password');
        } 
        // else if (req.user.role === 'vendor') {
        //     user = await Vendor.findById(req.user.id).select('-password');
        // } else {
        //     user = await User.findById(req.user.id).select('-password');
        // }

        //  Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); // send flat user object

    } catch (error) {
        console.error(' User Details Error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
