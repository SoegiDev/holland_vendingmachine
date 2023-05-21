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
  const { setModalOn, setChoice, itemsTransaction, addTransaction } = props;
  const handleOKClick = () => {
    setChoice(true);
    setModalOn(false);
  };
  const handleCancelClick = () => {
    setChoice(false);
    setModalOn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(itemsTransaction);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="flex h-screen justify-center items-center ">
        <div className="relative w-4/6 max-h-[960px] no-scrollbar overflow-y-auto  ml-1 mr-1 overflow-hidden text-center rounded-2xl  bg-white ">
          <h3 className="w-full bg-hollandtints-800 p-8 text-white text-4xl font-serif sticky top-0">
            KERANJANG BELANJA
          </h3>
          <ul>
            {itemsTransaction.map((item, index) => (
              <li key={index} className="mb-2">
                <div className="flex flex-grow h-48">
                  <span className="flex items-center ml-4">
                    <img
                      src={item.imageUrl}
                      alt="Landing Page"
                      className="h-24 w-24 content-center border rounded-3xl shadow-lg"
                    />
                  </span>
                  <div className="flex flex-col ml-4 mt-4 mb-4 items-start">
                    <h3 className="text-3xl font-bold pb-4 pl-2 pt-2">
                      {item.title}
                    </h3>
                    <h3
                      className={`text-2xl font-sans mt-5 pl-2 ${
                        item.disc > 0 && "line-through text-hollandtints-900"
                      }`}
                    >
                      {numberFormat(item.price)}
                    </h3>
                    <h3 className="text-3xl font-bold pl-2 text-hollandtints-900">
                      {afterDiscount(item.price, item.disc)}
                    </h3>
                  </div>
                  <div className="flex flex-grow ml-4 mt-4 mb-4 justify-end">
                    <div className="flex items-end mb-4 mr-4">
                      <p className="text-xl font-sans pl-2 text-hollandtints-900 align-bottom">
                        Sisa
                      </p>
                      <p className="text-xl font-bold pl-2 text-hollandtints-900 align-bottom">
                        {afterDiscount(item.price, item.disc)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <hr className="border-y"></hr>
          <footer className="flex w-full text-center border-t border-grey sticky bottom-0 bg-white shadow-md">
            <div className="flex w-full justify-between">
              <div className="flex justify-items-start m-4">
                <div className="flex flex-col items-center mt-12">
                  <button className="w-full ml-4 mr-4 mt-2 mb-4 bg-hollandtints-800 text-white transition duration-500 rounded-2xl hover:opacity-80 hover:shadow-lg">
                    <span className="flex justify-center p-2">
                      <h3 className="text-2xl font-medium items-center">
                        Kosongkan Keranjang
                      </h3>
                    </span>
                  </button>
                  <button className="w-full ml-4 mr-4 mt-2 mb-4 bg-slate-100 border-2 border-slate-400 text-black transition duration-500 rounded-2xl hover:opacity-80 hover:shadow-lg">
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
                      <h3 className="text-3xl font-medium items-end">
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
                  <button className="w-64 ml-4 mr-2 mt-2 mb-4 bg-hollandtints-800 text-white transition duration-500 rounded-2xl hover:opacity-80 hover:shadow-lg">
                    <span className="flex justify-center p-2">
                      <h3 className="text-3xl font-serif items-center">Beli</h3>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Modal;
