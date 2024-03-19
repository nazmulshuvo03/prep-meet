import { BrowseNetwork } from "./BrowseNetwork";
import { Companies } from "./Companies";
import { Faqs } from "./Faqs";
import { Header } from "./Header";
import { InsideTrack } from "./InsideTrack";
import { Join } from "./Join";
import { Quote } from "./Quote";
import { StepsOverview } from "./StepsOverview";
import { Testimonials } from "./Testimonials";

export const LandingPage = () => {
  return (
    <div className="h-full">
      <Header />
      <InsideTrack />
      <BrowseNetwork />
      <StepsOverview />
      <Quote />
      <Testimonials />
      <Companies />
      <Faqs />
      <Join />
    </div>
  );
};
