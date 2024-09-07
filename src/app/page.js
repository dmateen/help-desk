import { About } from "@/components/custom/landing-page/about/about";
import { Cta } from "@/components/custom/landing-page/cta/cta";
import { FAQ } from "@/components/custom/landing-page/faq/faq";
import { Features } from "@/components/custom/landing-page/features/features";
import { Footer } from "@/components/custom/landing-page/footer/footer";
import { Hero } from "@/components/custom/landing-page/hero/hero";
import { HowItWorks } from "@/components/custom/landing-page/how-it-works/how-it-works";
import { Navbar } from "@/components/custom/landing-page/navbar";
import { Newsletter } from "@/components/custom/landing-page/newsletter/newsletter";
import { Pricing } from "@/components/custom/landing-page/pricing/pricing";
import { ScrollToTop } from "@/components/custom/landing-page/scroll-to-top/scroll-to-top";
import { Services } from "@/components/custom/landing-page/services/services";
import { Sponsors } from "@/components/custom/landing-page/sponsors/sponsors";
import { Team } from "@/components/custom/landing-page/team/team";
import { Testimonials } from "@/components/custom/landing-page/testimonial/testimonial";
import { auth } from "@/lib/authentication/auth";
import { NetworkService } from "@/network";

export default async function Home() {
  const session = await auth();
  const { data } = await NetworkService.get("/todos/1");

  https: return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}
