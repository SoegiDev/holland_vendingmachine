import React, { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import RunningText from "../components/RunningText";
import ContentFooter from "../components/ContentFooter";
import { Products } from "../data";
import Modal from "../components/Modal";

const Vending = () => {
  const [items] = useState(Products);
  const [transaction, setTransaction] = useState([]);
  const [openCart, setopenCart] = useState(false);

  useEffect(() => {
    setTransaction(JSON.parse(localStorage.getItem("transaction")));
  }, []);

  useEffect(() => {
    localStorage.setItem("transaction", JSON.stringify(transaction));
  });
  // const sortedEmployees = transaction.sort((a, b) =>
  //   a.name < b.name ? -1 : 1
  // );
  const setToOpenCart = () => {
    setopenCart(true);
  };
  const addTransaction = (item) => {
    const existItem = transaction.find((product) => product.id === item.id);
    if (!existItem) {
      setTransaction([
        ...transaction,
        {
          id: item.id,
          category: item.category,
          description: item.description,
          disc: item.disc,
          imageUrl: item.imageUrl,
          price: item.price,
          rating: item.rating,
          stock: item.stock,
          title: item.title,
          qty: 1,
        },
      ]);
    } else {
      setTransaction(
        transaction.map((product) =>
          product.id === item.id
            ? {
                id: item.id,
                category: item.category,
                description: item.description,
                disc: item.disc,
                imageUrl: item.imageUrl,
                price: item.price,
                rating: item.rating,
                stock: item.stock,
                title: item.title,
                qty: existItem.qty + 1,
              }
            : product
        )
      );
    }
  };
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);
  const [product, setProducts] = useState(null);

  const clicked = (Items) => {
    setModalOn(true);
    setProducts(Items);
  };
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <div className="portrait:hidden">Landscape</div>
      <div className="landscape:hidden w-screen">
        <TopHeader />
        <Header />
        <RunningText />
        <Content items={items} addTransaction={addTransaction} />
        <ContentFooter
          itemsTransaction={transaction}
          setToOpenCart={setToOpenCart}
        />
        <Footer />
        {openCart && (
          <Modal
            setModalOn={setModalOn}
            setChoice={setChoice}
            itemsTransaction={transaction}
            addTransaction={addTransaction}
          />
        )}
        {/* <Header />
        <RunningText />
        <Content />
        <ContentFooter />
        <Footer /> */}
      </div>
    </div>
  );
};

export default Vending;
