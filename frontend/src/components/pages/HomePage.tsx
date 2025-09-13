import { Hero } from "../Hero";
import { About } from "../About";
import { WhyChooseUs } from "../WhyChooseUs";
import { PopularCategories } from "../PopularCategories";
import { HowItWorks } from "../HowItWorks";
import { CallToAction } from "../CallToAction";

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <PopularCategories />
      <HowItWorks />
      <CallToAction />
    </>
  );
}