import React from "react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import BottomFooter from "../components/BottomFooter";
import ContentMain from "../components/ContentMain";

const Vending = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="portrait:hidden">Landscape</div>
      <div className="landscape:hidden">
        <TopHeader />
        <Header />
        <ContentMain />
      </div>
    </div>
  );
};

export default Vending;
