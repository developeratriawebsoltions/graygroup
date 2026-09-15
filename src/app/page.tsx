import { BuyerSection } from "@/components/sections/buyer-section";
import { CTASection } from "@/components/sections/cta-section";
import { FeaturedProperties } from "@/components/sections/featured-properties";
import { Hero } from "@/components/sections/hero";
import { TourSection } from "@/components/sections/tour-section";
import { ArizonaMapSection } from "@/components/sections/arizona-map-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { InternationalSection } from "@/components/sections/international-section";
import { NeighborhoodExplorer } from "@/components/sections/neighborhood-explorer";
import { PropertySearch } from "@/components/sections/property-search";
import { SellerSection } from "@/components/sections/seller-section";
import { TeamSection } from "@/components/sections/team-section";
import { TestimonialSlider } from "@/components/sections/testimonial-slider";
import { OfficesSection } from "@/components/sections/offices-section";
import { WhyGrayGroup } from "@/components/sections/why-gray-group";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ArizonaMapSection />
      <FeaturedProperties />
      
      <TourSection />
      {/* <PropertySearch /> */}
      <WhyGrayGroup />
      <NeighborhoodExplorer />
      <SellerSection />
      <BuyerSection />
      <TeamSection />
      <OfficesSection />
      <InternationalSection />
      <TestimonialSlider />
      <InsightsSection />
      <CTASection />
    </>
  );
}
