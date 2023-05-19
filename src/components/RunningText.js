import React from "react";
import Marquee from "react-fast-marquee";
const RunningText = () => {
  return (
    <div
      className="w-full mt-2 mb-2 bg-hollandtints-800"
      onClick={() => {
        console.log("Click Marquee", "Click Marquee");
      }}
    >
      <Marquee className="w-full">
        <h3 className="text-3xl font-medium m-3 text-white">
          Silahkan Pilih produk, Untuk Keluhan dan Pengajuan Refund Hubungi
          (021)4700212
        </h3>
      </Marquee>
    </div>
  );
};

export default RunningText;
