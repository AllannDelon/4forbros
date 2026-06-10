import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SellCar from "@/components/SellCar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D1117] overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <About />
      <WhyChoose />
      <Testimonials />
      <FAQ />
      <SellCar />
      <Footer />
    </main>
  );
}
