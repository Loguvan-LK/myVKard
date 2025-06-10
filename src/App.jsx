import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import DashboardLayout from "./layouts/DashboardLayout";
import HeroSection from "./components/HeroSection";
import WhyMyVkard from "./components/WhyMyVkard";
import ProductSnapshot from "./components/ProductSnapshot";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import ContactUs from "./components/pages/ContactUs";
import NfcBusinessCards from "./components/pages/NfcBusinessCards";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
// import CartPage from "./components/pages/CartPage";
import Dashboard from "./components/pages/Dashboard";
import ThankYou from "./components/pages/ThankYou";

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
    <div className="w-full overflow-x-hidden font-sans">
      <Toaster position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/nfc-business-cards" element={<NfcBusinessCards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/success" element={<ThankYou />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;