import React from "react";
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

const Modal = (props) => {
  const {
    itemsTransaction,
    addTransaction,
    setToOpenConfirmation,
    setToOpenBeli,
    setToOpenCart,
  } = props;

  const handleModal = (status) => {
    //setChoice(false);
    console.log("Close");
    setToOpenCart(status);
  };
  const ClickMinus = () => {
    //setChoice(false);
    console.log("Mengurangi");
  };
  const ClickPlus = (Menu) => {
    //setChoice(false);
    console.log("Menambah");
    if (Menu.qty === 0) {
      console.log("Stock sudah nol");
    } else {
      addTransaction(Menu);
    }
  };
  const handleModalBeli = (status) => {
    setToOpenBeli(status);
    console.log("Click Beli");
  };
  const handleModalConfirm = (status) => {
    console.log("TEST click");
    setToOpenConfirmation(true);
  };
  return (
    <>
      <div
        id="modal_overlay"
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm "
      >
        <div className="flex h-screen w-full justify-center  items-center">
          <div className="flex flex-col w-4/6 max-h-[960px]  ml-1 mr-1 text-center rounded-2xl bg-white overflow-hidden">
            <header className="py-5 bg-hollandtints-800 text-center ">
              <h3 className="text-white text-4xl font-serif ">
                KERANJANG BELANJA
              </h3>
            </header>
            <div className="flex-1 no-scrollbar overflow-y-auto">
              <ul>
                {itemsTransaction.map((item, index) => (
                  <li key={index} className="mb-2">
                    <div className="flex h-max[192px] content-center">
                      <div className="flex w-40 h-44 justify-center m-2">
                        <span className="flex w-32 items-center">
                          <img
                            src={item.imageUrl}
                            alt="Landing Page"
                            className="h-32 w-full border content-center rounded-3xl shadow-lg"
                          />
                        </span>
                      </div>
                      <div className="flex max-h-52 w-56 ml-1 mr-1 mt-4 mb-4">
                        <div className="flex flex-col items-start ">
                          <p className="truncate text-3xl font-bold pl-2">
                            {item.title}
                          </p>
                          <p
                            className={`text-2xl font-sans mt-5 pl-2 ${
                              item.disc > 0 &&
                              "line-through text-hollandtints-900"
                            }`}
                          >
                            {numberFormat(item.price)}
                          </p>

                          <p className="text-3xl font-bold pl-2 text-hollandtints-900">
                            {afterDiscount(item.price, item.disc)}
                          </p>
                        </div>
                      </div>
                      <div className="grow h-max[192px] bg-hollandtints-100">
                        <div className="relative flex h-44 m-2">
                          <div className="flex flex-grow justify-end">
                            <div
                              className="flex items-end mb-4 mr-4"
                              onClick={() => ClickMinus()}
                            >
                              <svg
                                viewBox="0 -0.5 21 21"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#e4543a"
                                stroke="#e4543a"
                                className="h-10 max-h-[45px]"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <title>minus_circle [#e4543a]</title>
                                  <desc>Created with Sketch.</desc>{" "}
                                  <defs> </defs>
                                  <g
                                    id="Page-1"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                  >
                                    <g
                                      id="Dribbble-Light-Preview"
                                      transform="translate(-379.000000, -520.000000)"
                                      fill="#e4543a"
                                    >
                                      <g
                                        id="icons"
                                        transform="translate(56.000000, 160.000000)"
                                      >
                                        <path
                                          d="M329.3,371 L337.7,371 L337.7,369 L329.3,369 L329.3,371 Z M333.5,378 C328.8674,378 325.1,374.411 325.1,370 C325.1,365.588 328.8674,362 333.5,362 C338.13155,362 341.9,365.588 341.9,370 C341.9,374.411 338.13155,378 333.5,378 L333.5,378 Z M333.5,360 C327.70085,360 323,364.477 323,370 C323,375.523 327.70085,380 333.5,380 C339.2981,380 344,375.523 344,370 C344,364.477 339.2981,360 333.5,360 L333.5,360 Z"
                                          id="minus_circle-[#e4543a]"
                                        ></path>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                            <div className="flex items-end mb-4 mr-4">
                              <input
                                type="text"
                                value={item.qty}
                                disabled
                                className="mt-1 block w-20 px-3 py-2 text-lg text-slate-400 font-bold bg-white border-2 border-slate-200 rounded-md shadow-sm placeholder-slate-400
    "
                              />
                            </div>
                            <div className="flex items-end mb-4 mr-4">
                              <svg
                                viewBox="0 -0.5 21 21"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                className="h-10 max-h-[45px]"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <title>plus_circle [#e4543a]</title>
                                  <desc>Created with Sketch.</desc>{" "}
                                  <defs> </defs>
                                  <g
                                    id="Page-1"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                  >
                                    <g
                                      id="Dribbble-Light-Preview"
                                      transform="translate(-419.000000, -520.000000)"
                                      fill="#e4543a"
                                    >
                                      <g
                                        id="icons"
                                        transform="translate(56.000000, 160.000000)"
                                      >
                                        <path
                                          d="M374.55,369 L377.7,369 L377.7,371 L374.55,371 L374.55,374 L372.45,374 L372.45,371 L369.3,371 L369.3,369 L372.45,369 L372.45,366 L374.55,366 L374.55,369 Z M373.5,378 C368.86845,378 365.1,374.411 365.1,370 C365.1,365.589 368.86845,362 373.5,362 C378.13155,362 381.9,365.589 381.9,370 C381.9,374.411 378.13155,378 373.5,378 L373.5,378 Z M373.5,360 C367.70085,360 363,364.477 363,370 C363,375.523 367.70085,380 373.5,380 C379.29915,380 384,375.523 384,370 C384,364.477 379.29915,360 373.5,360 L373.5,360 Z"
                                          id="plus_circle-[#e4543a]"
                                        ></path>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex bg-hollandtints-800">
              <hr className="w-full border-y-2"></hr>
            </div>
            <footer className="bg-white  text-center text-white">
              <div className="flex w-full justify-between">
                <div className="flex justify-items-start m-4">
                  <div className="flex flex-col items-center mt-12">
                    <button className="w-full ml-4 mr-4 mt-2 mb-4 bg-hollandtints-800 text-white transition duration-500 rounded-2xl hover:opacity-80 hover:shadow-lg">
                      <span className="flex justify-center p-2">
                        <h3
                          className="text-2xl font-medium items-center"
                          onClick={() => handleModalConfirm(true)}
                        >
                          Kosongkan Keranjang
                        </h3>
                      </span>
                    </button>
                    <button
                      className="w-full ml-4 mr-4 mt-2 mb-4 bg-slate-100 border-2 border-slate-400 text-black transition duration-500 rounded-2xl hover:opacity-80 hover:shadow-lg"
                      onClick={() => handleModal(false)}
                    >
                      <span className="flex justify-center p-2">
                        <h3 className="text-2xl font-medium items-center">
                          Tutup
                        </h3>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex justify-items-end m-4">
                  <div className="flex flex-col items-center">
                    <div className="w-full ml-4 mr-4">
                      <span className="flex justify-end p-2">
                        <h3 className="text-3xl font-medium items-end text-black">
                          TOTAL BELANJA
                        </h3>
                      </span>
                    </div>
                    <div className="w-full ml-4 mr-4 mt-2 mb-4">
                      <span className="flex justify-end p-1">
                        <h3 className="text-3xl font-bold items-end mr-2 text-hollandtints-800">
                          Rp. 29.000
                        </h3>
                      </span>
                      <span className="flex justify-end">
                        <hr className="border-y bg-hollandtints-800 w-2/3 mr-2"></hr>
                      </span>
                    </div>
                    <button
                      className="w-64 ml-4 mr-2 mt-2 mb-4 bg-hollandtints-800 text-white transition duration-500 rounded-2xl hover:opacity-80 hover:shadow-lg"
                      onClick={() => handleModalBeli(true)}
                    >
                      <span className="flex justify-center p-2">
                        <h3 className="text-3xl font-serif items-center">
                          Beli
                        </h3>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
