import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsBar from "../components/StatsBar";
import DestinationsBento from "../components/DestinationsBento";
import ServicesSection from "../components/ServicesSection";
import ProcessTimeline from "../components/ProcessTimeline";
import TestimonialsSection from "../components/TestimonialsSection";
import PartnersBar from "../components/PartnersBar";
import FAQSection from "../components/FAQSection";
import ConsultationForm from "../components/ConsultationForm";
import Footer from "../components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import ConsultancyProfileSection from "@/components/ConsultancyProfileSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ConsultancyProfileSection variant="editorial" />
      <DestinationsBento />
      <ServicesSection />
      <ProcessTimeline />
      <TestimonialsSection />
      <PartnersBar />
      <FAQSection />
      <ConsultationForm />
      <Footer />
      <FloatingContactButton animation="fan" />
    </div>
  );
}
