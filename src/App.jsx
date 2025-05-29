import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Landing page sections
import HeroSection from './components/HeroSection';
import WhyMyVkard from './components/WhyMyVkard';
import ProductSnapshot from './components/ProductSnapshot';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';

// Pages
import ContactUs from './components/pages/ContactUs';
import NfcBusinessCards from './components/pages/NfcBusinessCards';
import Contact from './components/Contact';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductSnapshot />
      <WhyMyVkard />
      <HowItWorks />
      <CTASection />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/nfc-business-cards" element={<NfcBusinessCards />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;