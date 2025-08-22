import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LanguageIcon from '@mui/icons-material/Language';



export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-6 items-center h-auto ">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Side - Follow Us */}
        <div className="flex flex-col md:flex-row  md:items-center gap-2 md:gap-4">
          <span className="text-xl font-semibold">Follow Us</span>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-gray-400 text-blue-500 text-sm"><FacebookIcon/></a>
            <a href="#" className="hover:text-gray-400  text-blue-500 text-sm" ><InstagramIcon/></a>
            <a href="#" className="hover:text-gray-400  text-blue-500 text-sm"><XIcon/></a>
            <a href="#" className="hover:text-gray-400  text-blue-500 text-sm"> <LanguageIcon/></a>
          </div>
        </div>

        {/* Right Side - Legal Links */}
        <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-xs sm:text-sm mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-300">Cookies Policy</a>
        </div>
      </div>

      {/* Second Line - Copyright */}
      <div className="text-center text-gray-400 text-xs md:text-sm mt-4">
        &copy; {new Date().getFullYear()} Nextora. All rights reserved.
      </div>
    </footer>
  );
}
