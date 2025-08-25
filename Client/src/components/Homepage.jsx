import Novbar from './Novbar.jsx';
import Banner from './Banner.jsx';
import Service from './Service.jsx';
import About from './About.jsx';
import Category from './Category.jsx';
import Testimonials  from './Testimonials.jsx';
import Footer from './Footer.jsx';

export default function HomePage() {
  return (
    <div>
      <Novbar />
      <Banner />
      <Service />
      <Category />
      <About />
      <Testimonials/>
      <Footer />
    </div>
  );
}
