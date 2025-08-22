
const transporter = require('../mailer.config')

require("dotenv").config()


//  Contact api [node-mailer]

exports.contact = async (req , res) => {
  
    const{name,mobile,message} = req.body
    
    const mailDetailes ={
      from:process.env.EMAIL_USER,
      to:process.env.ADMIN_EMAIL,
      subject:
      `New Inquiry from ${name}`,
      html:
      `<h3>New Inquiry Received </h3>
       <p>
       <Strong> Name : </Strong>
       ${name}
       </p>
       
       <p>
       <Strong> Mobile : </Strong>
       ${mobile}
       </p>
       
        <p>
       <Strong> Message : </Strong>
       ${message}
       </p>`
    };

    try{
        await transporter.sendMail(mailDetailes);

        res.status(200).json({message:"contact info send successfully"})

    }catch(error){
        res.status(500).json({message:"internal server error :send contact-info",error})
    }
}
