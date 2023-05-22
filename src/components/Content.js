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

const Content = (props) => {
  const { items, addTransaction } = props;
  const [style, setStyle] = useState("cont");
  const clickAddTransaction = () => {};
  return (
    <div className="flex justify-center">
      <div className="content-center">
        <ul className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 mt-2 mb-1">
          {items
            .filter((item, index) => index <= 24)
            .map((Menu, index) => (
              <li key={index} className="mb-2">
                <div
                  className={`relative w-44 h-full ml-1 mr-1 overflow-hidden text-center rounded-bl-2xl rounded-tr-2xl ${
                    Menu.stock === 0
                      ? "opacity-70 bg-opacity-70"
                      : "shadow-2xl bg-white "
                  }`}
                >
                  <div
                    className={`absolute h-8 w-16 rounded-br-2xl bg-hollandtints-700 text-2xl`}
                  >
                    <p className="text-lg font-bold text-white">{Menu.id}</p>
                  </div>
                  <img
                    src={Menu.imageUrl}
                    alt="Landing Page"
                    className="h-40 w-full"
                  />
                  <p
                    className={`mx-auto p-1 text-xl justify-center ${
                      Menu.disc > 0 && "line-through text-hollandtints-900"
                    }`}
                  >
                    {numberFormat(Menu.price)}
                  </p>
                  {Menu.stock > 0 ? (
                    <div
                      id={`itemdiv${Menu.id}`}
                      className="w-full h-full bg-hollandtints-700 text-white transition duration-500 cursor-pointer "
                      onClick={() => addTransaction(Menu)}
                    >
                      <p
                        id={`pdiv${Menu.id}`}
                        className="px-1 py-1 mx-auto text-xl justify-center"
                      >
                        {afterDiscount(Menu.price, Menu.disc)}
                      </p>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-hollandtints-700 text-white">
                      <p className="mx-auto px-1 py-1 justify-center text-xl">
                        HABIS
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
        <ul className="grid grid-cols-2 gap-1 md:grid-cols-10 lg:grid-cols-10 2xl:grid-cols-7 mb-2">
          {items
            .filter((item, index) => index >= 25)
            .map((Menu, index) => (
              <li key={index}>
                <div
                  className={`relative h-25 ml-1 mr-1 overflow-hidden text-center ${
                    Menu.stock === 0
                      ? "opacity-70 bg-opacity-70"
                      : "shadow-2xl bg-white "
                  }`}
                >
                  <div
                    className={`absolute h-8 w-7 rounded-br-2xl bg-hollandtints-700 text-2xl`}
                  >
                    <p className="text-lg font-bold text-white">{Menu.id}</p>
                  </div>
                  <img
                    src={Menu.imageUrl}
                    alt="Landing Page"
                    className="w-22 h-20"
                  />
                  <p
                    className={`mx-auto px-1 py-1 text-base justify-center ${
                      Menu.disc > 0 && "line-through text-hollandtints-900"
                    }`}
                  >
                    {numberFormat(Menu.price)}
                  </p>
                  {Menu.stock > 0 ? (
                    <div
                      className="w-full h-full bg-hollandtints-700 text-white transition duration-500 hover:bg-opacity-50 focus:bg-hollandtints-300 hover:shadow-lg cursor-pointer"
                      onClick={() => addTransaction(Menu)}
                    >
                      <p className="hover:text-hollandshades-700 px-1 py-1 active:text-hollandshades-900 focus:outline-none focus:ring focus:text-hollandtints-500 mx-auto text-base justify-center">
                        {afterDiscount(Menu.price, Menu.disc)}
                      </p>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-hollandtints-700 text-white">
                      <p className="mx-auto px-1 py-1 justify-center text-base">
                        HABIS
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Content;
