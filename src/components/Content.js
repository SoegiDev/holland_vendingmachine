import React from "react";
import imagesProduct from "../assets/img/smokebeef.jpg";
import PrettyRating from "pretty-rating-react";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

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
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 50000,
    disc: 10,
    rating: 4.5,
    stock: 0,
    imageUrl: imagesProduct,
  },
  {
    id: 2,
    title: "Roti 1",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 8500,
    disc: 10,
    rating: 5,
    stock: 4,
    imageUrl: imagesProduct,
  },
  {
    id: 2,
    title: "Roti 2",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 10000,
    disc: 10,
    rating: 4.5,
    stock: 4,
    imageUrl: imagesProduct,
  },
  {
    id: 4,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 9500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 5,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 12500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 7800,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 9000,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 13000,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 14000,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese asdsa asdsad sad",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 10000,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 12500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 9500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 9500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 9500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 6,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 9500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
];
export const ProductsLite = [
  {
    id: 1,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 50000,
    disc: 10,
    rating: 4.5,
    stock: 0,
    imageUrl: imagesProduct,
  },
  {
    id: 2,
    title: "Roti 1",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 8500,
    disc: 10,
    rating: 5,
    stock: 4,
    imageUrl: imagesProduct,
  },
  {
    id: 2,
    title: "Roti 2",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 10000,
    disc: 10,
    rating: 4.5,
    stock: 4,
    imageUrl: imagesProduct,
  },
  {
    id: 4,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 9500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 5,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 12500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
  {
    id: 5,
    title: "Roti Smoked Beef Cheese",
    description: "Roti Smoked Beef Cheese",
    category: "Roti",
    price: 12500,
    disc: 10,
    stock: 4,
    rating: 4.5,
    imageUrl: imagesProduct,
  },
];
const numberFormat = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

const Content = () => {
  return (
    <div className="w-screen">
      <div className="flex justify-center">
        <div className="items-center">Centered using Tailwind Flex</div>
      </div>
      <div className="flex mx-2">
        <div className="mx-auto justify-items-center">
          <ul className="grid grid-cols-5 gap-2">
            {Products.map((Menu, index) => (
              <li key={index}>
                <div className="mb-10 overflow-hidden text-center rounded-xl bg-white shadow-lg">
                  <img
                    src={Menu.imageUrl}
                    alt="Landing Page"
                    className="h-auto w-full"
                  />
                  <p className="p-3 h-10 truncate overflow-hidden font-bold">
                    {Menu.title}
                  </p>
                  <span className="mb-4 mt-5 text-xl font-semibold text-dark">
                    <PrettyRating
                      value={Menu.rating}
                      icons={icons.star}
                      colors={colors.star}
                      disabled={true}
                    />
                  </span>
                  <p className="mb-4 text-base font-medium  text-secondary">
                    {numberFormat(Menu.price)}
                  </p>
                  <div
                    className="w-full bg-hollandtints-700 px-2 py-2  text-base font-semibold text-white transition duration-500 hover:bg-opacity-50 focus:bg-hollandtints-300 hover:shadow-lg cursor-pointer "
                    onClick={() => {
                      console.log("subname", Menu.id);
                    }}
                  >
                    <p className="hover:text-hollandshades-700 active:text-hollandshades-900 focus:outline-none focus:ring focus:text-hollandtints-500">
                      add to cart
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex mx-2">
        <div className="mx-auto justify-items-center">
          <ul className="grid grid-cols-6 gap-2">
            {ProductsLite.map((Menu, index) => (
              <li key={index}>
                <div className="mb-10 w-32 h-50 overflow-hidden text-center rounded-xl bg-white shadow-lg">
                  <img
                    src={Menu.imageUrl}
                    alt="Landing Page"
                    className="h-20 w-36"
                  />
                  <p className="p-3 h-10 truncate overflow-hidden font-bold">
                    {Menu.title}
                  </p>
                  <p className="mb-4 text-base font-medium  text-secondary">
                    {numberFormat(Menu.price)}
                  </p>
                  <div
                    className="w-full bg-hollandtints-700 px-2 py-2  text-base font-semibold text-white transition duration-500 hover:bg-opacity-50 focus:bg-hollandtints-300 hover:shadow-lg cursor-pointer "
                    onClick={() => {
                      console.log("subname", Menu.id);
                    }}
                  >
                    <p className="hover:text-hollandshades-700 active:text-hollandshades-900 focus:outline-none focus:ring focus:text-hollandtints-500">
                      add to cart
                    </p>
                  </div>
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
