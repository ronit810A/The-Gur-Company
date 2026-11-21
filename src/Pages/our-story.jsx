import StoryBanner from "../Component/OurStoryPageData/StoryBanner";
import StoryBeginning from "../Component/OurStoryPageData/StoryBeginning";
import StoryValues from "../Component/OurStoryPageData/StoryValues";
import StoryJourney from "../Component/OurStoryPageData/StoryJourney";

import "../Css/our-story.css";

function OurStory() {
  return (
    <main className="our-story-page">
      <StoryBanner />
      <StoryBeginning />
      <StoryValues />
      <StoryJourney />
    </main>
  );
}

export default OurStory;
