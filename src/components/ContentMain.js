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

const ContentMain = () => {
  return (
    <div className="w-screen">
      <div className="mx-auto justify-items-center mr-0 ml-0">
        <ul className="grid grid-cols-6 gap-2">
          <li className="ml-2 mr-1">
            <div className="mb-10 w-36 h-50 overflow-hidden text-center rounded-xl bg-white shadow-lg">
              <img
                src={imagesProduct}
                alt="Landing Page"
                className="w-36 h-36"
              />
              <p className="p-3 h-10 truncate overflow-hidden font-bold">
                Nama
              </p>
              <p className="mb-4 text-base font-medium  text-secondary">
                Rp.50.000
              </p>
            </div>
          </li>
          <li className="ml-2 mr-1">
            <div className="mb-10 w-36 h-50 overflow-hidden text-center rounded-xl bg-white shadow-lg">
              <img
                src={imagesProduct}
                alt="Landing Page"
                className="w-36 h-36"
              />
              <p className="p-3 h-10 truncate overflow-hidden font-bold">
                Nama
              </p>
              <p className="mb-4 text-base font-medium  text-secondary">
                Rp.50.000
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContentMain;
