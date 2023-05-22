import React, { useState } from "react";
const numberFormat = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
const afterDiscount = (value, discount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value - value * (discount / 100));

const ModalConfirmation = (props) => {
  const { itemsTransaction, addTransaction, setConfirm } = props;

  const handleCloseModal = () => {
    //setChoice(false);
    console.log("Close");
    setConfirm(false);
  };
  const clickeConfirm = () => {
    console.log("TEST click");
    setConfirm(true);
  };
  return (
    <>
      <div
        id="modal_overlay"
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm "
      >
        <div className="flex h-screen w-full justify-center  items-center">
          <div className="flex flex-col w-4/6 max-h-[960px]  ml-1 mr-1 text-center rounded-tl-2xl rounded-br-2xl bg-white overflow-hidden">
            <header className="py-5 bg-hollandtints-800 text-center ">
              <h3 className="text-white text-4xl font-serif ">Confirmation</h3>
            </header>
            <div className="flex-1 no-scrollbar overflow-y-auto">TEST</div>
            <div className="flex bg-hollandtints-800">
              <hr className="w-full border-y-2"></hr>
            </div>
            <footer className="bg-white  text-center text-white">
              <div className="flex w-full justify-between">
                <button
                  className="w-full ml-4 mr-4 mt-2 mb-4 bg-slate-100 border-2 border-slate-400 text-black transition duration-500 rounded-2xl hover:opacity-80 hover:shadow-lg"
                  onClick={() => handleCloseModal()}
                >
                  <span className="flex justify-center p-2">
                    <h3 className="text-2xl font-medium items-center ">
                      Tidak
                    </h3>
                  </span>
                </button>
                <button className="w-full ml-4 mr-4 mt-2 mb-4 bg-hollandtints-800 text-white transition duration-500 rounded-2xl hover:opacity-80 hover:shadow-lg">
                  <span className="flex justify-center p-2">
                    <h3 className="text-2xl font-medium items-center">
                      Iya . Kosongkan Keranjang
                    </h3>
                  </span>
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConfirmation;
