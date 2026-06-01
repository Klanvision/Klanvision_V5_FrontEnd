import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import StrategicServices from '../components/StrategicServices';
import ServicesSection from '../components/ServicesSection';
import WhyPartner from '../components/WhyPartner';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <main>
        <Hero />
        <StrategicServices />
        <ServicesSection />
        <WhyPartner />
        <PortfolioSection />
        <TestimonialsSection />
        <BlogSection />
        <AboutSection />
        <ContactSection />
      </main>
    </motion.div>
  );
}
