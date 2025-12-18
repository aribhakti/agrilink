import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import { Loader2 } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const FertilizerRegistration = lazy(() => import('./pages/FertilizerRegistration'));
const PesticideRegistration = lazy(() => import('./pages/PesticideRegistration'));
const IntellectualProperty = lazy(() => import('./pages/IntellectualProperty'));
const Clients = lazy(() => import('./pages/Clients'));
const News = lazy(() => import('./pages/News'));
const StatusPortal = lazy(() => import('./pages/StatusPortal'));

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
    <p className="text-slate-500 font-medium animate-pulse">Loading Resources...</p>
  </div>
);

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services/fertilizer" element={<FertilizerRegistration />} />
                <Route path="/services/pesticide" element={<PesticideRegistration />} />
                <Route path="/services/ip" element={<IntellectualProperty />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/news" element={<News />} />
                <Route path="/status" element={<StatusPortal />} />
                <Route path="/services" element={<Navigate to="/services/fertilizer" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <WhatsAppFAB />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;