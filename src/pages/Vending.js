import React from "react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import RunningText from "../components/RunningText";
import ContentFooter from "../components/ContentFooter";

const Vending = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <div className="portrait:hidden">Landscape</div>
      <div className="landscape:hidden">
        <TopHeader />
        <Header />
        <RunningText />
        <Content />
        <ContentFooter />
        <Footer />
      </div>
    </div>
  );
};

export default Vending;
