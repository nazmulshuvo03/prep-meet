import { BrowseNetwork } from "./BrowseNetwork";
import { Faqs } from "./Faqs";
import { Header } from "./Header";
import { InsideTrack } from "./InsideTrack";
import { Quote } from "./Quote";
import { StepsOverview } from "./StepsOverview";
import { Testimonials } from "./Testimonials";

export const LandingPage = () => {
  return (
    <div>
      <Header />
      <InsideTrack />
      <BrowseNetwork />
      <StepsOverview />
      <Quote />
      <Testimonials />
      <Faqs />
    </div>
  );
};
