import Nav from "./components/nav";
import Hero from "./components/hero";
import Chapters from "./components/how-it-works";
import FeaturedSections from "./components/featured-sections";
import Manifesto from "./components/lifestyle-grid";
import NumbersBar from "./components/social-proof";
import Testimonials from "./components/testimonials";
import FAQ from "./components/faq";
import Newsletter from "./components/newsletter";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-k-black">
      <Nav />
      <Hero />
      <Chapters />
      <FeaturedSections />
      <NumbersBar />
      <Manifesto />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
