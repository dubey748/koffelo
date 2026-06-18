import Nav from "./components/nav";
import Hero from "./components/hero";
import FeaturedSections from "./components/featured-sections";
import BestSelling from "./components/best-selling";
import Testimonials from "./components/testimonials";
import Newsletter from "./components/newsletter";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <FeaturedSections />
      <BestSelling />
      <Testimonials />

      <Newsletter />
      <Footer />
    </main>
  );
}
