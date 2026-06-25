import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import './pages/styles.css';

// Import all pages
import Home from './pages/Home';
import About from './pages/About';
import DonorsPartners from './pages/DonorsPartners';
import GetInvolved from './pages/GetInvolved';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Children from './pages/Children';
import NotFound from './pages/NotFound';
import DonationSuccess from './pages/DonationSuccess';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';



// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/donors-partners" element={<DonorsPartners />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/children" element={<Children />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/donation-success" element={<DonationSuccess />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;