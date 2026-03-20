import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PhoneRegisterModal from "./components/PhoneRegisterModal";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Hero onRequestQuote={scrollToContact} />
      <Services />
      <Portfolio />
      <About />
      <Testimonials />
      <Contact onOpenPhoneRegister={() => setIsPhoneModalOpen(true)} />
      <Footer />
      
      {/* Phone Register Modal */}
      <PhoneRegisterModal 
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default App;
