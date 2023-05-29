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

const Content = (props) => {
  const { items, slots, addTransaction } = props;
  return (
    <div className="flex justify-center">
      <div className="content-center">
        <ul className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 mt-2 mb-1">
          {slots
            .filter((item, index) => index <= 24)
            .map((Menu, index) => (
              <MyItems
                key={index}
                Data={Menu}
                addTransaction={addTransaction}
              />
            ))}
        </ul>
        <ul className="grid grid-cols-2 gap-1 md:grid-cols-10 lg:grid-cols-10 2xl:grid-cols-7 mb-2">
          {items
            .filter((item, index) => index >= 25)
            .map((Menu, index) => (
              <MyItemsChild
                key={index}
                Data={Menu}
                addTransaction={addTransaction}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

const MyItems = ({ Data, addTransaction }) => {
  const handleAddTransaction = () => {
    addTransaction(Data, true);
  };
  return (
    <li className="mb-2">
      <div
        className={`relative w-44 h-full ml-1 mr-1 overflow-hidden text-center rounded-bl-2xl rounded-tr-2xl ${
          Data.onhand === 0
            ? "opacity-70 bg-opacity-70"
            : "shadow-2xl bg-white "
        }`}
      >
        <div
          className={`absolute h-8 w-16 rounded-br-2xl bg-hollandtints-700 text-2xl`}
        >
          <p className="text-lg font-bold text-white">{Data.no_slot}</p>
        </div>
        <img
          src={Data.iamge}
          alt="Landing Page"
          className="h-40 w-full"
          onClick={() => {
            if (Data.onhand > 0) {
              handleAddTransaction();
            }
          }}
        />
        <p
          className={`mx-auto p-1 text-xl justify-center ${
            Data.status_promo === "1" && "line-through text-hollandtints-900"
          }`}
        >
          {numberFormat(Data.harga_jual)}
        </p>
        {Data.onhand > 0 ? (
          <div
            className="w-full h-full transition duration-500 ease-in-out -translate-y-0.5 bg-hollandtints-800 text-white cursor-pointer"
            onClick={() => {
              if (Data.onhand > 0) {
                handleAddTransaction();
              }
            }}
          >
            <p className="px-1 py-1 mx-auto text-xl justify-center">
              {afterDiscount(
                Data.status_promo === 1 ? Data.harga_promo : Data.harga_jual
              )}
            </p>
          </div>
        ) : (
          <div className="w-full h-full bg-hollandtints-700 text-white">
            <p className="mx-auto px-1 py-1 justify-center text-xl">HABIS</p>
          </div>
        )}
      </div>
    </li>
  );
};

const MyItemsChild = ({ Data, addTransaction }) => {
  const handleAddTransaction = () => {
    addTransaction(Data, true);
  };
  return (
    <li>
      <div
        className={`relative h-25 ml-1 mr-1 overflow-hidden text-center ${
          Data.stock === 0 ? "opacity-70 bg-opacity-70" : "shadow-2xl bg-white "
        }`}
      >
        <div
          className={`absolute h-8 w-7 rounded-br-2xl bg-hollandtints-700 text-2xl`}
        >
          <p className="text-lg font-bold text-white">{Data.id}</p>
        </div>
        <img
          src={Data.imageUrl}
          alt="Landing Page"
          className="w-22 h-20"
          onClick={() => {
            if (Data.stock > 0) {
              handleAddTransaction();
            }
          }}
        />
        <p
          className={`mx-auto px-1 py-1 text-base justify-center ${
            Data.disc > 0 && "line-through text-hollandtints-900"
          }`}
        >
          {numberFormat(Data.price)}
        </p>
        {Data.stock > 0 ? (
          <div
            className="w-full h-full transition duration-500 ease-in-out -translate-y-0.5 bg-hollandtints-800 text-white cursor-pointer"
            onClick={() => handleAddTransaction()}
          >
            <p className="px-1 py-1 text-base justify-center">
              {afterDiscount(Data.price, Data.disc)}
            </p>
          </div>
        ) : (
          <div className="w-full h-full bg-hollandtints-700 text-white">
            <p className="mx-auto px-1 py-1 justify-center text-base">HABIS</p>
          </div>
        )}
      </div>
    </li>
  );
};
export default Content;
