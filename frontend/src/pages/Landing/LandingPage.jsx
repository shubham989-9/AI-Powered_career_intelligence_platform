import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import TrustedCompanies from "../../components/landing/TrustedCompanies";
import FeaturesSection from "../../components/landing/FeaturesSection";
import ResumeBuilderShowcase from "../../components/landing/ResumeBuilderShowcase";
import HowItWorks from "../../components/landing/HowItWorks";
import StatsSection from "../../components/landing/StatsSection";
import TestimonialSection from "../../components/landing/TestimonialSection";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/layout/Footer";

function LandingPage() {
  return (
    <div className="bg-slate-950 text-white">
      <Navbar />

      <HeroSection />

      <TrustedCompanies />

      <FeaturesSection />

      <ResumeBuilderShowcase />

      <HowItWorks />

      <StatsSection />

      <TestimonialSection />

      <CTASection />

      <Footer />
    </div>
  );
}

export default LandingPage;