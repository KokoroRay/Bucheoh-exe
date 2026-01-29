import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts';
import { Hero, AboutSection, ProductGallery, BlogSection, LoadingSpinner, NotFound } from './components';
import { ContactPage, FAQPage, BlogPage } from './pages';
import { LanguageProvider } from './contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Import images from assets
import logoImage from './assets/logos/fpt-logo.png';
import heroImage from './assets/images/hero/hero-image.png';
import aboutImage1 from './assets/images/about/about-1.png';
import aboutImage2 from './assets/images/about/about-2.png';

// Homepage Component
const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll đến products section nếu được yêu cầu
    if (location.state?.scrollToProducts) {
      const timer = setTimeout(() => {
        const productsElement = document.getElementById('products');
        if (productsElement) {
          productsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      <Hero imageSrc={heroImage} />
      <AboutSection leftImageSrc={aboutImage1} bottomImageSrc={aboutImage2} />
      <ProductGallery />
      <BlogSection />
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds demo loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinner 
        overlay={true} 
        size="large" 
        text="Đang tải BUCHAOH..." 
      />
    );
  }

  return (
    <LanguageProvider>
      <Router>
        <MainLayout logoSrc={logoImage}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Sản phẩm BUCHAOH</h1><p>Coming soon...</p></div>} />
            <Route path="/about" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Về BUCHAOH</h1><p>Coming soon...</p></div>} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
