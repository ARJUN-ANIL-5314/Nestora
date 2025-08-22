import Novbar from './Novbar';
import Banner from './Banner';
import Service from './Service';
import About from './About';
import Category from './Category';
import Testimonials  from './Testimonials';
import Footer from './Footer';

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
