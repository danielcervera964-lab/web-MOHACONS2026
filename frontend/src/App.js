import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import SimpleContactForm from "./components/SimpleContactForm";
import Footer from "./components/Footer";
import PhoneRegisterModal from "./components/PhoneRegisterModal";
import AdminPage from "./pages/AdminPage";
import { Toaster } from "./components/ui/sonner";

// Home Page Component
const HomePage = ({ onRequestQuote, onOpenPhoneRegister }) => {
  return (
    <>
      <Navbar />
      <Hero onRequestQuote={onRequestQuote} onOpenPhoneRegister={onOpenPhoneRegister} />
      <Services />
      <Portfolio />
      <About />
      <Testimonials />
      <SimpleContactForm />
      <Footer />
    </>
  );
};

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
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
          <HomePage 
            onRequestQuote={scrollToContact}
            onOpenPhoneRegister={() => setIsPhoneModalOpen(true)}
          />
            } 
          />
          
          {/* Admin Route */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
      
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
