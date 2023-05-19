import React from "react";
import imagesProduct from "../assets/img/smokebeef.jpg";
import PrettyRating from "pretty-rating-react";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import iConDisc from "../assets/img/disc.svg";

const icons = {
  star: {
    complete: faStar,
    half: faStarHalfAlt,
    empty: farStar,
  },
};

const colors = {
  star: ["#eb9502", "#eb9502", "#eb9502"],
};

export const Products = [
  {
    id: 1,
    title: "Roti 1",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 25000,
    disc: 15,
    rating: 4.5,
    stock: 5,
    imageUrl: imagesProduct,
  },
  {
    id: 2,
    title: "Roti 2",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 15000,
    disc: 14,
    rating: 4.7,
    stock: 10,
    imageUrl: imagesProduct,
  },
  {
    id: 3,
    title: "Roti 3",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 9500,
    disc: 10,
    rating: 4.6,
    stock: 0,
    imageUrl: imagesProduct,
  },
  {
    id: 4,
    title: "Roti 4",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 12500,
    disc: 0,
    stock: 4,
    rating: 5,
    imageUrl: imagesProduct,
  },
  {
    id: 5,
    title: "Roti 5",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 10000,
    disc: 11,
    stock: 25,
    rating: 4,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti 6",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 14500,
    disc: 10,
    stock: 15,
    rating: 5,
    imageUrl: imagesProduct,
  },
  {
    id: 7,
    title: "Roti 7",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 13000,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 8,
    title: "Roti 8",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 13000,
    disc: 10,
    stock: 0,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 9,
    title: "Roti 9",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 14000,
    disc: 0,
    stock: 9,
    rating: 4.9,
    imageUrl: imagesProduct,
  },
  {
    id: 10,
    title: "Roti 10",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 17500,
    disc: 10,
    stock: 10,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 11,
    title: "Roti 11",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 19000,
    disc: 0,
    stock: 6,
    rating: 4,
    imageUrl: imagesProduct,
  },
  {
    id: 12,
    title: "Roti 12",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 8500,
    disc: 0,
    stock: 10,
    rating: 5,
    imageUrl: imagesProduct,
  },
  {
    id: 13,
    title: "Roti 13",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 17000,
    disc: 0,
    stock: 1,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 14,
    title: "Roti 14",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 18500,
    disc: 10,
    stock: 0,
    rating: 4,
    imageUrl: imagesProduct,
  },
  {
    id: 15,
    title: "Roti 15",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 17500,
    disc: 10,
    stock: 6,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 16,
    title: "Roti 16",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 11000,
    disc: 5,
    stock: 10,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 17,
    title: "Roti 17",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 8500,
    disc: 5,
    stock: 0,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 18,
    title: "Roti 18",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 14500,
    disc: 11,
    stock: 29,
    rating: 4,
    imageUrl: imagesProduct,
  },
  {
    id: 19,
    title: "Roti 19",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 15000,
    disc: 0,
    stock: 15,
    rating: 5,
    imageUrl: imagesProduct,
  },
  {
    id: 20,
    title: "Roti 20",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 14000,
    disc: 11,
    stock: 5,
    rating: 5,
    imageUrl: imagesProduct,
  },
];

const numberFormat = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
const afterDiscount = (value, discount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value - value * (discount / 100));

const Content = () => {
  return (
    <div className="w-screen">
      <div className="flex mx-2">
        <div className="mx-auto justify-items-center">
          <ul className="grid grid-cols-6 gap-2">
            {Products.map((Menu, index) => (
              <li key={index}>
                <div
                  className={`relative mb-7 w-40 h-50  overflow-hidden text-center rounded-bl-2xl rounded-tr-2xl shadow-lg ${
                    Menu.stock === 0
                      ? "bg-hollandshades-600 bg-opacity-20"
                      : "shadow-2xl bg-white "
                  }`}
                >
                  <div
                    className={`absolute translate-x-4 translate-y-10 content-center ${
                      Menu.stock > 0 && "hidden"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-hollandshades-900">
                      Out Of Stock
                    </h3>
                  </div>
                  <div
                    className={`absolute h-14 w-14  origin-center -translate-x-3 -translate-y-3 rotate-45 text-2xl ${
                      (Menu.disc === 0) | (Menu.stock === 0) && "hidden"
                    }`}
                  >
                    <img
                      src={iConDisc}
                      alt="Discount"
                      className="w-full text-hollandtints-100"
                    />
                  </div>
                  <img
                    src={Menu.imageUrl}
                    alt="Landing Page"
                    className="w-full h-32"
                  />
                  <p className="p-3 h-10 truncate overflow-hidden font-bold">
                    {Menu.title}
                  </p>
                  <span className="mb-2 mt-5 text-xl font-semibold text-dark">
                    <PrettyRating
                      value={Menu.rating}
                      icons={icons.star}
                      colors={colors.star}
                      disabled={true}
                    />
                  </span>
                  <p
                    className={`mb-4 text-base font-medium  text-secondary ${
                      Menu.disc > 0 && "line-through text-hollandtints-900"
                    }`}
                  >
                    {Menu.disc === 0
                      ? numberFormat(Menu.price)
                      : afterDiscount(Menu.price, Menu.disc)}
                  </p>
                  {Menu.stock > 0 ? (
                    <div
                      className="w-full bg-hollandtints-700 px-2 py-2  text-base font-semibold text-white transition duration-500 hover:bg-opacity-50 focus:bg-hollandtints-300 hover:shadow-lg cursor-pointer "
                      disabled={true}
                      onClick={() => {
                        console.log("subname", Menu.id);
                      }}
                    >
                      <p className="hover:text-hollandshades-700 active:text-hollandshades-900 focus:outline-none focus:ring focus:text-hollandtints-500 text-base">
                        add to cart
                      </p>
                    </div>
                  ) : (
                    <div className="w-full bg-hollandtints-700 px-2 py-2  text-base font-semibold text-white transition duration-500 hover:bg-opacity-50 focus:bg-hollandtints-300 hover:shadow-lg">
                      <p className="text-base">out of stock</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Content;
