import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeatureList from "./FeatureList";
import FeaturesSection from "./FeaturesSection";
import CommonFooter from "../../Components/Common/CommonFooter";

const HomePage: React.FC = () => (
  <div>
    <Header />
    <HeroSection />
    <FeatureList />
    <FeaturesSection />
    <CommonFooter/>
  </div>
);

export default HomePage;
