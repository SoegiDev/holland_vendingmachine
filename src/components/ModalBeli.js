import React from "react";
import PaymentGateway from "../assets/img/payment-gateway.png";
import qris__template from "../assets/img/template-qris.png";

const ModalBeli = (props) => {
  const {
    itemsTransaction,
    addTransaction,
    setToOpenConfirmation,
    setToOpenBeli,
    setToOpenCart,
  } = props;

  const handleModalBeli = ({ deleted, status }) => {
    //setChoice(false);
    console.log("Close");
    setToOpenBeli(status);
  };
  return (
    <>
      <div
        id="modal_overlay"
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm "
      >
        <div className="flex h-screen w-full justify-center  items-center translate-y-1/4">
          <div className="flex flex-col w-4/6 max-h-[960px]  ml-1 mr-1 text-center rounded-3xl bg-white overflow-hidden">
            <header className="py-5 bg-hollandtints-800 text-center ">
              <h3 className="text-white text-4xl font-serif m-2">PEMBAYARAN</h3>
            </header>
            <div className="flex w-full justify-center">
              <img
                src={qris__template}
                alt="paymentGateWay"
                className="w-[90%] px-32 mb-6 items-center"
              />
            </div>
            <div className="flex h-max[192px] w-full">
              <div className="flex w-1/2 h-64 justify-center m-2">
                <span className="flex w-32 items-center">
                  <img
                    src={PaymentGateway}
                    alt="Landing Page"
                    className="h-64  w-64 content-center"
                  />
                </span>
              </div>
              <div className="flex w-1/2  mt-4 mr-20 justify-end">
                <div className="flex flex-col">
                  <div className="flex ml-2 mb-2 ">
                    <span className="flex w-44 items-center">
                      <img
                        src={PaymentGateway}
                        alt="Landing Page"
                        className="h-44  w-44 content-center"
                      />
                    </span>
                  </div>
                  <button
                    className="w-full ml-4 mr-4 mt-2 mb-4 bg-slate-100 border-2 border-slate-400 text-black transition duration-500 rounded-2xl hover:opacity-80 hover:shadow-lg"
                    onClick={() =>
                      handleModalBeli({ status: false, deleted: false })
                    }
                  >
                    <span className="flex justify-center p-2">
                      <h3 className="text-2xl font-medium items-center opacity-60">
                        Tutup
                      </h3>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <footer className="bg-white  text-center text-white bottom-0">
              <div className="flex w-full justify-center">
                <img
                  src={PaymentGateway}
                  alt="paymentGateWay"
                  className="w-[90%] px-32 pb-8 pt-10"
                />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBeli;
