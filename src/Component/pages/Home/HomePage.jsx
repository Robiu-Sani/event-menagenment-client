import CommunityImpact from "./CommunityImpact";
import EventGrid from "./EventGrid";
import FAQSection from "./FAQSection";
import HomeBanner from "./HomeBanner";
import Testimonials from "./Testimonials";

export default function HomePage() {
  return (
    <div>
      <HomeBanner />
      <EventGrid />
      <CommunityImpact />
      <FAQSection />
      <Testimonials />
    </div>
  );
}
