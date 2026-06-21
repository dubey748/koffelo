import Nav from "./components/nav";
import Hero from "./components/hero";
import MarqueeBar from "./components/marquee-bar";
import HowItWorks from "./components/how-it-works";
import FeaturedSections from "./components/featured-sections";
import LifestyleGrid from "./components/lifestyle-grid";
import SocialProof from "./components/social-proof";
import Testimonials from "./components/testimonials";
import FAQ from "./components/faq";
import Newsletter from "./components/newsletter";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-k-cream">
      <Nav />
      <Hero />
      <MarqueeBar />
      <HowItWorks />
      <FeaturedSections />
      <LifestyleGrid />
      <SocialProof />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
